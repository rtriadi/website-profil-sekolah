/**
 * Phase-1 content types for school profile data.
 *
 * Covers PROF-01 (identity/contact/accreditation) and
 * PROF-02 (history/vision/mission) only.
 * No phase-2/3 entities (announcements, media, gallery) here.
 */

export interface Accreditation {
  rating: string;
  institution: string;
  certificateNumber: string;
  validUntil: string; // ISO date
}

export interface Contact {
  phone: string;
  email: string;
  website: string;
}

export interface Address {
  street: string;
  village: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface SchoolIdentity {
  name: string;
  shortName: string;
  npsn: string; // National school ID (Indonesia)
  foundedDate: string; // ISO date
  principalName: string;
  status: "Negeri" | "Swasta";
}

export interface SchoolProfile {
  identity: SchoolIdentity;
  address: Address;
  contact: Contact;
  accreditation: Accreditation;
  heroBadge?: string; // badge text on homepage hero
  heroSubtitle?: string; // subtitle/description on homepage hero
}

export interface SchoolNarrative {
  history: string[];
  vision: string;
  mission: string[];
}

export const defaultSchoolProfile: SchoolProfile = {
  identity: {
    name: "Nama Sekolah",
    shortName: "NS",
    npsn: "00000001",
    foundedDate: "2000-01-01",
    principalName: "Nama Kepala Sekolah",
    status: "Negeri",
  },
  address: {
    street: "Jalan Contoh No. 1",
    village: "Kelurahan Contoh",
    district: "Kecamatan Contoh",
    city: "Kota Contoh",
    province: "Provinsi Contoh",
    postalCode: "00000",
  },
  contact: {
    phone: "(0000) 000-0000",
    email: "admin@sekolah.sch.id",
    website: "https://sekolah.sch.id",
  },
  accreditation: {
    rating: "A",
    institution: "BAN-S/M",
    certificateNumber: "000/XX/X/0000",
    validUntil: "2028-12-31",
  },
};

export const defaultSchoolNarrative: SchoolNarrative = {
  history: [
    "Sekolah ini didirikan pada tahun 2000 dengan tujuan menyediakan pendidikan berkualitas bagi masyarakat sekitar. Awalnya sekolah hanya memiliki beberapa ruang kelas dan puluhan siswa.",
    "Seiring berjalannya waktu, fasilitas terus dikembangkan dan jumlah siswa terus bertambah. Kini sekolah telah memiliki laboratorium, perpustakaan, dan fasilitas olahraga yang memadai.",
  ],
  vision:
    "Terwujudnya peserta didik yang beriman, berilmu, berkarakter, dan berdaya saing global.",
  mission: [
    "Menyelenggarakan pembelajaran yang aktif, kreatif, efektif, dan menyenangkan.",
    "Membentuk karakter peserta didik yang berakhlak mulia dan berbudaya.",
    "Mengembangkan potensi akademik dan non-akademik secara optimal.",
    "Meningkatkan kompetensi tenaga pendidik dan kependidikan.",
    "Menjalin kerjasama yang harmonis dengan orang tua dan masyarakat.",
  ],
};

/* ── Phase 2: Programs / Majors ────────────────────────── */

export interface SchoolProgram {
  name: string;
  description: string;
  slug: string;
  type: string; // free-form text (e.g. "Kelompok A", "Tahfidz", "Seni", etc.)
  icon: string; // emoji or icon name
}

export const defaultPrograms: SchoolProgram[] = [
  {
    name: "Ilmu Pengetahuan Alam",
    description:
      "Program IPA menekankan pemahaman konsep sains, matematika, dan praktikum laboratorium. Siswa dibekali kemampuan analitis dan logis untuk melanjutkan studi di bidang sains, teknologi, kedokteran, dan teknik.",
    slug: "ipa",
    type: "IPA",
    icon: "🔬",
  },
  {
    name: "Ilmu Pengetahuan Sosial",
    description:
      "Program IPS berfokus pada kajian sosial, ekonomi, geografi, dan sejarah. Siswa dilatih untuk memahami dinamika masyarakat dan siap melanjutkan ke bidang hukum, ekonomi, dan ilmu sosial lainnya.",
    slug: "ips",
    type: "IPS",
    icon: "📊",
  },
  {
    name: "Bahasa dan Budaya",
    description:
      "Program Bahasa mengembangkan kompetensi linguistik dalam bahasa Indonesia, Inggris, dan bahasa asing lainnya. Siswa dipersiapkan untuk studi di bidang sastra, komunikasi, dan hubungan internasional.",
    slug: "bahasa",
    type: "Bahasa",
    icon: "📖",
  },
];

/* ── Phase 2: Facilities ───────────────────────────────── */

export interface Facility {
  name: string;
  description: string;
  slug: string;
  category:
    | "Laboratorium"
    | "Perpustakaan"
    | "Olahraga"
    | "Kesenian"
    | "Ibadah"
    | "Kesehatan"
    | "Lainnya";
}

export const defaultFacilities: Facility[] = [
  {
    name: "Laboratorium IPA",
    description:
      "Laboratorium fisika, kimia, dan biologi yang dilengkapi peralatan praktikum modern untuk menunjang kegiatan pembelajaran sains.",
    slug: "laboratorium-ipa",
    category: "Laboratorium",
  },
  {
    name: "Laboratorium Komputer",
    description:
      "Ruang komputer dengan 40 unit PC dan koneksi internet berkecepatan tinggi untuk pembelajaran teknologi informasi dan ujian berbasis komputer.",
    slug: "laboratorium-komputer",
    category: "Laboratorium",
  },
  {
    name: "Perpustakaan",
    description:
      "Perpustakaan sekolah dengan koleksi lebih dari 5.000 judul buku, ruang baca yang nyaman, dan akses ke perpustakaan digital.",
    slug: "perpustakaan",
    category: "Perpustakaan",
  },
  {
    name: "Lapangan Olahraga",
    description:
      "Lapangan serbaguna untuk sepak bola, basket, dan voli yang digunakan untuk kegiatan olahraga dan upacara sekolah.",
    slug: "lapangan-olahraga",
    category: "Olahraga",
  },
  {
    name: "Musholla",
    description:
      "Tempat ibadah yang nyaman dan bersih untuk siswa dan guru melaksanakan ibadah sehari-hari serta kegiatan keagamaan.",
    slug: "musholla",
    category: "Ibadah",
  },
];

/* ── Phase 2: Announcements ────────────────────────────── */

export interface Announcement {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  publishedAt: string; // ISO date
  scheduledAt?: string; // ISO date — if set, post becomes visible on/after this date
  spotlight?: boolean; // featured on homepage
  author: string;
  category: "berita" | "kegiatan" | "pengumuman";
}

export type AnnouncementInput = Omit<Announcement, "id" | "slug" | "publishedAt" | "scheduledAt" | "spotlight"> & {
  slug?: string; // auto-generated if empty
  scheduledAt?: string;
  spotlight?: boolean;
};

export const defaultAnnouncements: Announcement[] = [
  {
    id: "ann-001",
    title: "Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027",
    slug: "ppdb-2026-2027",
    summary:
      "Pendaftaran siswa baru dibuka mulai 1 Juli 2026. Persiapkan berkas dan ikuti prosedur pendaftaran secara online.",
    content: "Kami dengan bangga mengumumkan pembukaan Penerimaan Peserta Didik Baru (PPDB) untuk Tahun Ajaran 2026/2027.\n\n**Jadwal Pendaftaran:**\n- Pendaftaran online: 1 Juli – 15 Juli 2026\n- Verifikasi berkas: 16 Juli – 20 Juli 2026\n- Pengumuman: 25 Juli 2026\n- Daftar ulang: 26 Juli – 30 Juli 2026\n\n**Persyaratan:**\n1. Fotokopi akta kelahiran\n2. Fotokopi Kartu Keluarga\n3. Pas foto 3×4 sebanyak 4 lembar\n4. Surat keterangan sehat dari dokter\n\nPendaftaran dilakukan secara online melalui portal sekolah. Untuk informasi lebih lanjut, silakan hubungi panitia PPDB di nomor (0000) 000-0000.",
    publishedAt: "2026-06-01T08:00:00Z",
    author: "Panitia PPDB",
    category: "pengumuman",
  },
  {
    id: "ann-002",
    title: "Prestasi Gemilang di Olimpiade Sains Nasional 2026",
    slug: "prestasi-osn-2026",
    summary:
      "Tim olimpiade sains sekolah meraih 3 medali emas dan 2 medali perak di ajang OSN 2026 tingkat provinsi.",
    content: "Dengan penuh syukur kami sampaikan kabar gembira dari ajang Olimpiade Sains Nasional (OSN) 2026 tingkat provinsi.\n\nTim olimpiade sains sekolah berhasil meraih prestasi gemilang dengan membawa pulang:\n- **3 Medali Emas**: Bidang Fisika, Kimia, dan Biologi\n- **2 Medali Perak**: Bidang Matematika dan Astronomi\n\nSelamat kepada para siswa berprestasi dan pembimbing yang telah berdedikasi tinggi. Prestasi ini menjadi bukti kualitas pendidikan sains di sekolah kita.\n\nUpacara penyambutan dan pemberian apresiasi akan dilaksanakan pada hari Senin, 8 Juni 2026 di lapangan sekolah.",
    publishedAt: "2026-06-01T08:00:00Z",
    author: "Tim OSN",
    category: "berita",
  },
  {
    id: "ann-003",
    title: "Workshop Pengembangan Kurikulum Merdeka",
    slug: "workshop-kurikulum-merdeka",
    summary:
      "Seluruh guru mengikuti workshop implementasi Kurikulum Merdeka yang diselenggarakan oleh Dinas Pendidikan.",
    content: "Dalam rangka meningkatkan kualitas pembelajaran, sekolah menyelenggarakan Workshop Implementasi Kurikulum Merdeka bagi seluruh tenaga pendidik.\n\nWorkshop ini menghadirkan narasumber dari Dinas Pendidikan dan pengawas sekolah yang berkompeten di bidang pengembangan kurikulum.\n\n**Materi Workshop:**\n1. Konsep dan prinsip Kurikulum Merdeka\n2. Penyusunan modul ajar dan alur tujuan pembelajaran\n3. Asesmen diagnostik, formatif, dan sumatif\n4. Projek Penguatan Profil Pelajar Pancasila (P5)\n\nKegiatan ini bertujuan untuk memastikan kesiapan seluruh guru dalam mengimplementasikan Kurikulum Merdeka secara efektif di masing-masing mata pelajaran.",
    publishedAt: "2026-05-25T09:00:00Z",
    author: "Bidang Kurikulum",
    category: "kegiatan",
  },
  {
    id: "ann-004",
    title: "Peringatan Hari Pendidikan Nasional 2026",
    slug: "hardiknas-2026",
    summary:
      "Upacara dan pentas seni memeriahkan peringatan Hari Pendidikan Nasional di sekolah.",
    content: "Dalam rangka memperingati Hari Pendidikan Nasional (Hardiknas) tahun 2026, sekolah menyelenggarakan serangkaian kegiatan pada tanggal 2 Mei 2026.\n\n**Rangkaian Acara:**\n- Upacara bendera peringatan Hardiknas\n- Pentas seni dan budaya dari masing-masing kelas\n- Bazaar dan pameran karya siswa\n- Lomba-lomba edukatif antar kelas\n\nKegiatan dimulai pukul 07.00 WIB di lapangan sekolah. Seluruh siswa, guru, dan orang tua diundang untuk berpartisipasi memeriahkan acara ini.\n\nMari kita jadikan Hardiknas sebagai momentum untuk terus meningkatkan semangat belajar dan berkarya.",
    publishedAt: "2026-05-02T00:00:00Z",
    author: "OSIS",
    category: "kegiatan",
  },
];

/* ── Phase 4: Events ─────────────────────────────────── */

export type EventCategory = "akademik" | "non-akademik" | "libur" | "rapat" | "lainnya";

export interface SchoolEvent {
  id: string;
  title: string;
  slug: string;
  date: string; // ISO date (YYYY-MM-DD)
  time?: string;
  location?: string;
  description: string;
  category: EventCategory;
}

export const defaultEvents: SchoolEvent[] = [
  {
    id: "evt-001",
    title: "Penerimaan Raport Semester Genap",
    slug: "penerimaan-raport-semester-genap",
    date: "2026-06-20",
    time: "08:00 - 12:00",
    location: "Ruang Kelas Masing-masing",
    description: "Orang tua/wali murid diundang untuk mengambil raport semester genap tahun ajaran 2025/2026.",
    category: "akademik",
  },
  {
    id: "evt-002",
    title: "Libur Akhir Tahun Ajaran",
    slug: "libur-akhir-tahun-ajaran",
    date: "2026-06-27",
    description: "Libur akhir tahun ajaran 2025/2026. Kegiatan belajar mengajar dimulai kembali pada bulan Juli 2026.",
    category: "libur",
  },
  {
    id: "evt-003",
    title: "Masa Pengenalan Lingkungan Sekolah",
    slug: "mpls-2026",
    date: "2026-07-15",
    time: "07:00 - 13:00",
    location: "Lapangan Sekolah",
    description: "Kegiatan MPLS untuk siswa baru tahun ajaran 2026/2027. Seluruh siswa baru wajib mengikuti.",
    category: "akademik",
  },
  {
    id: "evt-004",
    title: "Pentas Seni Akhir Tahun",
    slug: "pentas-seni-akhir-tahun",
    date: "2026-06-22",
    time: "09:00 - 15:00",
    location: "Aula Sekolah",
    description: "Pentas seni dan budaya yang menampilkan kreativitas siswa dari berbagai ekstrakurikuler.",
    category: "non-akademik",
  },
  {
    id: "evt-005",
    title: "Rapat Komite Sekolah",
    slug: "rapat-komite-sekolah",
    date: "2026-06-18",
    time: "09:00 - 11:00",
    location: "Ruang Rapat",
    description: "Rapat komite sekolah membahas program kerja semester depan dan evaluasi kegiatan.",
    category: "rapat",
  },
];

/* ── Phase 5: Teachers / Staff ──────────────────────────── */

export interface Teacher {
  id: string;
  name: string;
  nip: string;
  subject: string;
  position: string;
  photoUrl?: string;
  description?: string;
}

export const defaultTeachers: Teacher[] = [];

/* ── Phase 5: Classes / Kelas ───────────────────────────── */

export interface SchoolClass {
  id: string;
  name: string;
  teacherId?: string;
  roomName?: string;
  studentCount?: number;
  description?: string;
  sortOrder: number;
}

export const defaultClasses: SchoolClass[] = [
  {
    id: "cls-001",
    name: "Kelas 1A",
    teacherId: "",
    roomName: "Ruang Bougenville",
    studentCount: 25,
    description: "Kelas untuk siswa tingkat pertama dengan fokus pengenalan lingkungan dan budi pekerti.",
    sortOrder: 1,
  },
  {
    id: "cls-002",
    name: "Kelas 1B",
    teacherId: "",
    roomName: "Ruang Anggrek",
    studentCount: 24,
    description: "Kelas paralel tingkat pertama penunjang kreativitas dan motorik dasar.",
    sortOrder: 2,
  },
];

/* ── Phase 5: Organizational Structure ───────────────── */

export interface OrgNode {
  id: string;
  name: string;
  position: string;
  parentId: string | null; // null = root (kepala sekolah)
  photoUrl?: string;
  description?: string;
  sortOrder: number;
}

export interface OrgStructure {
  title: string;
  description: string;
  members: OrgNode[];
}

export const defaultOrgStructure: OrgStructure = {
  title: "Struktur Organisasi Sekolah",
  description: "Bagan struktur organisasi dan tata kelola sekolah",
  members: [],
};

/* ── Phase 5: PPDB ────────────────────────────────────── */

export interface PPDBRequirement {
  label: string;
  description: string;
}

export interface PPDBStep {
  order: number;
  title: string;
  description: string;
}

export interface PPDBConfig {
  active: boolean;
  year: string;
  title: string;
  description: string;
  requirements: PPDBRequirement[];
  steps: PPDBStep[];
  scheduleText: string;
  contact: string;
  registrationLink?: string;
  bannerText?: string;
}

export const defaultPPDBConfig: PPDBConfig = {
  active: false,
  year: new Date().getFullYear().toString(),
  title: "Penerimaan Peserta Didik Baru",
  description:
    "Informasi pendaftaran siswa baru untuk tahun ajaran baru.",
  requirements: [
    {
      label: "Fotokopi Akta Kelahiran",
      description: "Fotokopi sebanyak 2 lembar",
    },
    {
      label: "Fotokopi Kartu Keluarga",
      description: "Fotokopi sebanyak 2 lembar",
    },
    {
      label: "Pas Foto",
      description: "Pas foto 3x4 sebanyak 4 lembar dengan latar belakang merah",
    },
    {
      label: "Surat Keterangan Sehat",
      description: "Dari dokter atau puskesmas terdekat",
    },
  ],
  steps: [
    {
      order: 1,
      title: "Pendaftaran Online",
      description: "Calon siswa mengisi formulir pendaftaran secara online melalui portal sekolah",
    },
    {
      order: 2,
      title: "Verifikasi Berkas",
      description: "Panitia memverifikasi kelengkapan dan keabsahan dokumen yang diunggah",
    },
    {
      order: 3,
      title: "Tes Seleksi",
      description: "Calon siswa mengikuti tes akademik dan wawancara sesuai jadwal",
    },
    {
      order: 4,
      title: "Pengumuman",
      description: "Hasil seleksi diumumkan melalui website dan papan pengumuman sekolah",
    },
    {
      order: 5,
      title: "Daftar Ulang",
      description: "Calon siswa yang diterima melakukan daftar ulang dan pembayaran administrasi",
    },
  ],
  scheduleText: "Jadwal pendaftaran akan diumumkan kemudian.",
  contact: "Panitia PPDB\n(0000) 000-0000\nppdb@sekolah.sch.id",
};

/* ── Phase 4: Documents ───────────────────────────────── */

export interface SchoolDocument {
  id: string;
  title: string;
  description: string;
  category: "formulir" | "brosur" | "kalender-akademik" | "kurikulum" | "lainnya";
  filename: string;
  url: string;
  fileSize: number;
  uploadedAt: string;
}

/* ── Phase 6: Contact & Location ────────────────────────── */

export interface OperatingHour {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

export interface ContactInfo {
  address: Address;
  phone: string;
  whatsapp: string;
  email: string;
  mapsEmbedUrl: string;
  operatingHours: OperatingHour[];
  socialMedia: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

export const defaultOperatingHours: OperatingHour[] = [
  { day: "Senin", open: "07:30", close: "15:30", isClosed: false },
  { day: "Selasa", open: "07:30", close: "15:30", isClosed: false },
  { day: "Rabu", open: "07:30", close: "15:30", isClosed: false },
  { day: "Kamis", open: "07:30", close: "15:30", isClosed: false },
  { day: "Jumat", open: "07:30", close: "15:30", isClosed: false },
  { day: "Sabtu", open: "07:30", close: "12:00", isClosed: false },
  { day: "Minggu", open: "", close: "", isClosed: true },
];

export const defaultContactInfo: ContactInfo = {
  address: {
    street: "Jalan Contoh No. 1",
    village: "Kelurahan Contoh",
    district: "Kecamatan Contoh",
    city: "Kota Contoh",
    province: "Provinsi Contoh",
    postalCode: "00000",
  },
  phone: "(0000) 000-0000",
  whatsapp: "08123456789",
  email: "admin@sekolah.sch.id",
  mapsEmbedUrl: "",
  operatingHours: defaultOperatingHours,
  socialMedia: {},
};

/* ── Phase 6: Academic Calendar ─────────────────────────── */

export interface AcademicCalendarEvent {
  id: string;
  title: string;
  date: string; // ISO date YYYY-MM-DD
  description?: string;
  type: "semester" | "libur" | "ujian" | "rapot" | "kegiatan";
}

export interface AcademicCalendarPeriod {
  id: string;
  label: string; // "Semester 1", "Semester 2", dll
  startDate: string; // ISO date
  endDate: string; // ISO date
  events: AcademicCalendarEvent[];
  sortOrder: number;
}

export interface AcademicCalendar {
  title: string;
  academicYear: string;
  periods: AcademicCalendarPeriod[];
}

export const defaultAcademicCalendar: AcademicCalendar = {
  title: "Kalender Akademik",
  academicYear: "2026/2027",
  periods: [],
};

/* ── Phase 6: FAQ ──────────────────────────────────────── */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "ppdb" | "biaya" | "akademik" | "fasilitas" | "lainnya";
  sortOrder: number;
}

export const defaultFAQItems: FAQItem[] = [
  {
    id: "faq-001",
    question: "Bagaimana cara mendaftar PPDB?",
    answer: "Pendaftaran dilakukan secara online melalui website sekolah. Silakan kunjungi halaman PPDB untuk informasi lengkap mengenai syarat, jadwal, dan alur pendaftaran.",
    category: "ppdb",
    sortOrder: 1,
  },
  {
    id: "faq-002",
    question: "Berapa biaya sekolah per bulan?",
    answer: "Biaya sekolah bervariasi tergantung program dan kelas. Silakan hubungi bagian administrasi untuk informasi detail mengenai SPP dan biaya lainnya.",
    category: "biaya",
    sortOrder: 1,
  },
  {
    id: "faq-003",
    question: "Jam sekolah dimulai dan selesai jam berapa?",
    answer: "Kegiatan belajar mengajar dimulai pukul 07.30 dan selesai pukul 15.30 (Senin-Kamis), Jumat selesai pukul 15.30, dan Sabtu selesai pukul 12.00.",
    category: "akademik",
    sortOrder: 1,
  },
  {
    id: "faq-004",
    question: "Apa saja fasilitas yang tersedia di sekolah?",
    answer: "Sekolah memiliki laboratorium IPA, laboratorium komputer, perpustakaan, lapangan olahraga, dan mushola. Lihat halaman Program & Fasilitas untuk informasi lengkap.",
    category: "fasilitas",
    sortOrder: 1,
  },
];

/* ── Phase 6: Testimonials ─────────────────────────────── */

export interface Testimony {
  id: string;
  name: string;
  role: string;
  content: string;
  avatarUrl?: string;
  sortOrder: number;
}

export const defaultTestimonies: Testimony[] = [
  {
    id: "tst-001",
    name: "Ibu Dewi Sartika",
    role: "Orang Tua Siswa",
    content: "Saya sangat bersyukur menyekolahkan anak di sini. Guru-gurunya sabar dan penuh perhatian. Fasilitasnya juga lengkap.",
    sortOrder: 1,
  },
  {
    id: "tst-002",
    name: "Bapak Andi Pratama",
    role: "Orang Tua Siswa",
    content: "Perkembangan anak saya sangat pesat setelah bersekolah di sini. Mulai dari akademik hingga karakter. Terima kasih untuk semua guru.",
    sortOrder: 2,
  },
];

/* ── Phase 7: Achievements ─────────────────────────────── */

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: "akademik" | "non-akademik";
  imageUrl?: string;
  sortOrder: number;
}

export const defaultAchievements: Achievement[] = [
  {
    id: "ach-001",
    title: "Juara 1 Lomba Mewarnai Tingkat Kecamatan",
    description: "Anak didik kami berhasil meraih juara pertama dalam lomba mewarnai yang diselenggarakan oleh Kecamatan.",
    date: "2025-12-01",
    category: "non-akademik",
    sortOrder: 1,
  },
  {
    id: "ach-002",
    title: "Lulusan Terbaik PAUD Se-Kota",
    description: "Program pembelajaran kami meraih predikat lulusan terbaik tingkat kota tahun ajaran 2024/2025.",
    date: "2025-06-15",
    category: "akademik",
    sortOrder: 2,
  },
];

/* ── Phase 8: Tuition ──────────────────────────────────── */

export interface TuitionItem {
  id: string;
  label: string;
  amount: number;
  description?: string;
  sortOrder: number;
}

export interface TuitionData {
  academicYear: string;
  items: TuitionItem[];
}

export const defaultTuition: TuitionData = {
  academicYear: "2025/2026",
  items: [
    { id: "tui-001", label: "Pendaftaran", amount: 150000, description: "Biaya pendaftaran sekali bayar", sortOrder: 1 },
    { id: "tui-002", label: "SPP Bulanan (Kelompok A)", amount: 100000, description: "Biaya SPP per bulan untuk PAUD Kelompok A", sortOrder: 2 },
    { id: "tui-003", label: "SPP Bulanan (Kelompok B)", amount: 125000, description: "Biaya SPP per bulan untuk PAUD Kelompok B", sortOrder: 3 },
    { id: "tui-004", label: "Uang Kegiatan", amount: 50000, description: "Biaya kegiatan ekstrakurikuler per bulan", sortOrder: 4 },
    { id: "tui-005", label: "Seragam", amount: 300000, description: "Paket seragam lengkap (setahun sekali)", sortOrder: 5 },
  ],
};

/* ── Phase 9: Meal Menu ────────────────────────────────── */

export interface MealEntry {
  id: string;
  day: string;
  snack: string;
  main: string;
  drink: string;
}

export const defaultMealMenu: MealEntry[] = [
  { id: "meal-001", day: "Senin", snack: "Bubur Kacang Hijau", main: "Nasi Tim Ayam", drink: "Susu" },
  { id: "meal-002", day: "Selasa", snack: "Pisang & Biskuit", main: "Mie Ayam Cincang", drink: "Air Putih" },
  { id: "meal-003", day: "Rabu", snack: "Puding", main: "Nasi + Telur Dadar", drink: "Susu" },
  { id: "meal-004", day: "Kamis", snack: "Roti Selai", main: "Bubur Ayam", drink: "Jus Buah" },
  { id: "meal-005", day: "Jumat", snack: "Kue Lapis", main: "Nasi + Ikan Goreng", drink: "Air Putih" },
];

/* ── Phase 10: Extracurricular ─────────────────────────── */

export interface Extracurricular {
  id: string;
  name: string;
  description: string;
  schedule: string;
  coach: string;
  icon?: string;
  sortOrder: number;
}

export const defaultExtracurriculars: Extracurricular[] = [
  { id: "eks-001", name: "Mengaji", description: "Belajar membaca Al-Qur'an dan dasar-dasar agama Islam.", schedule: "Senin & Rabu, 14.00-15.00", coach: "Ustadz Ahmad", icon: "📖", sortOrder: 1 },
  { id: "eks-002", name: "Tari Tradisional", description: "Mengembangkan bakat tari dan mencintai budaya tradisional.", schedule: "Selasa & Kamis, 14.00-15.00", coach: "Ibu Dewi", icon: "💃", sortOrder: 2 },
  { id: "eks-003", name: "Mewarnai & Menggambar", description: "Mengembangkan kreativitas dan imajinasi melalui seni rupa.", schedule: "Jumat, 14.00-15.30", coach: "Ibu Sari", icon: "🎨", sortOrder: 3 },
];

/* ── Phase 11: Regulations ─────────────────────────────── */

export interface RegulationSection {
  id: string;
  title: string;
  content: string;
  sortOrder: number;
}

export const defaultRegulations: RegulationSection[] = [
  { id: "reg-001", title: "Jam Sekolah", content: "Senin - Kamis: 07.30 - 15.30\nJumat: 07.30 - 15.30\nSabtu: 07.30 - 12.00", sortOrder: 1 },
  { id: "reg-002", title: "Kehadiran", content: "Siswa harus hadir tepat waktu. Keterlambatan lebih dari 15 menit harus disertai surat izin dari orang tua.", sortOrder: 2 },
  { id: "reg-003", title: "Kerapian", content: "Siswa wajib mengenakan seragam sesuai jadwal yang ditentukan. Rambut harus rapi dan kuku pendek.", sortOrder: 3 },
  { id: "reg-004", title: "Pembayaran SPP", content: "SPP dibayarkan paling lambat tanggal 10 setiap bulan. Keterlambatan pembayaran dikenakan sanksi sesuai ketentuan.", sortOrder: 4 },
];

/* ── Phase 12: News ────────────────────────────────────── */

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  content: string;
  summary: string;
  imageUrl?: string;
  author: string;
  publishedAt: string;
}

