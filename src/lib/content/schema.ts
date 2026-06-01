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
