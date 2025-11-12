export interface ProgramStudi {
  id: string
  name: string
  level: string
  akreditasi: string
  akreditasiDate: string
  totalSKS: number
  masaStudi: string
  pimpinProdi: string
  pimpinProdiEmail: string
  kurikulum: {
    semester: number
    courses: {
      name: string
      sks: number
    }[]
  }[]
}

export interface UKT {
  fakultas: string
  programStudi: string
  nominal: number
}

export interface AcademicRegulation {
  id: string
  title: string
  description: string
  year: number
}

export interface LearningOutcome {
  id: string
  title: string
  description: string
  category: "knowledge" | "skills" | "attitude"
}

export interface CareerPath {
  id: string
  title: string
  description: string
  companies: string[]
}

export const programsStudi: ProgramStudi[] = [
  {
    id: "ti-s1",
    name: "Teknik Informatika",
    level: "S1",
    akreditasi: "Baik Sekali",
    akreditasiDate: "2024",
    totalSKS: 144,
    masaStudi: "4 Tahun",
    pimpinProdi: "Harry Gunawan M.Kom",
    pimpinProdiEmail: "harrygunawan@umc.ac.id",
    kurikulum: [
      {
        semester: 1,
        courses: [
          { name: "Bahasa Inggris (Reading for Concepts)", sks: 2 },
          { name: "Agama", sks: 2 },
          { name: "Dasar Algoritma dan Pemrograman", sks: 2 },
          { name: "Praktik Dasar Algoritma dan Pemrograman", sks: 1 },
          { name: "Logika Matematika", sks: 3 },
          { name: "Matematika", sks: 2 },
          { name: "Pancasila", sks: 2 },
          { name: "Fisika", sks: 3 },
          { name: "Pengantar Teknologi Informasi", sks: 2 }
        ]
      },
      {
        semester: 2,
        courses: [
          { name: "Sistem Operasi", sks: 3 },
          { name: "AIK 1 (Kemanusian dan Keimanan)", sks: 2 },
          { name: "Bahasa Indonesia", sks: 2 },
          { name: "Sistem Digital", sks: 3 },
          { name: "Kalkulus 1", sks: 2 },
          { name: "Kewarganegaraan", sks: 2 },
          { name: "Pemrograman Terstruktur", sks: 3 },
          { name: "Kewirausahaan Islami", sks: 2 }
        ]
      },
      {
        semester: 3,
        courses: [
          { name: "Pemrograman II (PBO)", sks: 3 },
          { name: "AIK 2 (Ibadah, Akhlak dan Muamalah)", sks: 2 },
          { name: "Arsitektur dan Organisasi Komputer", sks: 3 },
          { name: "Sistem Informasi (APSI)", sks: 3 },
          { name: "Kalkulus II", sks: 2 },
          { name: "Komunikasi data", sks: 2 },
          { name: "Statistik dan Probabilitas", sks: 2 },
          { name: "Struktur Data dan Algoritma", sks: 3 }
        ]
      },
      {
        semester: 4,
        courses: [
          { name: "Rekayasa Perangkat Lunak", sks: 3 },
          { name: "Basis Data", sks: 3 },
          { name: "Pemrograman Berorientasi Objek Lanjut", sks: 3 },
          { name: "AIK 3 (Kemuhammadiyahan)", sks: 2 },
          { name: "Jaringan Komputer", sks: 3 },
          { name: "Matematika Diskrit", sks: 3 },
          { name: "Analisis dan Strategi Algoritma", sks: 3 }
        ]
      },
      {
        semester: 5,
        courses: [
          { name: "Manajemen Proyek Teknologi Informasi", sks: 2 },
          { name: "Basis Data Lanjut", sks: 3 },
          { name: "Metode Penelitian", sks: 2 },
          { name: "AIK 4 (Islam dan Ilmu Pengetahuan)", sks: 2 },
          { name: "Tes Implementasi Sistem", sks: 3 },
          { name: "Teori Bahasa dan Otomata", sks: 3 },
          { name: "Pemrograman V (Pemrograman Web)", sks: 3 },
          { name: "Grafika Komputer dan Visualisasi", sks: 3 },
          { name: "Interaksi Manusia - Komputer", sks: 2 }
        ]
      },
      {
        semester: 6,
        courses: [
          { name: "Sistem Paralel dan Terdistribusi", sks: 3 },
          { name: "Kecerdasan Komputasional", sks: 3 },
          { name: "Pengamanan Sistem Komputer", sks: 3 },
          { name: "Pemrograman Web Lanjut", sks: 3 },
          { name: "Analisis dan Perancangan Berorientasi Objek", sks: 3 },
          { name: "Pemrograman Visual", sks: 3 },
          { name: "Etika Profesi", sks: 2 },
          { name: "Kuliah Kerja Mahasiswa (KKM)", sks: 3 }
        ]
      }
    ]
  },
  {
    id: "ti-d3",
    name: "Teknik Informatika",
    level: "D3",
    akreditasi: "Baik Sekali",
    akreditasiDate: "2022",
    totalSKS: 108,
    masaStudi: "3 Tahun",
    pimpinProdi: "Ir. Siti Nurhaliza, M.T.",
    pimpinProdiEmail: "siti.nurhaliza@umcirebon.ac.id",
    kurikulum: [
      {
        semester: 1,
        courses: [
          { name: "Algoritma dan Pemrograman", sks: 4 },
          { name: "Dasar Basis Data", sks: 3 },
          { name: "Teknik Digital", sks: 3 },
          { name: "Matematika Diskrit", sks: 3 },
          { name: "Bahasa Indonesia", sks: 2 },
        ],
      },
      {
        semester: 2,
        courses: [
          { name: "Struktur Data", sks: 4 },
          { name: "Jaringan Komputer", sks: 3 },
          { name: "Sistem Operasi", sks: 3 },
          { name: "Web Programming", sks: 4 },
          { name: "English", sks: 2 },
        ],
      },
    ],
  },
]

