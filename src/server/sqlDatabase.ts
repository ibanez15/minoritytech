import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import { UltrabookProduct, TechArticle } from '../types.ts';
import { MOCK_PRODUCTS } from '../data/mockProducts.ts';
import { MOCK_ARTICLES } from '../data/mockArticles.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_SQLITE_FILE = path.join(DATA_DIR, 'minoritytech.sqlite');

export class SqlDatabase {
  private db: SqlJsDatabase | null = null;
  private isReady: Promise<void>;

  constructor() {
    this.isReady = this.init();
  }

  public async ready() {
    await this.isReady;
  }

  private async init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      const SQL = await initSqlJs();

      if (fs.existsSync(DB_SQLITE_FILE)) {
        try {
          const fileBuffer = fs.readFileSync(DB_SQLITE_FILE);
          this.db = new SQL.Database(fileBuffer);
          console.log(`💽 Loaded existing SQLite database from ${DB_SQLITE_FILE}`);
        } catch (e) {
          console.error('Failed to parse existing SQLite file, creating fresh instance:', e);
          this.db = new SQL.Database();
        }
      } else {
        this.db = new SQL.Database();
        console.log('🆕 Created fresh SQLite database instance in memory.');
      }

      this.createTablesIfNotExist();
      this.seedInitialDataIfEmpty();
      this.flushToDisk();
      console.log('✅ SQLite Database successfully initialized and synced to disk.');
    } catch (err) {
      console.error('CRITICAL: SQLite initialization failed:', err);
    }
  }

  private flushToDisk() {
    if (!this.db) return;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const binaryData = this.db.export();
      const tempPath = `${DB_SQLITE_FILE}.tmp`;
      fs.writeFileSync(tempPath, Buffer.from(binaryData));
      fs.renameSync(tempPath, DB_SQLITE_FILE);
    } catch (err) {
      console.error('Error writing SQLite database to disk:', err);
    }
  }

  private createTablesIfNotExist() {
    if (!this.db) return;

    this.db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        brand TEXT NOT NULL,
        model_series TEXT,
        price INTEGER NOT NULL,
        original_price INTEGER,
        condition_grade TEXT,
        battery_health INTEGER,
        battery_cycle INTEGER,
        processor TEXT,
        ram TEXT,
        storage TEXT,
        display TEXT,
        gpu TEXT,
        weight_kg REAL,
        in_stock INTEGER NOT NULL DEFAULT 1,
        stock_count INTEGER NOT NULL DEFAULT 1,
        hero_image TEXT,
        gallery_images TEXT,
        description TEXT,
        warranty_months INTEGER DEFAULT 12,
        inspection_score INTEGER DEFAULT 98,
        highlights TEXT,
        key_ports TEXT,
        suitable_for TEXT,
        geekbench_multi_score INTEGER,
        cinebench_r23_score INTEGER,
        affiliate_tokopedia TEXT,
        affiliate_shopee TEXT,
        affiliate_whatsapp TEXT,
        inspection_report TEXT,
        created_at TEXT,
        updated_at TEXT
      );

      CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        author TEXT NOT NULL,
        date TEXT NOT NULL,
        read_time TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        cover_image TEXT NOT NULL,
        tags TEXT,
        related_product_id TEXT,
        pros TEXT,
        cons TEXT,
        verdict_score REAL,
        created_at TEXT,
        updated_at TEXT
      );
    `);
  }

  private seedInitialDataIfEmpty() {
    if (!this.db) return;

    // Check products
    const prodCountRes = this.db.exec('SELECT COUNT(*) as cnt FROM products');
    const prodCount = prodCountRes[0]?.values[0]?.[0] as number;
    if (prodCount === 0) {
      console.log('🌱 Seeding initial products into SQL table...');
      for (const p of MOCK_PRODUCTS) {
        this.insertProductRecord(p);
      }
    }

    // Check articles
    const artCountRes = this.db.exec('SELECT COUNT(*) as cnt FROM articles');
    const artCount = artCountRes[0]?.values[0]?.[0] as number;
    if (artCount === 0) {
      console.log('🌱 Seeding initial articles into SQL table...');
      for (const a of MOCK_ARTICLES) {
        this.insertArticleRecord(a);
      }
    }
  }

  // Helper to insert product record
  private insertProductRecord(p: UltrabookProduct) {
    if (!this.db) return;
    const now = new Date().toISOString();
    this.db.run(
      `INSERT OR REPLACE INTO products (
        id, title, brand, model_series, price, original_price, condition_grade,
        battery_health, battery_cycle, processor, ram, storage, display, gpu, weight_kg,
        in_stock, stock_count, hero_image, gallery_images, description, warranty_months,
        inspection_score, highlights, key_ports, suitable_for, geekbench_multi_score,
        cinebench_r23_score, affiliate_tokopedia, affiliate_shopee, affiliate_whatsapp,
        inspection_report, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        p.id,
        p.title,
        p.brand,
        p.modelSeries || '',
        p.price,
        p.originalPrice || p.price * 2,
        p.conditionGrade || 'Grade A+',
        p.batteryHealth || 95,
        p.batteryCycle || 100,
        p.processor || '',
        p.ram || '',
        p.storage || '',
        p.display || '',
        p.gpu || '',
        p.weightKg || 1.2,
        p.inStock ? 1 : 0,
        p.stockCount || 1,
        p.heroImage || '',
        JSON.stringify(p.galleryImages || [p.heroImage]),
        p.description || '',
        p.warrantyMonths || 12,
        p.inspectionScore || 98,
        JSON.stringify(p.highlights || []),
        JSON.stringify(p.keyPorts || []),
        JSON.stringify(p.suitableFor || []),
        p.geekbenchMultiScore || null,
        p.cinebenchR23Score || null,
        p.affiliateLinks?.tokopedia || '',
        p.affiliateLinks?.shopee || '',
        p.affiliateLinks?.whatsapp || '',
        JSON.stringify(p.inspectionReport || {}),
        now,
        now,
      ]
    );
  }

  // Helper to map DB row to UltrabookProduct
  private mapRowToProduct(row: any[], columns: string[]): UltrabookProduct {
    const obj: any = {};
    columns.forEach((col, idx) => {
      obj[col] = row[idx];
    });

    return {
      id: obj.id,
      title: obj.title,
      brand: obj.brand,
      modelSeries: obj.model_series,
      price: obj.price,
      originalPrice: obj.original_price,
      conditionGrade: obj.condition_grade,
      batteryHealth: obj.battery_health,
      batteryCycle: obj.battery_cycle,
      processor: obj.processor,
      ram: obj.ram,
      storage: obj.storage,
      display: obj.display,
      gpu: obj.gpu,
      weightKg: obj.weight_kg,
      inStock: Boolean(obj.in_stock),
      stockCount: obj.stock_count,
      heroImage: obj.hero_image,
      galleryImages: this.safeParseJson(obj.gallery_images, [obj.hero_image]),
      description: obj.description,
      warrantyMonths: obj.warranty_months,
      inspectionScore: obj.inspection_score,
      highlights: this.safeParseJson(obj.highlights, []),
      keyPorts: this.safeParseJson(obj.key_ports, []),
      suitableFor: this.safeParseJson(obj.suitable_for, []),
      geekbenchMultiScore: obj.geekbench_multi_score || undefined,
      cinebenchR23Score: obj.cinebench_r23_score || undefined,
      affiliateLinks: {
        tokopedia: obj.affiliate_tokopedia,
        shopee: obj.affiliate_shopee,
        whatsapp: obj.affiliate_whatsapp,
      },
      inspectionReport: this.safeParseJson(obj.inspection_report, {
        date: new Date().toLocaleDateString('id-ID'),
        technician: 'QC Specialist Minority Tech',
        ssdHealth: 99,
        thermalUnderLoad: '68°C Max',
        keyboardTest: 'Passed',
        screenTest: 'Passed',
        audioMicCamera: 'Passed',
        chassisCondition: 'Grade A+ Mulus',
        checkItems: [],
      }),
    };
  }

  // Helper to insert article record
  private insertArticleRecord(a: TechArticle) {
    if (!this.db) return;
    const now = new Date().toISOString();
    this.db.run(
      `INSERT OR REPLACE INTO articles (
        id, slug, title, category, author, date, read_time,
        excerpt, content, cover_image, tags, related_product_id,
        pros, cons, verdict_score, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        a.id,
        a.slug,
        a.title,
        a.category,
        a.author,
        a.date,
        a.readTime,
        a.excerpt,
        a.content,
        a.coverImage,
        JSON.stringify(a.tags || []),
        a.relatedProductId || null,
        JSON.stringify(a.pros || []),
        JSON.stringify(a.cons || []),
        a.verdictScore !== undefined ? a.verdictScore : null,
        now,
        now,
      ]
    );
  }

  // Helper to map DB row to TechArticle
  private mapRowToArticle(row: any[], columns: string[]): TechArticle {
    const obj: any = {};
    columns.forEach((col, idx) => {
      obj[col] = row[idx];
    });

    return {
      id: obj.id,
      slug: obj.slug,
      title: obj.title,
      category: obj.category,
      author: obj.author,
      date: obj.date,
      readTime: obj.read_time,
      excerpt: obj.excerpt,
      content: obj.content,
      coverImage: obj.cover_image,
      tags: this.safeParseJson(obj.tags, []),
      relatedProductId: obj.related_product_id || undefined,
      pros: this.safeParseJson(obj.pros, undefined),
      cons: this.safeParseJson(obj.cons, undefined),
      verdictScore: obj.verdict_score !== null ? Number(obj.verdict_score) : undefined,
    };
  }

  private safeParseJson(str: any, fallback: any) {
    if (!str) return fallback;
    try {
      return JSON.parse(str);
    } catch {
      return fallback;
    }
  }

  // ==================== PRODUCTS API ====================

  public getProducts(): UltrabookProduct[] {
    if (!this.db) return [...MOCK_PRODUCTS];
    try {
      const res = this.db.exec('SELECT * FROM products ORDER BY rowid DESC');
      if (!res[0]) return [];
      const { columns, values } = res[0];
      return values.map((row: any) => this.mapRowToProduct(row, columns));
    } catch (err) {
      console.error('Error querying products:', err);
      return [];
    }
  }

  public getProductById(id: string): UltrabookProduct | undefined {
    if (!this.db) return undefined;
    try {
      const stmt = this.db.prepare('SELECT * FROM products WHERE id = :id LIMIT 1');
      stmt.bind({ ':id': id });
      if (stmt.step()) {
        const row = stmt.get();
        const columns = stmt.getColumnNames();
        stmt.free();
        return this.mapRowToProduct(row, columns);
      }
      stmt.free();
      return undefined;
    } catch (err) {
      console.error('Error querying product by id:', err);
      return undefined;
    }
  }

  public createProduct(data: Partial<UltrabookProduct>): UltrabookProduct {
    const id = data.id || `mt-${data.brand?.toLowerCase() || 'laptop'}-${Date.now().toString(36)}`;
    const newProduct: UltrabookProduct = {
      id,
      title: data.title || 'Untitled Ultrabook',
      brand: data.brand || 'Lenovo',
      modelSeries: data.modelSeries || 'Business Series',
      price: Number(data.price) || 9500000,
      originalPrice: Number(data.originalPrice) || (Number(data.price) ? Number(data.price) * 2 : 20000000),
      conditionGrade: data.conditionGrade || 'Grade A+',
      batteryHealth: Number(data.batteryHealth) || 95,
      batteryCycle: Number(data.batteryCycle) || 120,
      processor: data.processor || 'Intel Core i7 Processor',
      ram: data.ram || '16GB LPDDR4x',
      storage: data.storage || '512GB NVMe SSD',
      display: data.display || '14" FHD IPS Anti-Glare 400 nits',
      gpu: data.gpu || 'Intel Iris Xe Graphics',
      weightKg: Number(data.weightKg) || 1.25,
      inStock: data.inStock !== undefined ? Boolean(data.inStock) : true,
      stockCount: Number(data.stockCount) || 1,
      heroImage: data.heroImage || 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80',
      galleryImages: Array.isArray(data.galleryImages) && data.galleryImages.length > 0 
        ? data.galleryImages 
        : [data.heroImage || 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80'],
      description: data.description || 'Premium Used Ultrabook kurasi resmi Minority Tech.',
      warrantyMonths: Number(data.warrantyMonths) || 12,
      inspectionScore: Number(data.inspectionScore) || 98,
      highlights: Array.isArray(data.highlights) && data.highlights.length > 0 
        ? data.highlights 
        : ['Lolos 28-Titik QC Lab', 'Garansi 1 Tahun Resmi', 'Kondisi Fisik 98% Mulus'],
      keyPorts: Array.isArray(data.keyPorts) && data.keyPorts.length > 0 
        ? data.keyPorts 
        : ['2x USB-C / Thunderbolt', '2x USB-A', '1x HDMI', '1x Audio Jack'],
      suitableFor: Array.isArray(data.suitableFor) && data.suitableFor.length > 0 
        ? data.suitableFor 
        : ['Programmer', 'Bisnis & Eksekutif', 'Mahasiswa'],
      geekbenchMultiScore: data.geekbenchMultiScore ? Number(data.geekbenchMultiScore) : undefined,
      cinebenchR23Score: data.cinebenchR23Score ? Number(data.cinebenchR23Score) : undefined,
      affiliateLinks: {
        tokopedia: data.affiliateLinks?.tokopedia || 'https://tokopedia.com',
        shopee: data.affiliateLinks?.shopee || 'https://shopee.co.id',
        whatsapp: data.affiliateLinks?.whatsapp || `https://wa.me/6281234567890?text=Halo%20Minority%20Tech,%20saya%20tertarik%20dengan%20unit%20${encodeURIComponent(data.title || 'Laptop')}`,
      },
      inspectionReport: {
        date: data.inspectionReport?.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        technician: data.inspectionReport?.technician || 'Rian S. (Senior QC Minority Tech)',
        ssdHealth: Number(data.inspectionReport?.ssdHealth) || 99,
        thermalUnderLoad: data.inspectionReport?.thermalUnderLoad || '68°C Max (Cinebench R23 Stres Test)',
        keyboardTest: data.inspectionReport?.keyboardTest || '100% Passed (Seluruh tombol & backlit normal)',
        screenTest: data.inspectionReport?.screenTest || '100% Passed (Zero Dead Pixel, Zero White Spot)',
        audioMicCamera: data.inspectionReport?.audioMicCamera || 'Passed (Speaker & Webcam FHD Jernih)',
        chassisCondition: data.inspectionReport?.chassisCondition || 'Grade A+ Mulus terawat',
        checkItems: data.inspectionReport?.checkItems || [
          { name: 'Motherboard & Clean BIOS', category: 'Hardware', status: 'Passed', note: 'Non-Password, siap install OS' },
          { name: 'Layar Anti-Glare & Panel', category: 'Layar', status: 'Passed', note: 'Zero dead pixel terverifikasi' },
          { name: 'Kesehatan Baterai', category: 'Baterai', status: 'Passed', note: `Health ${data.batteryHealth || 95}%, siap pakai` },
          { name: 'Port I/O & Pengisian Cepat', category: 'Port & Konektivitas', status: 'Passed', note: 'Semua port berfungsi lancar' },
        ],
      },
    };

    this.insertProductRecord(newProduct);
    this.flushToDisk();
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<UltrabookProduct>): UltrabookProduct | null {
    const existing = this.getProductById(id);
    if (!existing) return null;

    const merged: UltrabookProduct = {
      ...existing,
      ...updates,
      id: existing.id,
      price: updates.price !== undefined ? Number(updates.price) : existing.price,
      originalPrice: updates.originalPrice !== undefined ? Number(updates.originalPrice) : existing.originalPrice,
      batteryHealth: updates.batteryHealth !== undefined ? Number(updates.batteryHealth) : existing.batteryHealth,
      batteryCycle: updates.batteryCycle !== undefined ? Number(updates.batteryCycle) : existing.batteryCycle,
      weightKg: updates.weightKg !== undefined ? Number(updates.weightKg) : existing.weightKg,
      stockCount: updates.stockCount !== undefined ? Number(updates.stockCount) : existing.stockCount,
      inStock: updates.inStock !== undefined ? Boolean(updates.inStock) : existing.inStock,
      inspectionScore: updates.inspectionScore !== undefined ? Number(updates.inspectionScore) : existing.inspectionScore,
      affiliateLinks: {
        ...existing.affiliateLinks,
        ...(updates.affiliateLinks || {}),
      },
      inspectionReport: {
        ...existing.inspectionReport,
        ...(updates.inspectionReport || {}),
      },
    };

    this.insertProductRecord(merged);
    this.flushToDisk();
    return merged;
  }

  public deleteProduct(id: string): boolean {
    if (!this.db) return false;
    try {
      this.db.run('DELETE FROM products WHERE id = ?', [id]);
      this.flushToDisk();
      return true;
    } catch (err) {
      console.error('Error deleting product from SQLite:', err);
      return false;
    }
  }

  public resetProducts(): UltrabookProduct[] {
    if (!this.db) return [...MOCK_PRODUCTS];
    try {
      this.db.run('DELETE FROM products');
      for (const p of MOCK_PRODUCTS) {
        this.insertProductRecord(p);
      }
      this.flushToDisk();
      return this.getProducts();
    } catch (err) {
      console.error('Error resetting products:', err);
      return [];
    }
  }

  // ==================== ARTICLES API ====================

  public getArticles(): TechArticle[] {
    if (!this.db) return [...MOCK_ARTICLES];
    try {
      const res = this.db.exec('SELECT * FROM articles ORDER BY rowid DESC');
      if (!res[0]) return [];
      const { columns, values } = res[0];
      return values.map((row: any) => this.mapRowToArticle(row, columns));
    } catch (err) {
      console.error('Error querying articles:', err);
      return [];
    }
  }

  public getArticleById(id: string): TechArticle | undefined {
    if (!this.db) return undefined;
    try {
      const stmt = this.db.prepare('SELECT * FROM articles WHERE id = :id OR slug = :id LIMIT 1');
      stmt.bind({ ':id': id });
      if (stmt.step()) {
        const row = stmt.get();
        const columns = stmt.getColumnNames();
        stmt.free();
        return this.mapRowToArticle(row, columns);
      }
      stmt.free();
      return undefined;
    } catch (err) {
      console.error('Error querying article by id:', err);
      return undefined;
    }
  }

  public createArticle(data: Partial<TechArticle>): TechArticle {
    const slug = data.slug || (data.title || 'artikel')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const id = data.id || `art-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;

    const newArticle: TechArticle = {
      id,
      slug,
      title: data.title || 'Judul Artikel Baru',
      category: data.category || 'Review Mendalam',
      author: data.author || 'Tim Redaksi Minority Tech',
      date: data.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      readTime: data.readTime || '5 menit baca',
      excerpt: data.excerpt || 'Ringkasan singkat ulasan mendalam mengenai ultrabook pilihan di Minority Tech.',
      content: data.content || 'Tulis ulasan mendalam, hasil benchmark laboratorium, serta analisis teknis di sini...',
      coverImage: data.coverImage || 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80',
      tags: Array.isArray(data.tags) && data.tags.length > 0 ? data.tags : ['Ultrabook', 'Review', 'Hardware'],
      relatedProductId: data.relatedProductId || undefined,
      pros: Array.isArray(data.pros) ? data.pros : ['Kondisi fisik mulus', 'Performa stabil'],
      cons: Array.isArray(data.cons) ? data.cons : ['Stok terbatas'],
      verdictScore: data.verdictScore !== undefined ? Number(data.verdictScore) : 9.0,
    };

    this.insertArticleRecord(newArticle);
    this.flushToDisk();
    return newArticle;
  }

  public updateArticle(id: string, updates: Partial<TechArticle>): TechArticle | null {
    const existing = this.getArticleById(id);
    if (!existing) return null;

    const merged: TechArticle = {
      ...existing,
      ...updates,
      id: existing.id,
      slug: updates.slug || existing.slug,
      tags: updates.tags !== undefined ? updates.tags : existing.tags,
      pros: updates.pros !== undefined ? updates.pros : existing.pros,
      cons: updates.cons !== undefined ? updates.cons : existing.cons,
      verdictScore: updates.verdictScore !== undefined ? Number(updates.verdictScore) : existing.verdictScore,
    };

    this.insertArticleRecord(merged);
    this.flushToDisk();
    return merged;
  }

  public deleteArticle(id: string): boolean {
    if (!this.db) return false;
    try {
      this.db.run('DELETE FROM articles WHERE id = ?', [id]);
      this.flushToDisk();
      return true;
    } catch (err) {
      console.error('Error deleting article from SQLite:', err);
      return false;
    }
  }

  public resetArticles(): TechArticle[] {
    if (!this.db) return [...MOCK_ARTICLES];
    try {
      this.db.run('DELETE FROM articles');
      for (const a of MOCK_ARTICLES) {
        this.insertArticleRecord(a);
      }
      this.flushToDisk();
      return this.getArticles();
    } catch (err) {
      console.error('Error resetting articles:', err);
      return [];
    }
  }

  // ==================== STATS ====================

  public getStats() {
    const products = this.getProducts();
    const articles = this.getArticles();
    const inStock = products.filter(p => p.inStock);
    const totalInventoryValue = inStock.reduce((sum, p) => sum + (p.price * (p.stockCount || 1)), 0);
    const avgBattery = products.length > 0 
      ? Math.round(products.reduce((sum, p) => sum + p.batteryHealth, 0) / products.length) 
      : 0;
    const avgQc = products.length > 0 
      ? Math.round(products.reduce((sum, p) => sum + p.inspectionScore, 0) / products.length) 
      : 0;

    return {
      totalProducts: products.length,
      inStockCount: inStock.length,
      outOfStockCount: products.length - inStock.length,
      totalInventoryValue,
      avgBatteryHealth: avgBattery,
      avgQcScore: avgQc,
      totalArticles: articles.length,
      articlesByCategory: articles.reduce((acc: Record<string, number>, a) => {
        acc[a.category] = (acc[a.category] || 0) + 1;
        return acc;
      }, {}),
      brandBreakdown: products.reduce((acc: Record<string, number>, p) => {
        acc[p.brand] = (acc[p.brand] || 0) + 1;
        return acc;
      }, {}),
      dbEngine: 'SQLite 3 (sql.js Wasm Engine)',
      dbFilePath: DB_SQLITE_FILE,
    };
  }
}

export const sqlDb = new SqlDatabase();
