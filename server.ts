import express, { Request, Response } from 'express';
import http from 'http';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './src/server/dbStore.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Simple Admin Authentication Constants & Tokens
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'minoritytech2026';
const VALID_TOKENS = new Set<string>(['mt-adm-default-session-2026']);

// Admin Auth Middleware
const requireAdmin = (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') 
    ? authHeader.substring(7) 
    : (req.headers['x-admin-token'] as string);

  if (!token || !VALID_TOKENS.has(token)) {
    return res.status(401).json({ 
      success: false, 
      error: 'Akses ditolak. Silakan login sebagai admin Minority Tech.' 
    });
  }
  next();
};

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Generate dynamic catalog summary from persistent DB for LLM context
function getCatalogContext() {
  const products = db.getProducts();
  return products.map(p => ({
    id: p.id,
    title: p.title,
    brand: p.brand,
    priceIDR: `Rp ${p.price.toLocaleString('id-ID')}`,
    rawPrice: p.price,
    conditionGrade: p.conditionGrade,
    batteryHealth: `${p.batteryHealth}% (Cycle: ${p.batteryCycle})`,
    cpu: p.processor,
    ram: p.ram,
    ssd: p.storage,
    display: p.display,
    weight: `${p.weightKg} kg`,
    inStock: p.inStock ? 'Ready' : 'Habis / Sold',
    highlights: p.highlights.join('; '),
    suitableFor: p.suitableFor.join(', '),
  }));
}

function withTimeout<T>(promise: Promise<T>, ms = 8000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('AI request timeout')), ms)
    ),
  ]);
}

// API: Health check
app.get('/api/health', (_req: Request, res: Response) => {
  const products = db.getProducts();
  const articles = db.getArticles();
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(apiKey),
    productsCount: products.length,
    articlesCount: articles.length,
    storage: 'sqlite-relational-database',
    databaseEngine: 'SQLite 3 (sql.js Wasm)',
  });
});

// API: Public products list (from persistent DB)
app.get('/api/products', (_req: Request, res: Response) => {
  res.json({ success: true, data: db.getProducts() });
});

// API: Single product
app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = db.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

// API: Articles list (from persistent SQLite DB)
app.get('/api/articles', (_req: Request, res: Response) => {
  res.json({ success: true, data: db.getArticles() });
});

// API: Single article by ID or Slug
app.get('/api/articles/:id', (req: Request, res: Response) => {
  const article = db.getArticleById(req.params.id);
  if (!article) {
    return res.status(404).json({ success: false, error: 'Artikel tidak ditemukan' });
  }
  res.json({ success: true, data: article });
});

// --- ADMIN ROUTES ---

// Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = `mt-adm-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    VALID_TOKENS.add(token);
    return res.json({
      success: true,
      message: 'Login Admin Berhasil',
      token,
      admin: {
        username: ADMIN_USERNAME,
        role: 'Super Admin',
        store: 'Minority Tech Payakumbuh',
      },
    });
  }
  return res.status(401).json({
    success: false,
    error: 'Username atau password admin salah.',
  });
});

// Admin Verify Session Token
app.get('/api/admin/verify', requireAdmin, (_req: Request, res: Response) => {
  res.json({ success: true, admin: { username: ADMIN_USERNAME, role: 'Super Admin' } });
});

// Admin Stats
app.get('/api/admin/stats', requireAdmin, (_req: Request, res: Response) => {
  res.json({ success: true, data: db.getStats() });
});

// Admin Create Product
app.post('/api/admin/products', requireAdmin, (req: Request, res: Response) => {
  try {
    const newProduct = db.createProduct(req.body);
    res.status(201).json({ success: true, message: 'Produk berhasil ditambahkan', data: newProduct });
  } catch (err: any) {
    console.error('Error creating product:', err);
    res.status(400).json({ success: false, error: err?.message || 'Gagal menambahkan produk' });
  }
});

// Admin Update Product
app.put('/api/admin/products/:id', requireAdmin, (req: Request, res: Response) => {
  try {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Produk tidak ditemukan' });
    }
    res.json({ success: true, message: 'Produk berhasil diperbarui', data: updated });
  } catch (err: any) {
    console.error('Error updating product:', err);
    res.status(400).json({ success: false, error: err?.message || 'Gagal memperbarui produk' });
  }
});

