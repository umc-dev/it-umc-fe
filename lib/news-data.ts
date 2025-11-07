export const newsItems = [
  {
    id: 1,
    title: "Peluncuran Laboratorium AI Terbaru",
    category: "Akademik",
    date: "15 Nov 2024",
    excerpt:
      "Program Studi Teknik Informatika meluncurkan laboratorium AI generatif terbaru dengan peralatan canggih untuk penelitian mahasiswa.",
    image: "/modern-ai-laboratory-with-computers.webp",
    content: `Program Studi Teknik Informatika dengan bangga mengumumkan peluncuran Laboratorium AI Generatif terbaru pada tanggal 15 November 2024. Laboratorium ini dilengkapi dengan peralatan komputasi tercanggih dan teknologi terdepan untuk mendukung penelitian dan pembelajaran mahasiswa.

Fasilitas baru ini mencakup:
- Server GPU high-performance untuk training model AI
- Workstation development dengan spesifikasi tinggi
- Software lisensi untuk penelitian dan pengembangan
- Koneksi internet berkecepatan tinggi

Laboratorium ini akan menjadi pusat penelitian untuk mahasiswa dalam mengembangkan solusi AI inovatif. Diharapkan dengan adanya fasilitas ini, mahasiswa dapat lebih baik dalam mengimplementasikan pengetahuan teoritis mereka ke dalam praktik nyata.

Para mahasiswa akan mendapatkan akses penuh ke laboratorium ini dengan bimbingan dari dosen-dosen berpengalaman di bidang AI dan Machine Learning.`,
  },
  {
    id: 2,
    title: "Mahasiswa Raih Juara Kompetisi Nasional",
    category: "Kegiatan Mahasiswa",
    date: "10 Nov 2024",
    excerpt:
      "Tim mahasiswa Teknik Informatika berhasil meraih juara pertama dalam kompetisi programming nasional 2024.",
    image: "/students-celebrating-victory-competition.webp",
    content: `Prestasi gemilang diraih oleh tim mahasiswa Program Studi Teknik Informatika yang berhasil memenangkan Kompetisi Pemrograman Nasional 2024 pada tanggal 10 November 2024. Kompetisi ini diikuti oleh lebih dari 150 tim dari universitas-universitas terkemuka di seluruh Indonesia.

Tim yang terdiri dari tiga mahasiswa berhasil menyelesaikan 12 soal programming dalam waktu 5 jam dengan skor sempurna. Mereka mendemonstrasikan pemahaman mendalam tentang algoritma, struktur data, dan problem solving skills.

Prestasi ini merupakan hasil dari dedikasi dan kerja keras para mahasiswa serta bimbingan intensif dari para mentor di Program Studi. Tim ini sebelumnya telah mengikuti berbagai training dan latihan tekun selama berbulan-bulan.

Universitas memberikan apresiasi tinggi atas pencapaian luar biasa ini dan berkomitmen untuk terus mendukung mahasiswa dalam mengikuti kompetisi-kompetisi bergengsi lainnya.`,
  },
  {
    id: 3,
    title: "Kolaborasi Penelitian dengan Industri Tech",
    category: "Penelitian",
    date: "05 Nov 2024",
    excerpt:
      "Penandatanganan MoU antara Program Studi dengan perusahaan teknologi terkemuka untuk pengembangan riset bersama.",
    image: "/business-meeting-technology-collaboration.webp",
    content: `Program Studi Teknik Informatika telah menjalin kerjasama strategis dengan PT Tech Solutions Indonesia melalui penandatanganan Memorandum of Understanding (MoU) pada tanggal 5 November 2024. Kerjasama ini bertujuan untuk memperkuat penelitian dan inovasi di bidang teknologi informasi.

Cakupan kolaborasi meliputi:
- Penelitian bersama dalam bidang Cloud Computing dan Big Data
- Magang dan rekrutmen bagi mahasiswa berprestasi
- Pengembangan kurikulum berbasis industri
- Workshop dan seminar teknis untuk mahasiswa

Melalui kerjasama ini, mahasiswa akan memiliki kesempatan untuk bekerja langsung dengan profesional industri dan mendapatkan pengalaman praktis yang berharga. Para peneliti juga akan mendapatkan akses ke fasilitas dan sumber daya industri untuk mendukung riset mereka.

Direktur Program Studi menyatakan bahwa kerjasama ini merupakan langkah penting dalam menjembatani dunia akademis dengan industri, sehingga lulusan Program Studi dapat lebih siap menghadapi tantangan di dunia kerja.`,
  },
]

export function getNewsById(id: number) {
  return newsItems.find((item) => item.id === id)
}

export function getRelatedNews(currentId: number, limit = 2) {
  return newsItems.filter((item) => item.id !== currentId).slice(0, limit)
}