export const uktData: UKT[] = [
  {
    fakultas: "Teknik",
    programStudi: "Teknik Informatika S1",
    nominal: 4500000,
  },
  {
    fakultas: "Teknik",
    programStudi: "Teknik Informatika D3",
    nominal: 3500000,
  },
]

export const academicRegulations: AcademicRegulation[] = [
  {
    id: "reg-1",
    title: "Peraturan Akademik 2023/2024",
    description:
      "Peraturan lengkap mengenai standar akademik, kehadiran, dan evaluasi pembelajaran untuk semua mahasiswa program studi Teknik Informatika.",
    year: 2023,
  },
  {
    id: "reg-2",
    title: "Pedoman Penulisan Skripsi",
    description:
      "Panduan komprehensif untuk penulisan skripsi/tugas akhir mencakup format, struktur, dan prosedur pengajuan.",
    year: 2023,
  },
  {
    id: "reg-3",
    title: "Standar Kompetensi Lulusan",
    description: "Standar kompetensi yang harus dimiliki oleh setiap lulusan program Teknik Informatika S1 dan D3.",
    year: 2024,
  },
]

export const learningOutcomes: LearningOutcome[] = [
  {
    id: "lo-1",
    title: "Penguasaan Fundamental Programming",
    description:
      "Mampu mengembangkan aplikasi dengan menggunakan berbagai bahasa pemrograman dan paradigma programming.",
    category: "knowledge",
  },
  {
    id: "lo-2",
    title: "Database Design & Management",
    description: "Memahami dan mampu merancang sistem database yang efisien dan aman.",
    category: "knowledge",
  },
  {
    id: "lo-3",
    title: "Web & Mobile Development",
    description: "Kompeten dalam mengembangkan aplikasi web dan mobile untuk berbagai platform.",
    category: "skills",
  },
  {
    id: "lo-4",
    title: "Network & System Administration",
    description: "Mampu mengelola, mengkonfigurasi, dan mengamankan sistem jaringan komputer.",
    category: "knowledge",
  },
  {
    id: "lo-5",
    title: "Problem Solving",
    description: "Terampil dalam analisis masalah, desain solusi, dan implementasi yang efektif.",
    category: "skills",
  },
  {
    id: "lo-6",
    title: "Professional Communication",
    description: "Mampu berkomunikasi secara profesional dalam lingkungan kerja yang multidisipliner.",
    category: "attitude",
  },
]

export const careerPaths: CareerPath[] = [
  {
    id: "career-1",
    title: "Software Developer",
    description: "Mengembangkan aplikasi desktop, web, dan mobile untuk berbagai industri dan kebutuhan bisnis.",
    companies: ["Google", "Microsoft", "Meta", "Gojek", "Tokopedia"],
  },
  {
    id: "career-2",
    title: "Data Analyst",
    description: "Menganalisis data besar untuk insight bisnis dan membuat keputusan berbasis data.",
    companies: ["Google Analytics", "Amazon", "Shopify", "Bukalapak"],
  },
  {
    id: "career-3",
    title: "System Administrator",
    description: "Mengelola infrastruktur IT, keamanan sistem, dan maintenance server perusahaan.",
    companies: ["IBM", "Cisco", "Oracle", "Indosat", "Telkom"],
  },
  {
    id: "career-4",
    title: "Network Engineer",
    description: "Merancang dan mengimplementasikan solusi jaringan untuk organisasi besar.",
    companies: ["Cisco", "Juniper", "Huawei", "PT Telkom", "Indosat"],
  },
  {
    id: "career-5",
    title: "Cybersecurity Specialist",
    description: "Melindungi sistem informasi dari ancaman keamanan dan melakukan penetration testing.",
    companies: ["Kaspersky", "Norton", "Check Point", "Bank Indonesia"],
  },
  {
    id: "career-6",
    title: "Entrepreneur/Startup Founder",
    description: "Mendirikan dan mengelola startup teknologi dengan inovasi digital.",
    companies: ["Startup Ecosystem Indonesia"],
  },
]

export function getProgramStudi(id: string) {
  return programsStudi.find((p) => p.id === id)
}

export function getAllProgramStudi() {
  return programsStudi
}

export function getUKTByProgram(level: string) {
  return uktData.find((u) => u.programStudi.includes(level))
}

export function getAcademicRegulations() {
  return academicRegulations
}

export function getLearningOutcomes(category?: string) {
  if (category) {
    return learningOutcomes.filter((lo) => lo.category === category)
  }
  return learningOutcomes
}

export function getCareerPaths() {
  return careerPaths
}