export const defaultNews: NewsArticle[] = [
  {
    id: "news-001",
    slug: "penerimaan-siswa-baru",
    title: "Penerimaan Siswa Baru Tahun Ajaran 2025/2026",
    content: "Kami dengan senang hati mengumumkan bahwa penerimaan siswa baru untuk tahun ajaran 2025/2026 telah dibuka. Silakan kunjungi halaman PPDB untuk informasi lengkap mengenai syarat dan tata cara pendaftaran.\n\nPendaftaran dapat dilakukan secara online melalui website sekolah atau langsung datang ke lokasi sekolah pada jam kerja.",
    summary: "Penerimaan siswa baru tahun ajaran 2025/2026 telah dibuka.",
    author: "Admin",
    publishedAt: "2025-06-01",
  },
  {
    id: "news-002",
    slug: "kegiatan-outbound-siswa",
    title: "Kegiatan Outbound Siswa Semester Genap",
    content: "Kegiatan outbound semester genap akan dilaksanakan pada bulan Agustus 2025. Kegiatan ini bertujuan untuk mengembangkan kerjasama tim dan kemandirian siswa.\n\nOutbound akan dilaksanakan di Taman Wisata Edukasi dengan berbagai permainan dan aktivitas menarik yang mendidik.",
    summary: "Outbound semester genap untuk pengembangan karakter siswa.",
    author: "Admin",
    publishedAt: "2025-05-15",
  },
];