// Admin Delete Product
app.delete('/api/admin/products/:id', requireAdmin, (req: Request, res: Response) => {
  const deleted = db.deleteProduct(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, error: 'Produk tidak ditemukan atau sudah dihapus' });
  }
  res.json({ success: true, message: 'Produk berhasil dihapus dari database' });
});

// Admin Reset Stock to Initial Seed
app.post('/api/admin/products/reset', requireAdmin, (_req: Request, res: Response) => {
  const resetList = db.resetProducts();
  res.json({ success: true, message: 'Katalog berhasil di-reset ke stok default', data: resetList });
});

// Admin Create Article
app.post('/api/admin/articles', requireAdmin, (req: Request, res: Response) => {
  try {
    const newArticle = db.createArticle(req.body);
    res.status(201).json({ success: true, message: 'Artikel berhasil diterbitkan', data: newArticle });
  } catch (err: any) {
    console.error('Error creating article:', err);
    res.status(400).json({ success: false, error: err?.message || 'Gagal menerbitkan artikel' });
  }
});

// Admin Update Article
app.put('/api/admin/articles/:id', requireAdmin, (req: Request, res: Response) => {
  try {
    const updated = db.updateArticle(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Artikel tidak ditemukan' });
    }
    res.json({ success: true, message: 'Artikel berhasil diperbarui', data: updated });
  } catch (err: any) {
    console.error('Error updating article:', err);
    res.status(400).json({ success: false, error: err?.message || 'Gagal memperbarui artikel' });
  }
});

// Admin Delete Article
app.delete('/api/admin/articles/:id', requireAdmin, (req: Request, res: Response) => {
  const deleted = db.deleteArticle(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, error: 'Artikel tidak ditemukan atau sudah dihapus' });
  }
  res.json({ success: true, message: 'Artikel berhasil dihapus dari database' });
});

// Admin Reset Articles to Initial Seed
app.post('/api/admin/articles/reset', requireAdmin, (_req: Request, res: Response) => {
  const resetList = db.resetArticles();
  res.json({ success: true, message: 'Artikel berhasil di-reset ke data bawaan', data: resetList });
});

