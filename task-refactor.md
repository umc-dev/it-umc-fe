# Panduan & Checklist Refactoring Frontend (`it-umc-fe`)
## Perombakan Navigasi Navbar & Pemisahan Halaman S1 vs D3 Teknik Informatika

Dokumen ini dirancang sebagai panduan spesifikasi teknis dan daftar tugas (*actionable checklist*) bagi *junior developer* atau asisten AI guna melakukan pembaruan arsitektur antarmuka *frontend* (`it-umc-fe`).

---

### 🎯 Tujuan Pokok & Ide Desain Terbaik dari Stakeholder

Prinsip navigasi utama yang diinstruksikan oleh pemangku kepentingan (*User Request*):
> **"Intinya user mudah untuk mencari informasi yang dicari, membedakan mana D3 dan S1, tanpa ada menu payung yang kaku atau membingungkan."**

Solusi UI/UX yang diterapkan adalah **Navigasi Langsung & Transparan (*Zero-Friction Navigation*)**:
1. **Paket Lengkap per Program Studi:** Calon mahasiswa S1 atau D3 tidak perlu lompat-lompat mencari info biaya, mata kuliah, dan dosen di menu terpisah. Cukup buka menu dropdown **"S1 Teknik Informatika"** atau **"D3 Teknik Informatika"**, seluruh informasi krusial jenjang tersebut langsung tersedia lengkap (*All-in-One*).
2. **Tanpa Istilah Payung yang Membingungkan:** Menu umum seperti *Berita*, *Fasilitas*, *Kerja Sama*, dan *Alumni* ditaruh langsung sebagai menu utama di baris navigasi agar langsung terlihat di depan mata tanpa disembunyikan di dalam *dropdown* buatan.
3. **Tombol Pendaftaran Menyorot Berdampingan dengan Language Switcher:** Link menuju portal PMB dipisahkan menjadi tombol *Call to Action (CTA)* berwarna kontras di ujung kanan Navbar, berdampingan rapi dengan pengubah bahasa (*Language Switcher*).

---

### 🔍 Audit Pembaruan Backend (`it-umc-be`)

Backend saat ini telah mendukung variasi data jenjang studi melalui skema Prisma & MySQL terbaru:

1. **Enum Database:** `Prodi` (`S1` | `D3`)
2. **Entitas/Tabel yang Memiliki Data S1 & D3:**
   - `dosen` (properti `prodi`, default: `S1`)
   - `statistic_student` (properti `prodi`, constraint unik `[year, prodi]`)
   - `vission_mission` (properti `prodi`)
   - `study` / Distribusi Mata Kuliah (properti `prodi`)
   - `achievements` / Prestasi (properti `prodi`)
3. **Spesifikasi API Endpoint (GET):**
   Seluruh *controller* GET di backend menerima parameter query `?prodi=S1` atau `?prodi=D3`.
   - `GET ${API_URL}/dosen?prodi=S1` (atau `?prodi=D3`)
   - `GET ${API_URL}/studies?prodi=S1`
   - `GET ${API_URL}/statistic-student?prodi=S1`
   - `GET ${API_URL}/vision-mission?prodi=S1`
   - `GET ${API_URL}/achievements?prodi=S1`

---

### 🧭 Hierarki Navigasi Navbar Langsung (`components/Navbar.tsx`)

Struktur *array navigasi* pada `Navbar.tsx` disusun lugas, rapi, dan langsung to the point:

1. **Beranda** (`/`)
2. **S1 Teknik Informatika** *(Dropdown Menu Lengkap S1)*
   - Profil & Visi Misi S1 (`/s1`)
   - Kurikulum / Mata Kuliah S1 (`/akademik/distribusi-mata-kuliah/s1`)
   - Dosen & Kaprodi S1 (`/dosen/s1`)
   - Prestasi Mahasiswa S1 (`/prestasi/s1`)
   - Prospek Karir (`/akademik/prospek-karir`)
   - Biaya Kuliah (UKT) (`/akademik/ukt`)
3. **D3 Teknik Informatika** *(Dropdown Menu Lengkap D3)*
   - Profil & Visi Misi D3 (`/d3`)
   - Kurikulum / Mata Kuliah D3 (`/akademik/distribusi-mata-kuliah/d3`)
   - Dosen & Kaprodi D3 (`/dosen/d3`)
   - Prestasi Mahasiswa D3 (`/prestasi/d3`)
   - Prospek Karir (`/akademik/prospek-karir`)
   - Biaya Kuliah (UKT) (`/akademik/ukt`)
4. **Berita** (`/berita`) -> *Direct Single Link*
5. **Fasilitas** (`/fasilitas`) -> *Direct Single Link*
6. **Kerja Sama** (`/kerja-sama`) -> *Direct Single Link*
7. **Alumni** (`/alumni`) -> *Direct Single Link*
8. **[ Daftar PMB ↗ ]** -> *Tombol CTA Menyorot di Pojok Kanan Navbar (`https://pmb.umc.ac.id`)*  
   *(PERHATIAN: Posisikan tombol CTA ini tepat di sebelah kanan komponen `<LanguageSwitcher />` pada tampilan Desktop, serta secara menonjol pada menu dropdown Mobile).*

