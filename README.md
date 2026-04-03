# IT-UMC Frontend

Website publik Program Studi Teknik Informatika, Universitas Muhammadiyah Cirebon. Konten dikelola melalui [it-umc-dashboard](../it-umc-dashboard/).

## Tech Stack

- **Next.js 16** (App Router, Server Components) + **React 19** + **TypeScript**
- **Tailwind CSS 4** — styling
- **Embla Carousel** — slider/carousel
- **Recharts** — chart statistik mahasiswa
- **React Markdown + remark-gfm** — render konten markdown
- **React PDF** — PDF viewer
- **date-fns** — format tanggal

## Halaman

| Route | Deskripsi |
|---|---|
| `/` | Landing page (hero, visi misi, statistik, testimoni alumni, berita terbaru, mitra) |
| `/berita` | Daftar berita dengan pagination |
| `/berita/[slug]` | Detail berita + share buttons |
| `/kategori/[slug]` | Berita berdasarkan kategori |
| `/dosen` | Profil dosen (grid) + struktur organisasi |
| `/dosen/kepala-program-studi` | Profil Kepala Prodi |
| `/akademik/distribusi-mata-kuliah` | Tabel kurikulum per semester |
| `/akademik/prospek-karir` | Prospek karir lulusan |
| `/akademik/ukt` | Link eksternal dokumen biaya pendidikan (PMB) |
| `/fasilitas` | Galeri fasilitas kampus |
| `/alumni` | Profil & testimoni alumni |
| `/prestasi` | Tabel prestasi |
| `/kerja-sama` | Tabel mitra kerja sama |

Tersedia juga **AI Chatbot** di setiap halaman (RAG-based).

## Menjalankan Project

### Prasyarat

- Node.js ≥ 18
- Backend API (`it-umc-be`) berjalan di `http://localhost:9090`

### Setup

```bash
npm install
```

Buat file `.env`:

```env
API_URL="http://localhost:9090/api/v1"
```

> `API_URL` tanpa prefix `NEXT_PUBLIC_` karena hanya diakses via Server Components/Actions.

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## Struktur Folder

```
app/                            # Pages (App Router)
├── berita/                     # Berita list + detail
├── dosen/                      # Profil dosen + Kaprodi
├── akademik/                   # Mata kuliah, prospek karir, UKT (Link Eksternal)
├── fasilitas/                  # Fasilitas kampus
├── alumni/                     # Alumni & testimoni
├── prestasi/                   # Prestasi
├── kerja-sama/                 # Kerja sama
└── kategori/                   # Berita per kategori
actions/                        # Server Actions (fetch data dari API)
components/
├── Navbar.tsx                  # Navigation bar
├── Footer.tsx                  # Footer
├── Chatbot.tsx                 # AI chatbot (RAG)
├── Sections/                   # Komponen landing page
├── dosen/                      # Komponen halaman dosen
├── berita/                     # Share buttons
├── alumni/                     # Grid alumni
└── skeletons/                  # Loading skeletons
hooks/                          # Custom hooks
lib/                            # Utilities
types/                          # TypeScript type definitions
```

## Arsitektur

```
Backend API ──► Server Actions ──► Server Components ──► Client Components
(it-umc-be)    (actions/*.ts)     (app/**/page.tsx)     (components/*.tsx)
```

Semua data fetching dilakukan server-side. Client components menerima data via props.