// API: AI Product Match Finder
app.post('/api/gemini/match', async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ error: 'Query is required' });
    }

    if (!ai) {
      // Fallback smart heuristic matcher if API key is not configured
      const qLower = query.toLowerCase();
      const currentProducts = db.getProducts();
      const matched = currentProducts.map(p => {
        let score = 70;
        const reasons: string[] = [];

        if (qLower.includes('coding') || qLower.includes('programming') || qLower.includes('developer')) {
          if (p.brand === 'Lenovo' || p.ram.includes('16GB')) {
            score += 20;
            reasons.push('Keyboard empuk anti-lelah dan RAM 16GB sangat optimal untuk compile & multi-IDE');
          }
        }
        if (qLower.includes('batre') || qLower.includes('baterai') || qLower.includes('awet')) {
          if (p.batteryHealth >= 94 || p.brand === 'Apple') {
            score += 15;
            reasons.push(`Baterai kondisi prima (${p.batteryHealth}%) dengan efisiensi daya hingga 10-14 jam`);
          }
        }
        if (qLower.includes('desain') || qLower.includes('oled') || qLower.includes('layar')) {
          if (p.display.includes('OLED') || p.display.includes('Retina') || p.display.includes('100% sRGB')) {
            score += 20;
            reasons.push('Panel layar dengan akurasi warna tinggi & kecerahan prima');
          }
        }
        if (qLower.includes('murah') || qLower.includes('8') || qLower.includes('9')) {
          if (p.price <= 10000000) {
            score += 15;
            reasons.push('Budget sangat bersahabat di bawah Rp 10 juta dengan garansi 1 tahun');
          }
        }

        return {
          productId: p.id,
          matchScore: Math.min(score, 99),
          reason: reasons[0] || `Sangat cocok untuk kebutuhan mobilitas harian dengan grade ${p.conditionGrade} dan inspeksi 28 titik.`,
          bestFitAspects: p.highlights.slice(0, 3),
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);

      return res.json({
        query,
        summary: `Berdasarkan analisis kebutuhan "${query}", berikut 3 ultrabook paling tepat dari stok Minority Tech bergaransi 1 tahun:`,
        recommendations: matched,
      });
    }

    const systemPrompt = `Anda adalah Senior Ultrabook Specialist di "Minority Tech" (Akun Instagram resmi: @minoritytech), toko kurasi Premium Used Ultrabook kelas bisnis ternama di Indonesia yang berbasis di Payakumbuh, Sumatera Barat dengan pengiriman ke seluruh nusantara.
Tugas Anda adalah menganalisis kebutuhan pengguna dan mencocokkannya secara akurat dengan katalog produk Minority Tech yang tersedia.

Berikut adalah katalog produk aktif di Minority Tech:
${JSON.stringify(getCatalogContext(), null, 2)}

Instruksi:
1. Analisis kebutuhan pengguna (budget, profesi/tugas seperti coding, desain, skripsi, mobilitas, baterai, OS preference).
2. Pilih 1 hingga 3 laptop dari katalog yang PALING COCOK.
3. Berikan 'matchScore' (skor kecocokan 0-100), 'reason' (alasan spesifik teknis mengapa laptop ini menjawab kebutuhan pengguna dalam bahasa Indonesia yang profesional, ramah, dan khas @minoritytech), serta 2-3 'bestFitAspects'.
4. Tulis ringkasan 'summary' rekomendasi yang ramah dan menyoroti jaminan garansi 1 tahun & inspeksi 28 titik lab Minority Tech.`;

    const response = await withTimeout(
      ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Kebutuhan pengguna: "${query}"`,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: {
                type: Type.STRING,
                description: 'Ringkasan penjelasan umum rekomendasi untuk pengguna',
              },
              recommendations: {
                type: Type.ARRAY,
                description: 'Daftar produk terbaik yang cocok dengan kebutuhan pengguna',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    productId: {
                      type: Type.STRING,
                      description: 'ID produk yang persis sama dengan yang ada di katalog',
                    },
                    matchScore: {
                      type: Type.NUMBER,
                      description: 'Persentase kecocokan antara 70 dan 99',
                    },
                    reason: {
                      type: Type.STRING,
                      description: 'Alasan teknis dan praktis mengapa unit ini sangat cocok',
                    },
                    bestFitAspects: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: '2-3 aspek paling unggul dari laptop ini untuk kebutuhan user',
                    },
                  },
                  required: ['productId', 'matchScore', 'reason', 'bestFitAspects'],
                },
              },
            },
            required: ['summary', 'recommendations'],
          },
        },
      }),
      8000
    );

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      query,
      summary: parsed.summary || 'Berikut rekomendasi terbaik dari Minority Tech:',
      recommendations: parsed.recommendations || [],
    });
  } catch (error: any) {
    console.warn('Gemini API call failed, activating smart heuristic fallback:', error?.message);
    
    // Graceful fallback matcher
    const { query } = req.body;
    const qLower = (query || '').toLowerCase();
    const currentProducts = db.getProducts();
    const matched = currentProducts.map(p => {
      let score = 75;
      const reasons: string[] = [];

      if (qLower.includes('coding') || qLower.includes('docker') || qLower.includes('developer') || qLower.includes('programming')) {
        if (p.brand === 'Lenovo' || p.ram.includes('16GB')) {
          score += 18;
          reasons.push('Keyboard empuk anti-lelah, sasis standar militer, dan RAM 16GB sangat optimal untuk compile & multi-container Docker');
        }
      }
      if (qLower.includes('batre') || qLower.includes('baterai') || qLower.includes('awet') || qLower.includes('jam')) {
        if (p.batteryHealth >= 93 || p.brand === 'Apple') {
          score += 15;
          reasons.push(`Baterai kesehatan prima (${p.batteryHealth}%) dengan ketahanan 8-14 jam pemakaian riil`);
        }
      }
      if (qLower.includes('desain') || qLower.includes('oled') || qLower.includes('layar') || qLower.includes('video')) {
        if (p.display.includes('OLED') || p.display.includes('Retina') || p.display.includes('100% sRGB')) {
          score += 18;
          reasons.push('Panel layar akurasi warna tinggi & sertifikasi PANTONE/Retina');
        }
      }
      if (qLower.includes('10') || qLower.includes('9') || qLower.includes('8') || qLower.includes('murah')) {
        if (p.price <= 10000000) {
          score += 16;
          reasons.push('Best value di bawah Rp 10 juta dengan garansi 1 tahun hardware penuh');
        }
      }

      return {
        productId: p.id,
        matchScore: Math.min(score, 98),
        reason: reasons[0] || `Sangat cocok untuk kebutuhan mobilitas harian dengan grade ${p.conditionGrade} dan inspeksi 28 titik lab.`,
        bestFitAspects: p.highlights.slice(0, 3),
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

    return res.json({
      query: query || '',
      summary: `Berdasarkan analisis kebutuhan "${query}", berikut 3 pilihan ultrabook paling seimbang dan siap pakai dari stok Minority Tech bergaransi 1 tahun:`,
      recommendations: matched,
    });
  }
});

// API: Floating AI Chat Consultant
app.post('/api/gemini/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userMessage } = req.body;
    const prompt = userMessage || (messages && messages[messages.length - 1]?.content);

    if (!prompt) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const currentProducts = db.getProducts();

    if (!ai) {
      // Intelligent fallback answer if key is missing
      const pLower = String(prompt).toLowerCase();
      let reply = 'Halo! Saya AI Consultant Minority Tech. ';
      let matchedIds: string[] = [];

      if (pLower.includes('thinkpad') || pLower.includes('coding') || pLower.includes('keyboard')) {
        reply += 'Untuk kebutuhan coding dan mengetik lama, lini **ThinkPad X1 Carbon** dan **ThinkPad T14s** adalah rekomendasi utama kami. Keduanya memiliki keyboard legendaris, bodi standar militer, dan suhu yang sangat sejuk.';
        matchedIds = currentProducts.filter(p => p.brand === 'Lenovo').slice(0, 2).map(p => p.id);
      } else if (pLower.includes('macbook') || pLower.includes('apple') || pLower.includes('m1')) {
        reply += 'Untuk ekosistem Apple, kami menyediakan varian MacBook pilihan bergaransi 1 tahun resmi Minority Tech, bebas dari isu MDM / iCloud lock.';
        matchedIds = currentProducts.filter(p => p.brand === 'Apple').slice(0, 2).map(p => p.id);
      } else if (pLower.includes('garansi') || pLower.includes('rusak') || pLower.includes('klaim')) {
        reply += 'Setiap unit di Minority Tech mendapatkan **30 Hari Ganti Unit** dan **1 Tahun Garansi Hardware & Servis**. Kami juga menyertakan sertifikat 28-point QC check (bebas BIOS lock, SSD health >90%, baterai prima).';
      } else {
        reply += 'Kami menyediakan pilihan ultrabook bisnis bekas Grade A+ mulai 8 jutaan (ThinkPad, MacBook, Dell XPS, ASUS ZenBook, HP EliteBook) dengan garansi 1 tahun penuh dan baterai berdaya tahan teruji.';
        matchedIds = currentProducts.slice(0, 2).map(p => p.id);
      }

      return res.json({
        reply,
        recommendedProductIds: matchedIds,
      });
    }

    const systemPrompt = `Anda adalah Senior Tech Consultant & Hardware Specialist resmi di "Minority Tech" (Akun Instagram: @minoritytech), toko kurasi Premium Used Ultrabook kelas bisnis terpercaya di Indonesia (Payakumbuh, Sumbar & Tokopedia/Shopee).
Karakter Anda:
- Cerdas, ramah, jujur, sangat menguasai detail teknis hardware laptop (arsitektur CPU, ThinkPad TrackPoint, layar nits, thermal repasting, battery health, SSD CrystalDiskInfo, sertifikasi MIL-STD).
- Mewakili identitas toko Instagram @minoritytech yang terkenal dengan kurasi unit Grade A+ mulus, transparansi kondisi unit, dan packing kayu aman.
- Selalu mempromosikan produk dari katalog Minority Tech dengan alasan objektif.
- Menekankan standar Minority Tech: Setiap unit melewati 28-titik inspeksi fisik & hardware, BIOS clean (tanpa supervisor/MDM password), thermal paste baru, dan GARANSI 1 TAHUN + 30 HARI GANTI UNIT.
- Format teks rapi menggunakan Markdown (bold, bullet points jika menjelaskan perbandingan).

Katalog Produk yang Tersedia:
${JSON.stringify(getCatalogContext(), null, 2)}

Format Jawaban:
Jawab pertanyaan dalam bahasa Indonesia yang mengalir, solutif, dan jika relevan, sebutkan tipe laptop yang direkomendasikan beserta estimasi harganya. Di baris paling akhir, bila ada laptop di katalog yang cocok, tuliskan token khusus:
[RECOMMEND: id_produk_1, id_produk_2]`;

    // Build chat contents
    const contents: any[] = [];
    if (Array.isArray(messages) && messages.length > 0) {
      // Take last 6 messages for context
      const recent = messages.slice(-6);
      for (const m of recent) {
        contents.push({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        });
      }
    } else {
      contents.push({
        role: 'user',
        parts: [{ text: prompt }],
      });
    }

    const response = await withTimeout(
      ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: systemPrompt,
        },
      }),
      8000
    );

    let rawReply = response.text || 'Maaf, saya tidak dapat merespons saat ini.';
    let recommendedProductIds: string[] = [];

    // Extract [RECOMMEND: id1, id2]
    const recMatch = rawReply.match(/\[RECOMMEND:\s*([^\]]+)\]/i);
    if (recMatch) {
      const activeIds = currentProducts.map(p => p.id);
      recommendedProductIds = recMatch[1]
        .split(',')
        .map(s => s.trim())
        .filter(id => activeIds.includes(id));
      rawReply = rawReply.replace(/\[RECOMMEND:\s*([^\]]+)\]/i, '').trim();
    }

    res.json({
      reply: rawReply,
      recommendedProductIds,
    });
  } catch (error: any) {
    console.warn('Gemini chat error, falling back to smart consultant response:', error?.message);
    const { messages, userMessage } = req.body;
    const prompt = (userMessage || (messages && messages[messages.length - 1]?.content) || '').toLowerCase();
    const currentProducts = db.getProducts();

    let reply = 'Halo! Saya AI Consultant Minority Tech. ';
    let matchedIds: string[] = [];

    if (prompt.includes('thinkpad') || prompt.includes('coding') || prompt.includes('keyboard') || prompt.includes('docker')) {
      reply += 'Untuk coding dan marathon pengetikan, lini ThinkPad X1 Carbon dan T14s AMD adalah rekomendasi teratas kami dengan keyboard ThinkPad terbaik, bodi serat karbon militer, serta suhu dingin.';
      matchedIds = currentProducts.filter(p => p.brand === 'Lenovo').slice(0, 2).map(p => p.id);
    } else if (prompt.includes('macbook') || prompt.includes('apple') || prompt.includes('m1')) {
      reply += 'Untuk ekosistem macOS, MacBook Air & Pro dengan Apple Silicon menawarkan efisiensi daya hingga 14 jam dan bebas panas. Seluruh unit kami terverifikasi bebas MDM & iCloud lock.';
      matchedIds = currentProducts.filter(p => p.brand === 'Apple').slice(0, 2).map(p => p.id);
    } else if (prompt.includes('garansi') || prompt.includes('qc') || prompt.includes('aman')) {
      reply += 'Di Minority Tech, setiap unit mendapatkan **Garansi 1 Tahun Hardware & Sparepart** ditambah **30 Hari Ganti Unit**. Kami juga menyertakan sertifikat 28-point QC check (bebas BIOS lock, CrystalDiskInfo SSD >90%, baterai prima).';
    } else {
      reply += 'Kami menyediakan pilihan ultrabook bisnis bekas Grade A+ mulai 8 jutaan (ThinkPad, MacBook, Dell XPS, ZenBook) dengan garansi 1 tahun penuh. Anda bisa menyampaikan preferensi budget atau software yang rutin Anda gunakan!';
      matchedIds = currentProducts.slice(0, 2).map(p => p.id);
    }

    res.json({
      reply,
      recommendedProductIds: matchedIds,
    });
  }
});

// Configure Vite or Static Serve
async function setupServer() {
  await db.ready();
  const isProd = process.env.NODE_ENV === 'production';
  const httpServer = http.createServer(app);

  if (!isProd) {
    const isHmrDisabled = process.env.DISABLE_HMR === 'true';
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled ? false : { server: httpServer },
        watch: isHmrDisabled ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Minority Tech Server running on port ${PORT} (${isProd ? 'Production' : 'Development'})`);
  });
}

setupServer();