---

### 🗺️ Pola Pemisahan Rute URL di `app/`

Developer mengimplementasikan pola rute bersih berbasis parameter dinamis:

#### Sub-Parameter Prefiks (`app/[prodi]/...`)
Pindahkan halaman existing spesifik prodi ke dalam folder parameter dinamis `[prodi]`:
- `app/[prodi]/page.tsx` -> (Untuk rute `/s1` dan `/d3` merender Visi Misi & Statistik Prodi)
- `app/[prodi]/dosen/page.tsx` -> (Untuk rute `/s1/dosen` dan `/d3/dosen`)
- `app/[prodi]/dosen/kepala-program-studi/page.tsx`
- `app/[prodi]/akademik/distribusi-mata-kuliah/page.tsx`
- `app/[prodi]/prestasi/page.tsx`

---

### 📋 Checklist Pelaksanaan Tahap demi Tahap (*Actionable Tasklist*)

Silakan kerjakan urutan tugas berikut secara teratur:

#### Tahap 1: Pembaruan Type Definitions (`types/*.ts`)
- [ ] Buka `types/dosen.ts`, tambahkan `prodi?: "S1" | "D3"` pada interface `Dosen` dan parameter request API.
- [ ] Buka `types/studies.ts`, `types/visionMission.ts`, `types/statisticStudent.ts`, `types/achievement.ts`, tambahkan properti `prodi` yang sama.

#### Tahap 2: Pembaruan Server Actions (`actions/*.ts`)
- [ ] Buka `actions/dosen.ts`, modifikasi fungsi `getDosen(params)` agar memuat `searchParams.set("prodi", params.prodi)` jika parameter `prodi` dikirim.
- [ ] Lakukan penyesuaian yang sama pada `actions/studies.ts`, `actions/visionMission.ts`, `actions/statisticStudent.ts`, dan `actions/achievement.ts`.

#### Tahap 3: Perombakan `components/Navbar.tsx` (Perhatikan Language Switcher!)
- [ ] Buka `components/Navbar.tsx`, susun array `NAV_ITEMS` agar memuat 7 item utama navigasi di atas.
- [ ] Untuk item ke-8 (**Daftar PMB ↗**), keluarkan dari `NAV_ITEMS` dan letakkan secara eksplisit berdampingan dengan `<LanguageSwitcher />` di bagian kanan atas Desktop:
  ```tsx
  <div className="flex items-center gap-3">
    <div className="hidden md:block">
      <LanguageSwitcher />
    </div>
    <Link 
      href="https://pmb.umc.ac.id" 
      target="_blank" 
      className="hidden md:inline-flex px-4 py-2 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 shadow-md transition-all"
    >
      Daftar PMB ↗
    </Link>
    {/* Mobile Menu Toggle Button */}
  ...
  ```
- [ ] Pada tampilan Mobile Menu, letakkan tombol **Daftar PMB ↗** di atas/bawah `<LanguageSwitcher />` sehingga tidak tertumpuk atau berantakan.
- [ ] Sesuaikan logika helper `isActive(href)` agar menyorot menu dropdown S1 atau D3 dengan akurat saat rute prodi tersebut sedang dibuka.
- [ ] Perbarui tautan cepat di `components/Footer.tsx`.

#### Tahap 4: Restrukturisasi Halaman Rute (`app/`)
- [ ] Buat rute dinamis `app/[prodi]/dosen/page.tsx`
  - Validasi ketat parameter rute:
    ```typescript
    const prodiParam = params.prodi.toUpperCase();
    if (prodiParam !== 'S1' && prodiParam !== 'D3') notFound();
    ```
  - Panggil API dengan parameter prodi: `const dosenData = await getDosen({ prodi: prodiParam });`
- [ ] Lakukan hal yang sama untuk halaman Kurikulum (`distribusi-mata-kuliah`), Prestasi, dan Kepala Program Studi.

#### Tahap 5: Penyempurnaan Landing Page (`app/page.tsx`)
- [ ] Di Beranda Utama (`/`), pasang 2 Kartu Gerbang (*Portal Call-to-Action*) yang sangat menonjol mengajak pengunjung eksplorasi ke halaman khusus **S1 Teknik Informatika (`/s1`)** atau **D3 Teknik Informatika (`/d3`)**.

---

### ⚠️ Kompatibilitas Next.js App Router (PENTING!)

1. **Wajib Suspense Wrapper:** Setiap *hook* rute klien seperti `useSearchParams()` wajib dibungkus di dalam `<Suspense fallback={...}>`. Tanpa batas Suspense ini, proses `npm run build` Next.js akan gagal total.
2. **Verifikasi & Pengujian Kode:**
   Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
   Tes klik setiap link di Navbar serta tes ganti bahasa pada Language Switcher. Setelah sukses, jalankan verifikasi *build* statis:
   ```bash
   npm run build
   ```
   Jika seluruh rute berhasil ter-build tanpa error, tugas dinyatakan **SELESAI SEMPURNA**.
