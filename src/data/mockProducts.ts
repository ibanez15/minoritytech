import { UltrabookProduct } from '../types';

export const MOCK_PRODUCTS: UltrabookProduct[] = [
  {
    id: 'thinkpad-x1-carbon-gen9',
    title: 'Lenovo ThinkPad X1 Carbon Gen 9',
    brand: 'Lenovo',
    modelSeries: 'X1 Series',
    price: 11450000,
    originalPrice: 28900000,
    conditionGrade: 'Grade A+',
    batteryHealth: 94,
    batteryCycle: 128,
    processor: 'Intel Core i7-1165G7 (4 Core, 8 Thread, Up to 4.7GHz)',
    ram: '16GB LPDDR4x 4266MHz Dual Channel',
    storage: '512GB NVMe PCIe 4.0 SSD',
    display: '14" 16:10 WUXGA (1920x1200) IPS Anti-Glare 400 nits 100% sRGB Low Power',
    gpu: 'Intel Iris Xe Graphics G7',
    weightKg: 1.13,
    inStock: true,
    stockCount: 3,
    heroImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&auto=format&fit=crop&q=80'
    ],
    description: 'Ultrabook bisnis legendaris paling dicari. Bodinya dibuat dari serat karbon & magnesium alloy standar militer MIL-STD-810H. Dilengkapi keyboard ThinkPad terbaik di kelasnya yang sangat empuk dan anti-lelah.',
    warrantyMonths: 12,
    inspectionScore: 98,
    highlights: [
      'Bobot hanya 1.13 kg super ringkas',
      'Baterai kesehatan 94% tahan 8-11 jam',
      'Dual Thunderbolt 4 + HDMI + USB-A lengkap',
      'Keyboard ThinkPad empuk dengan TrackPoint ikonik'
    ],
    keyPorts: ['2x Thunderbolt 4 / USB-C', '2x USB-A 3.2 Gen 1', '1x HDMI 2.0', '1x Audio Combo Jack'],
    suitableFor: ['Software Engineer / DevOps', 'Business Executive', 'Data Analyst', 'Penulis & Dosen'],
    geekbenchMultiScore: 5420,
    cinebenchR23Score: 5680,
    affiliateLinks: {
      tokopedia: 'https://tokopedia.com',
      shopee: 'https://shopee.co.id',
      whatsapp: 'https://wa.me/6281234567890?text=Halo%20Minority%20Tech,%20saya%20tertarik%20dengan%20ThinkPad%20X1%20Carbon%20Gen%209'
    },
    inspectionReport: {
      date: '21 Oktober 2026',
      technician: 'Rian S. (Senior Hardware QC)',
      ssdHealth: 99,
      thermalUnderLoad: '69°C Max (Cinebench R23 10 Min Loop, Baru Repaste Thermal Grizzly)',
      keyboardTest: '100% Passed (Seluruh tombol, backlit putih 2 tingkat, dan trackpoint berfungsi presisi)',
      screenTest: 'Passed 100% (No dead pixel, no white spot, kecerahan 410 nits stabil)',
      audioMicCamera: 'Passed (Quad Array Mic & Speaker Dolby Atmos kencang jernih)',
      chassisCondition: 'Grade A+ (98% mulus, tanpa dent, cat matte khas ThinkPad masih sangat pekat)',
      checkItems: [
        { name: 'Motherboard & BIOS Non-Password/Non-Computrace', category: 'Hardware', status: 'Passed', note: 'BIOS bersih, siap install OS' },
        { name: 'Layar & Panel Backlight', category: 'Layar', status: 'Passed', note: 'Zero dead pixel, 100% sRGB verified' },
        { name: 'Baterai & Pengisian Cepat RapidCharge', category: 'Baterai', status: 'Passed', note: 'Health 94%, cycle 128, tahan 8+ jam' },
        { name: 'Engsel 180 Derajat (Hinge Test)', category: 'Fisik', status: 'Passed', note: 'Kokoh tidak goyang saat diketik' },
        { name: 'Thermal & Kipas Pendingin', category: 'Hardware', status: 'Passed', note: 'Silent pada idle (34°C), baru dibersihkan' },
        { name: 'Port I/O & Thunderbolt 4 Display Output', category: 'Port & Konektivitas', status: 'Passed', note: 'Semua port berfungsi lancar' }
      ]
    }
  },
  {
    id: 'macbook-air-m1-16gb',
    title: 'Apple MacBook Air M1 (16GB RAM Special Edition)',
    brand: 'Apple',
    modelSeries: 'MacBook Air',
    price: 11900000,
    originalPrice: 21999000,
    conditionGrade: 'Grade A+',
    batteryHealth: 95,
    batteryCycle: 114,
    processor: 'Apple Silicon M1 (8-Core CPU, 4 Perf + 4 Eff, 7-Core GPU)',
    ram: '16GB Unified Memory (Langka & Kencang)',
    storage: '256GB Ultra Fast NVMe SSD',
    display: '13.3" Retina Display (2560x1600) 400 nits P3 Wide Color True Tone',
    gpu: 'Apple M1 7-Core Integrated GPU',
    weightKg: 1.29,
    inStock: true,
    stockCount: 2,
    heroImage: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=80'
    ],
    description: 'Varian langka 16GB RAM yang sangat dicari oleh programmer dan desainer grafis. Desain fanless 100% hening tanpa bising kipas dengan efisiensi daya kelas dunia yang sanggup bertahan hingga 14 jam.',
    warrantyMonths: 12,
    inspectionScore: 99,
    highlights: [
      '16GB Unified Memory (bebas lag multitasking)',
      'Fanless design: hening total tanpa kipas berdebu',
      'Baterai tahan 12-15 jam seharian tanpa charger',
      'Layar Retina warna akurat P3 Wide Color'
    ],
    keyPorts: ['2x Thunderbolt / USB 4', '1x 3.5mm Headphone Jack'],
    suitableFor: ['iOS & Web Developer', 'Desainer UI/UX & Kreator Konten', 'Mahasiswa', 'Digital Nomad'],
    geekbenchMultiScore: 7600,
    cinebenchR23Score: 7450,
    affiliateLinks: {
      tokopedia: 'https://tokopedia.com',
      shopee: 'https://shopee.co.id',
      whatsapp: 'https://wa.me/6281234567890?text=Halo%20Minority%20Tech,%20saya%20tertarik%20dengan%20MacBook%20Air%20M1%2016GB'
    },
    inspectionReport: {
      date: '20 Oktober 2026',
      technician: 'Fandi A. (Apple Certified Inspector)',
      ssdHealth: 99,
      thermalUnderLoad: '72°C Max saat stress test, pasif pendinginan sempurna',
      keyboardTest: 'Magic Keyboard 100% responsif, sensor Touch ID lancar',
      screenTest: 'Layar Retina 100% bersih tanpa staingate / flexgate issue',
      audioMicCamera: 'Spatial audio kencang, mikrofon studio, FaceTime HD jernih',
      chassisCondition: 'Grade A+ Space Grey mulus tanpa dent pada ujung sudut',
      checkItems: [
        { name: 'iCloud & MDM Clean Check', category: 'Hardware', status: 'Passed', note: 'iCloud bebas logout, non-MDM corporate lock' },
        { name: 'Baterai Original & Cycle Count Rendah', category: 'Baterai', status: 'Passed', note: 'Health 95%, 114 cycle count' },
        { name: 'Trackpad Force Touch & Haptic', category: 'Hardware', status: 'Passed', note: 'Feedback getar presisi' },
        { name: 'Layar TrueTone Sensor', category: 'Layar', status: 'Passed', note: 'TrueTone aktif normal menyesuaikan cahaya sekitar' },
        { name: 'MagSafe/USB-C 30W Charging Rate', category: 'Hardware', status: 'Passed', note: 'Charging normal cepat' }
      ]
    }
  },
  {
    id: 'thinkpad-t14s-gen2-amd',
    title: 'Lenovo ThinkPad T14s Gen 2 AMD Ryzen 7 PRO',
    brand: 'Lenovo',
    modelSeries: 'T Series',
    price: 9850000,
    originalPrice: 24500000,
    conditionGrade: 'Grade A+',
    batteryHealth: 96,
    batteryCycle: 89,
    processor: 'AMD Ryzen 7 PRO 5850U (8 Core, 16 Thread, Up to 4.4GHz, 16MB Cache)',
    ram: '16GB DDR4 3200MHz Dual Channel',
    storage: '512GB PCIe M.2 NVMe SSD',
    display: '14" FHD (1920x1080) IPS Anti-Glare 300 nits, Low Power',
    gpu: 'AMD Radeon Vega 8 Graphics',
    weightKg: 1.28,
    inStock: true,
    stockCount: 4,
    heroImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80'
    ],
    description: 'Raja multitasking dengan prosesor 8 Core 16 Thread murni. Sangat dingin, bertenaga untuk compile program berat, docker container, virtual machine, dan analisis data dengan budget di bawah 10 juta.',
    warrantyMonths: 12,
    inspectionScore: 97,
    highlights: [
      '8 Core 16 Thread: monster kompilasi kode & multitasking',
      'Pendinginan sangat dingin tidak pernah thermal throttling',
      'Harga di bawah 10 juta dengan spesifikasi beast',
      'Daya tahan baterai prima 9-11 jam'
    ],
    keyPorts: ['2x USB-C 3.2 Gen 2 (DisplayPort & PD)', '2x USB-A 3.2 Gen 1', '1x HDMI 2.0', '1x Audio Jack'],
    suitableFor: ['Programmer Backend & DevOps', 'Cybersecurity Analyst', 'Mahasiswa IT', 'Teknisi Jaringan'],
    geekbenchMultiScore: 7100,
    cinebenchR23Score: 8400,
    affiliateLinks: {
      tokopedia: 'https://tokopedia.com',
      shopee: 'https://shopee.co.id',
      whatsapp: 'https://wa.me/6281234567890?text=Halo%20Minority%20Tech,%20saya%20tertarik%20dengan%20ThinkPad%20T14s%20Gen%202%20AMD'
    },
    inspectionReport: {
      date: '22 Oktober 2026',
      technician: 'Rian S. (Senior Hardware QC)',
      ssdHealth: 99,
      thermalUnderLoad: '65°C saat full 16-thread load, sangat dingin',
      keyboardTest: 'Passed 100%, key-travel 1.5mm empuk',
      screenTest: 'Passed (Matte anti-glare, nyaman di mata tanpa pantulan)',
      audioMicCamera: 'Passed, Privacy Shutter kamera mekanik normal',
      chassisCondition: 'Grade A+ (Bodi kokoh magnesium/aluminium)',
      checkItems: [
        { name: 'Motherboard & TPM 2.0 AMD Security', category: 'Hardware', status: 'Passed', note: 'Hardware level security aktif' },
        { name: 'Kesehatan Baterai 57Wh', category: 'Baterai', status: 'Passed', note: 'Health 96%, kapasitas aktual masih sangat tinggi' },
        { name: 'Wi-Fi 6 & Bluetooth 5.2', category: 'Port & Konektivitas', status: 'Passed', note: 'Koneksi stabil di 5GHz & 2.4GHz' }
      ]
    }
  },
  {
    id: 'dell-xps-13-9310',
    title: 'Dell XPS 13 9310 InfinityEdge',
    brand: 'Dell',
    modelSeries: 'XPS Series',
    price: 12800000,
    originalPrice: 29999000,
    conditionGrade: 'Grade A+',
    batteryHealth: 92,
    batteryCycle: 140,
    processor: 'Intel Core i7-1185G7 (4 Core, 8 Thread, Up to 4.8GHz, Intel Evo)',
    ram: '16GB LPDDR4x 4267MHz',
    storage: '512GB NVMe M.2 SSD PCIe 4.0',
    display: '13.4" FHD+ (1920x1200) InfinityEdge 4-Sisi, 500 nits, 100% sRGB, Anti-Glare',
    gpu: 'Intel Iris Xe Graphics G7 96EUs',
    weightKg: 1.20,
    inStock: true,
    stockCount: 2,
    heroImage: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80'
    ],
    description: 'Mahakarya ultrabook Windows dengan rasio layar-ke-bodi 91.5% nyaris tanpa bezel. Bodi aluminium CNC presisi tinggi dengan palm-rest serat karbon tenun yang mewah dan sejuk saat disentuh.',
    warrantyMonths: 12,
    inspectionScore: 96,
    highlights: [
      'Desain InfinityEdge bezel 4-sisi tertipis di dunia',
      'Layar 500 nits super terang bahkan di luar ruangan',
      'Bahan CNC aluminium + carbon fiber weave mewah',
      'Sertifikasi Intel Evo: respons instan dan irit baterai'
    ],
    keyPorts: ['2x Thunderbolt 4 / USB-C with Power Delivery', '1x MicroSD Card Reader', '1x 3.5mm Headphone Jack'],
    suitableFor: ['Eksekutif & Konsultan Bisnis', 'Fotografer & Kreatif', 'Traveler / Remote Worker'],
    geekbenchMultiScore: 5650,
    cinebenchR23Score: 5900,
    affiliateLinks: {
      tokopedia: 'https://tokopedia.com',
      shopee: 'https://shopee.co.id',
      whatsapp: 'https://wa.me/6281234567890?text=Halo%20Minority%20Tech,%20saya%20tertarik%20dengan%20Dell%20XPS%2013%209310'
    },
    inspectionReport: {
      date: '19 Oktober 2026',
      technician: 'Fandi A. (Senior Inspector)',
      ssdHealth: 98,
      thermalUnderLoad: '71°C Max diuji thermal benchmark 15 menit',
      keyboardTest: 'Passed, edge-to-edge keyboard tactile responsif',
      screenTest: 'Passed, panel 500 nits sangat memukau tanpa bleeding',
      audioMicCamera: 'Passed, Waves MaxxAudio Pro bass punchy',
      chassisCondition: 'Grade A+ (Bodi CNC aluminium solid tanpa baret kasar)',
      checkItems: [
        { name: 'Kamera Windows Hello IR Face Unlock', category: 'Hardware', status: 'Passed', note: 'Buka kunci wajah instan 0.3 detik' },
        { name: 'Fingerprint Reader di Tombol Power', category: 'Hardware', status: 'Passed', note: 'Responsif cepat' },
        { name: 'Dual Thunderbolt 4 eGPU & Dual Monitor', category: 'Port & Konektivitas', status: 'Passed', note: 'Support output display 4K' }
      ]
    }
  },
  {
    id: 'asus-zenbook-14-oled-ux3402',
    title: 'ASUS ZenBook 14 OLED UX3402',
    brand: 'ASUS',
    modelSeries: 'ZenBook',
    price: 10750000,
    originalPrice: 19499000,
    conditionGrade: 'Grade A+',
    batteryHealth: 91,
    batteryCycle: 156,
    processor: 'Intel Core i5-1240P (12 Core, 16 Thread, Up to 4.4GHz, 12th Gen Alder Lake)',
    ram: '16GB LPDDR5 4800MHz',
    storage: '512GB PCIe 4.0 NVMe SSD',
    display: '14" 2.8K (2880x1800) OLED 90Hz, 100% DCI-P3, 0.2ms, HDR 600 True Black',
    gpu: 'Intel Iris Xe Graphics',
    weightKg: 1.39,
    inStock: true,
    stockCount: 2,
    heroImage: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=900&auto=format&fit=crop&q=80'
    ],
    description: 'Juara visual dengan panel OLED 2.8K 90Hz berakurasi warna 100% DCI-P3 PANTONE Validated. Kontras tak terhingga dengan hitam pekat sejati, sangat memanjakan mata untuk color grading, video editing, dan entertainment.',
    warrantyMonths: 12,
    inspectionScore: 97,
    highlights: [
      'Layar spektakuler 2.8K OLED 90Hz 100% DCI-P3',
      'Prosesor 12-Core Generasi 12 Intel kencang',
      'ASUS NumberPad 2.0 di touchpad',
      'Speaker Harman Kardon Dolby Atmos menggelegar'
    ],
    keyPorts: ['2x Thunderbolt 4', '1x USB 3.2 Gen 2 Type-A', '1x HDMI 2.1', '1x MicroSD', '1x 3.5mm Jack'],
    suitableFor: ['Video Editor & Graphic Designer', 'Colorist & Fotografer', 'Penikmat Multimedia HDR'],
    geekbenchMultiScore: 8200,
    cinebenchR23Score: 8900,
    affiliateLinks: {
      tokopedia: 'https://tokopedia.com',
      shopee: 'https://shopee.co.id',
      whatsapp: 'https://wa.me/6281234567890?text=Halo%20Minority%20Tech,%20saya%20tertarik%20dengan%20ASUS%20ZenBook%2014%20OLED'
    },
    inspectionReport: {
      date: '21 Oktober 2026',
      technician: 'Rian S. (Senior QC)',
      ssdHealth: 99,
      thermalUnderLoad: '73°C Max saat render video 4K',
      keyboardTest: 'Passed ErgoSense keyboard nyaman',
      screenTest: 'Passed OLED burn-in free 100% clean check, kecerahan 550 nits',
      audioMicCamera: 'Harman Kardon tuned speakers & 3DNR camera passed',
      chassisCondition: 'Grade A+ Ponder Blue elegan dengan motif Kintsugi modern',
      checkItems: [
        { name: 'OLED Pixel Uniformity & Burn-In Check', category: 'Layar', status: 'Passed', note: 'Panel 100% mulus tanpa burn-in bayang' },
        { name: 'ASUS NumberPad LED Matrix', category: 'Hardware', status: 'Passed', note: 'Kalkulator di touchpad menyala sempurna' },
        { name: 'Baterai 75Wh High Capacity', category: 'Baterai', status: 'Passed', note: 'Health 91%, kapasitas besar tahan 8-10 jam' }
      ]
    }
  },
  {
    id: 'hp-elitebook-840-g8',
    title: 'HP EliteBook 840 G8 vPro Enterprise',
    brand: 'HP',
    modelSeries: 'EliteBook',
    price: 8450000,
    originalPrice: 22800000,
    conditionGrade: 'Grade A',
    batteryHealth: 90,
    batteryCycle: 172,
    processor: 'Intel Core i5-1145G7 vPro (4 Core, 8 Thread, Up to 4.4GHz)',
    ram: '16GB DDR4 (Dual Slot Upgradeable hingga 64GB!)',
    storage: '512GB PCIe NVMe SSD (Upgradeable)',
    display: '14" FHD (1920x1080) IPS Anti-Glare 400 nits HP Sure View Reflect Privacy',
    gpu: 'Intel Iris Xe Graphics',
    weightKg: 1.35,
    inStock: true,
    stockCount: 5,
    heroImage: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80'
    ],
    description: 'Ultrabook bisnis dengan kemampuan upgrade yang langka di kelasnya: RAM dual-slot dapat diupgrade hingga 64GB dan SSD M.2 standar. Bodi aluminium perak unibody kokoh dengan speaker Bang & Olufsen.',
    warrantyMonths: 12,
    inspectionScore: 94,
    highlights: [
      'RAM dual-channel TIDAK disolder, bisa upgrade ke 64GB',
      'Budget 8 jutaan sangat bersahabat',
      'Bodi full aluminium aerospace unibody tahan banting',
      'Audio premium Bang & Olufsen'
    ],
    keyPorts: ['2x Thunderbolt 4 / USB-C', '2x USB 3.1 Gen 1 Type-A', '1x HDMI 2.0', '1x Audio Jack', '1x SIM Card Slot'],
    suitableFor: ['Corporate Worker & Finance', 'Teknisi & Developer butuh RAM besar', 'Mahasiswa Budget Terbatas'],
    geekbenchMultiScore: 5100,
    cinebenchR23Score: 5200,
    affiliateLinks: {
      tokopedia: 'https://tokopedia.com',
      shopee: 'https://shopee.co.id',
      whatsapp: 'https://wa.me/6281234567890?text=Halo%20Minority%20Tech,%20saya%20tertarik%20dengan%20HP%20EliteBook%20840%20G8'
    },
    inspectionReport: {
      date: '18 Oktober 2026',
      technician: 'Rian S.',
      ssdHealth: 98,
      thermalUnderLoad: '67°C Max, kipas senyap',
      keyboardTest: 'Passed, keyboard tahan tumpahan air (spill-resistant)',
      screenTest: 'Passed, panel 400 nits tajam bebas bintik',
      audioMicCamera: 'Bang & Olufsen stereo & HP Noise Reduction Mic passed',
      chassisCondition: 'Grade A (95% mulus, ada bekas pemakaian tipis di cover bawah tidak kasat mata)',
      checkItems: [
        { name: 'Konektivitas Dual Slot SODIMM', category: 'Hardware', status: 'Passed', note: 'Kedua slot RAM berjalan dual-channel stabil' },
        { name: 'HP Wolf Security Enterprise', category: 'Hardware', status: 'Passed', note: 'Hardware isolation verified' },
        { name: 'Baterai HP Fast Charge 53Wh', category: 'Baterai', status: 'Passed', note: 'Health 90%, cycle 172' }
      ]
    }
  },
  {
    id: 'macbook-pro-14-m1-pro',
    title: 'Apple MacBook Pro 14" M1 Pro (16-Core GPU)',
    brand: 'Apple',
    modelSeries: 'MacBook Pro',
    price: 18900000,
    originalPrice: 32999000,
    conditionGrade: 'Grade A+',
    batteryHealth: 96,
    batteryCycle: 98,
    processor: 'Apple M1 Pro (8-Core CPU: 6 Performance + 2 Efficiency)',
    ram: '16GB Unified Memory 200GB/s Bandwidth',
    storage: '512GB Ultra Fast NVMe SSD (7400MB/s)',
    display: '14.2" Liquid Retina XDR (3024x1964) ProMotion 120Hz Mini-LED, 1000 nits sustained, 1600 nits peak',
    gpu: 'Apple M1 Pro 14-Core GPU',
    weightKg: 1.60,
    inStock: true,
    stockCount: 1,
    heroImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=900&auto=format&fit=crop&q=80'
    ],
    description: 'Workstation mobile profesional impian kreator. Layar Liquid Retina XDR Mini-LED 120Hz dengan 10.000 mini-LED lokal, port HDMI full-size, SD Card reader, dan charger MagSafe 3.',
    warrantyMonths: 12,
    inspectionScore: 99,
    highlights: [
      'Layar Mini-LED XDR 120Hz ProMotion kualitas referensi bioskop',
      '14-Core GPU sanggup render video 4K ProRes multi-stream',
      'Port HDMI & SD Card reader kembali hadir',
      'Sistem audio 6-speaker dengan force-cancelling woofers'
    ],
    keyPorts: ['3x Thunderbolt 4', '1x HDMI', '1x SDXC Card Slot', '1x MagSafe 3', '1x 3.5mm Headphone Jack (High Impedance)'],
    suitableFor: ['Video Editor 4K/6K', 'Music Producer', 'Mobile App & Game Dev', '3D Blender Artist'],
    geekbenchMultiScore: 10100,
    cinebenchR23Score: 9900,
    affiliateLinks: {
      tokopedia: 'https://tokopedia.com',
      shopee: 'https://shopee.co.id',
      whatsapp: 'https://wa.me/6281234567890?text=Halo%20Minority%20Tech,%20saya%20tertarik%20dengan%20MacBook%20Pro%2014%20M1%20Pro'
    },
    inspectionReport: {
      date: '23 Oktober 2026',
      technician: 'Fandi A. (Senior Inspector)',
      ssdHealth: 100,
      thermalUnderLoad: '64°C Max (Dual fan pendingin super hening)',
      keyboardTest: 'Passed 100%, black anodized keyboard well mulus',
      screenTest: 'Passed Liquid Retina XDR mini-LED no bloom/dead pixel',
      audioMicCamera: '6-Speaker system menggelegar bass punchy, cam 1080p tajam',
      chassisCondition: 'Grade A+ Space Grey mulus 99% seperti baru',
      checkItems: [
        { name: 'Layar ProMotion 120Hz Smoothness Check', category: 'Layar', status: 'Passed', note: 'Refresh rate adaptif 120Hz sangat halus' },
        { name: 'MagSafe 3 Fast Charging 67W/96W', category: 'Hardware', status: 'Passed', note: 'Lampu indikator oranye/hijau aktif' },
        { name: 'Baterai 70Wh Kondisi Prima', category: 'Baterai', status: 'Passed', note: 'Health 96%, 98 cycle count' }
      ]
    }
  },
  {
    id: 'surface-laptop-4-amd',
    title: 'Microsoft Surface Laptop 4 (Touchscreen PixelSense)',
    brand: 'Microsoft',
    modelSeries: 'Surface Laptop',
    price: 9400000,
    originalPrice: 20999000,
    conditionGrade: 'Grade A',
    batteryHealth: 93,
    batteryCycle: 135,
    processor: 'AMD Ryzen 7 4980U Microsoft Surface Edition (8 Core, 16 Thread)',
    ram: '16GB LPDDR4x',
    storage: '512GB M.2 NVMe SSD (Removable SSD)',
    display: '13.5" PixelSense (2256x1504) 3:2 Ratio Touchscreen 10-point Multi-Touch Pen Support',
    gpu: 'AMD Radeon Graphics',
    weightKg: 1.26,
    inStock: true,
    stockCount: 2,
    heroImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=900&auto=format&fit=crop&q=80'
    ],
    description: 'Ultrabook dengan rasio layar 3:2 paling nyaman untuk membaca dokumen, browsing, dan produktivitas vertikal. Dilengkapi layar sentuh responsif dan palm-rest Alcantara mewah yang empuk dan elegan.',
    warrantyMonths: 12,
    inspectionScore: 95,
    highlights: [
      'Layar rasio 3:2 PixelSense Touchscreen resolusi tajam 2256x1504',
      'Desain minimalis monolitik tipis dan ringan 1.26 kg',
      'Kamera Windows Hello Face Login instan',
      'Audio Omnisonic tersembunyi di bawah keyboard'
    ],
    keyPorts: ['1x USB-C 3.1 Gen 2', '1x USB-A 3.1 Gen 1', '1x Surface Connect Port', '1x 3.5mm Headphone Jack'],
    suitableFor: ['Eksekutif, Mahasiswa Hukum & Bisnis', 'Akuntan & Analis Data', 'Presentasi Klien'],
    geekbenchMultiScore: 6800,
    cinebenchR23Score: 7800,
    affiliateLinks: {
      tokopedia: 'https://tokopedia.com',
      shopee: 'https://shopee.co.id',
      whatsapp: 'https://wa.me/6281234567890?text=Halo%20Minority%20Tech,%20saya%20tertarik%20dengan%20Surface%20Laptop%204'
    },
    inspectionReport: {
      date: '17 Oktober 2026',
      technician: 'Fandi A.',
      ssdHealth: 99,
      thermalUnderLoad: '68°C Max',
      keyboardTest: 'Passed tactile responsif, palm-rest bersih terawat',
      screenTest: 'Passed PixelSense 10-point touch responsive 100%',
      audioMicCamera: 'Windows Hello login 0.2 detik & Omnisonic Dolby Atmos normal',
      chassisCondition: 'Grade A Platinum finish 96% mulus',
      checkItems: [
        { name: 'Layar Sentuh 10-Point Multi Touch', category: 'Layar', status: 'Passed', note: 'Semua sudut layar mendeteksi sentuhan presisi' },
        { name: 'Removable SSD M.2 2230 Trapdoor', category: 'Hardware', status: 'Passed', note: 'Slot SSD aman dan mudah dilepas bila perlu data rescue' },
        { name: 'Baterai Health 93%', category: 'Baterai', status: 'Passed', note: 'Daya tahan 9-11 jam kerja' }
      ]
    }
  }
];

export const BRAND_LIST = ['Semua', 'Lenovo', 'Apple', 'Dell', 'ASUS', 'HP', 'Microsoft'] as const;
