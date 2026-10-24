import { TechArticle } from '../types';

export const MOCK_ARTICLES: TechArticle[] = [
  {
    id: 'thinkpad-x1-carbon-gen9-review-2026',
    slug: 'review-thinkpad-x1-carbon-gen-9-di-2026',
    title: 'Review Mendalam: ThinkPad X1 Carbon Gen 9 di 2026, Masih Jadi Raja Keyboard & Portabilitas?',
    category: 'Review Mendalam',
    author: 'Ilham Rizky (Tech Editor Minority Tech)',
    date: '20 Oktober 2026',
    readTime: '6 menit baca',
    excerpt: 'Setelah 5 tahun dirilis, ThinkPad X1 Carbon Gen 9 bekas kini berada di angka 11 jutaan. Apakah performa Intel Gen 11 dan layar 16:10 masih relevan menyaingi laptop konsumer baru?',
    content: `
### Pengantar: Legenda Bisnis yang Menolak Tua
Bagi para insinyur software, jurnalis, dan pebisnis, lini ThinkPad X1 Carbon adalah standar emas laptop bisnis. Pada generasi ke-9 ini, Lenovo melakukan lompatan besar: mengubah rasio layar dari 16:9 menjadi 16:10, memperlebar touchpad, serta memindahkan ventilasi panas ke bagian belakang bodi.

Di tahun 2026, harga bekas unit Grade A+ berada di rentang **Rp 11.450.000**, padahal harga rilis resminya mencapai **Rp 28.900.000**. Ini adalah depresiasi yang sangat menguntungkan pembeli cerdas yang mengincar build quality tangguh.

---

### 1. Build Quality & Material Carbon Fiber
Bodi X1 Carbon Gen 9 terbuat dari paduan serat karbon di bagian tutup dan magnesium alloy di bagian bawah. Hasilnya? Bobotnya hanya **1.13 kg**, namun telah lolos 12 uji ketahanan militer MIL-STD-810H. Saat ditekan di bagian tengah keyboard atau dipelintir, sasis sama sekali tidak menimbulkan suara derit (creak).

### 2. Pengalaman Mengetik (Typing Experience)
Walaupun Lenovo sedikit memangkas travel jarak tombol dari 1.8mm di Gen 6/7 menjadi 1.5mm di Gen 9, sensasi tactile bump-nya masih jauh mengungguli MacBook atau Dell XPS. Karakter keycap berbentuk mangkuk (cupped) menopang ujung jari dengan sempurna, meminimalkan lelah saat marathon coding 8 jam sehari.

### 3. Layar 16:10 400 Nits Anti-Glare
Layar 14 inci WUXGA (1920x1200) dengan lapisan matte anti-glare sangat ramah di mata. Anda tidak akan terganggu oleh pantulan lampu kantor atau jendela kafe. Kecerahan mencapai 400 nits dan mencakup 100% sRGB, cukup akurat untuk photo editing ringan.

### 4. Performa & Manajemen Suhu
Ditenagai Intel Core i7-1165G7 dengan RAM 16GB LPDDR4x 4266MHz, unit ini melibas tugas seperti menjalankan VS Code, beberapa tab Docker container, Postman, dan 30 tab browser Chrome tanpa kendala. Dalam uji Cinebench R23, suhu berada di 69°C setelah proses repasting pasta termal premium di Minority Tech lab.

### Kesimpulan & Rekomendasi
Jika Anda mencari laptop dengan kenyamanan mengetik nomor satu, bobot super enteng di bawah 1.2 kg, dan port yang tidak perlu dongle (tetap punya 2x USB-A dan 1x HDMI full-size), ThinkPad X1 Carbon Gen 9 Grade A+ adalah investasi terbaik di budget 11 jutaan.
    `,
    coverImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80',
    tags: ['ThinkPad', 'Review Laptop', 'Ultrabook', 'Coding'],
    relatedProductId: 'thinkpad-x1-carbon-gen9',
    pros: [
      'Keyboard terbaik di kelasnya dengan TrackPoint presisi',
      'Bobot sangat ringan 1.13 kg dengan bodi serat karbon militer',
      'Port lengkap tanpa butuh dongle (2x USB-C TB4, 2x USB-A, HDMI)',
      'Layar 16:10 lega dengan lapisan matte anti-silau'
    ],
    cons: [
      'RAM disolder (pastikan langsung beli varian 16GB)',
      'Performa grafis terintegrasi bukan untuk gaming AAA'
    ],
    verdictScore: 9.3
  },
  {
    id: 'macbook-air-m1-vs-thinkpad-t14s-gen2',
    slug: 'macbook-air-m1-vs-thinkpad-t14s-gen-2-untuk-programmer',
    title: 'MacBook Air M1 (16GB) vs ThinkPad T14s Gen 2: Mana Ultrabook Bekas Terbaik untuk Programmer?',
    category: 'Komparasi',
    author: 'Dimas Wicaksono (Senior Infrastructure Engineer)',
    date: '18 Oktober 2026',
    readTime: '7 menit baca',
    excerpt: 'Dua jagoan di kelas harga 10-12 jutaan diadu langsung: efisiensi baterai Apple Silicon vs kebuasan 8-Core 16-Thread Ryzen PRO dan kemudahan Linux ThinkPad.',
    content: `
### Dilema Terbesar Mahasiswa & Developer
Memilih laptop kerja di rentang 10 sampai 12 juta saat ini menghadapkan kita pada dua monster efisiensi: Apple MacBook Air M1 (varian 16GB) dan Lenovo ThinkPad T14s Gen 2 bertenaga AMD Ryzen 7 PRO 5850U. Keduanya memiliki reputasi luar biasa di komunitas tech enthusiast.

Mari kita bedah sektor demi sektor:

#### 1. Daya Tahan Baterai & Suhu
- **MacBook Air M1**: Menang mutlak dalam hal efisiensi. Tanpa kipas (fanless), bodi tetap adem dan baterai bisa bertahan 12-14 jam pemakaian nyata.
- **ThinkPad T14s Gen 2**: Baterai bertahan 8-10 jam (sangat bagus untuk laptop Windows/Linux). Kelebihannya, kipasnya sangat jarang berputar bising dan suhu internal terjaga di 60-an derajat Celsius.

#### 2. Kebutuhan Stack Pemrograman
- **Pilih MacBook Air M1 jika**: Anda mengembangkan aplikasi iOS / Swift, frontend React Native, Flutter, atau lebih menyukai ekosistem UNIX macOS dengan trackpad terbaik.
- **Pilih ThinkPad T14s jika**: Anda menjalankan distro Linux (Ubuntu/Fedora/Arch) untuk kernel dev, Docker containers berbasis x86 native tanpa masalah emulasi ARM, atau butuh keyboard empuk untuk pengetikan ekstensif.

#### 3. Kemampuan Port & Fleksibilitas
ThinkPad T14s dilengkapi HDMI, 2x USB-A, dan 2x USB-C. Anda bisa menancapkan flashdisk rekan kantor atau kabel proyektor kampus langsung tanpa membawa dongle adapter. Sementara MacBook Air M1 memerlukan adapter multiport.

#### Rekomendasi Akhir
Keduanya adalah pemenang di kelasnya. Namun di Minority Tech, unit ThinkPad T14s Gen 2 AMD dengan harga di bawah 10 juta (Rp 9.850.000) menawarkan *price-to-performance ratio* yang sangat sulit ditandingi.
    `,
    coverImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=80',
    tags: ['MacBook vs ThinkPad', 'Programming', 'Komparasi', 'Apple M1', 'AMD Ryzen'],
    relatedProductId: 'macbook-air-m1-16gb',
    pros: [
      'MacBook: Baterai 14 jam & fanless hening',
      'ThinkPad: 8 Core 16 Thread x86 murni & port lengkap'
    ],
    cons: [
      'MacBook butuh dongle USB-C',
      'ThinkPad bodi sedikit lebih tebal dari MacBook Air'
    ],
    verdictScore: 9.1
  },
  {
    id: 'panduan-beli-laptop-bekas-berkualitas-2026',
    slug: 'panduan-membeli-laptop-bekas-berkualitas-tanpa-zonk',
    title: 'Checklist Wajib: 7 Hal Krusial Saat Membeli Laptop Bekas Agar Tidak Tertipu',
    category: 'Panduan Beli',
    author: 'Minority Tech QC Team',
    date: '15 Oktober 2026',
    readTime: '5 menit baca',
    excerpt: 'Membeli laptop bekas bisa menghemat puluhan juta rupiah, tapi juga menyimpan risiko seperti BIOS lock, LCD rekondisi, hingga baterai suntikan. Simak panduannya!',
    content: `
Membeli laptop bekas berkualitas (pre-owned) adalah langkah paling cerdas untuk mendapatkan mesin berspesifikasi tinggi dengan sepertiga dari harga baru. Namun banyak pembeli awam terjebak laptop "servisan", bekas banjir, atau unit curian korporat yang terkunci.

Berikut adalah 7 poin protokol ketat yang selalu kami terapkan di Minority Tech:

### 1. Periksa Password BIOS & Kunci MDM / Computrace
Pastikan Anda bisa masuk ke pengaturan BIOS / UEFI tanpa dimintai password supervisor. Pada unit enterprise seperti ThinkPad atau Dell Latitude, pastikan Computrace berstatus "Deactivated" atau "Disabled". Untuk Mac, pastikan tidak terikat MDM (Mobile Device Management) korporat.

### 2. Cek Kesehatan SSD Menggunakan CrystalDiskInfo
Jangan hanya melihat kapasitas storage. Buka CrystalDiskInfo dan periksa:
- Persentase kesehatan SSD (di Minority Tech minimal 90%++)
- Total Host Writes & Power On Hours (jam pemakaian total)

### 3. Deteksi Layar: Dead Pixel, White Spot & Backlight Bleed
Buka gambar warna solid (Putih, Merah, Hijau, Biru, Hitam) dalam mode full-screen. Cermati apakah ada bintik putih terang (white spot akibat tekanan benda tumpul) atau piksel mati (dead pixel).

### 4. Uji Stabilitas Baterai Aktual (Bukan Sekadar Persentase)
Baterai bekas yang sudah rusak seringkali mati mendadak saat kapasitas menyentuh 30%. Jalankan command \`powercfg /batteryreport\` di Windows untuk melihat kapasitas desain vs kapasitas pengisian penuh (Full Charge Capacity).

### 5. Stress Test CPU & GPU Minimal 10 Menit
Jalankan benchmark seperti Cinebench R23 atau FurMark. Unit yang bermasalah pada pasta termal atau komponen VRM motherboard akan mengalami restart tiba-tiba atau freeze.

### 6. Cek Fisik Engsel & Port I/O
Buka dan tutup laptop beberapa kali. Engsel harus kokoh tanpa bunyi retakan plastik. Masukkan kabel charger ke kedua port USB-C/Thunderbolt untuk memastikan jalur pengisian daya berfungsi normal.

### 7. Pastikan Bergaransi Nyata
Jangan beli unit yang hanya memberikan "garansi toko 3 hari". Cari penjual yang memberikan garansi minimal 1 bulan tukar unit dan garansi hardware jangka panjang, seperti jaminan 1 Tahun Garansi di Minority Tech.
    `,
    coverImage: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=900&auto=format&fit=crop&q=80',
    tags: ['Tips Beli', 'Edukasi Tech', 'Hardware QC', 'Garansi'],
    verdictScore: 9.8
  },
  {
    id: 'mengapa-ultrabook-bisnis-bekas-lebih-awet',
    slug: 'mengapa-ultrabook-bisnis-bekas-jauh-lebih-awet-dari-laptop-baru-murah',
    title: 'Mengapa Membeli Ultrabook Kelas Bisnis Bekas Jauh Lebih Untung daripada Laptop Konsumer Baru?',
    category: 'Tech Insights',
    author: 'Ilham Rizky',
    date: '10 Oktober 2026',
    readTime: '6 menit baca',
    excerpt: 'Dengan budget 8-10 juta, Anda dihadapkan pilihan: laptop konsumer plastik baru dengan garansi distributor, atau ThinkPad/Dell XPS bekas bergaransi 1 tahun? Ini rahasia teknisnya.',
    content: `
Banyak orang tergoda membeli laptop baru seharga 8 juta di toko ritel karena alasan "masih baru segel". Padahal, di rentang harga tersebut, produsen biasanya memotong biaya produksi secara drastis pada aspek terpenting:

- **Bahan Sasis**: Laptop konsumer murah menggunakan plastik tipis yang mudah retak di bagian dudukan engsel (hinge mount) setelah 1-2 tahun pemakaian.
- **Kualitas Layar**: Menggunakan panel TN kusam 45% NTSC dengan sudut pandang buruk yang membuat mata cepat perih.
- **Papan Ketik**: Keyboard lentur (flexing) saat ditekan dan tidak tahan tumpahan air.

Sebaliknya, **Ultrabook Kelas Bisnis Bekas** (ThinkPad X1/T-Series, Dell XPS/Latitude 7000, HP EliteBook) dirancang untuk kebutuhan direksi dan insinyur perusahaan besar dengan standar masa pakai 7-10 tahun. Rangkanya terbuat dari magnesium alloy, karbon, atau CNC aluminium, pendingin tembaga ganda, dan suku cadang yang melimpah di pasaran internasional.

Di Minority Tech, setiap unit yang kami jual telah melalui 28 poin inspeksi mendalam, pembersihan debu internal, dan repasting thermal grease kelas enthusiast, didukung garansi 1 tahun penuh.
    `,
    coverImage: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&auto=format&fit=crop&q=80',
    tags: ['Tips Finansial', 'ThinkPad', 'Tech Insights', 'Laptop Bisnis'],
    verdictScore: 9.5
  }
];
