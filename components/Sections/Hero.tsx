import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Globe,
  Award,
  CheckCircle2,
} from "lucide-react";

export default function HeroProfessionalFix() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden font-sans">
      {/* --- 1. Background Layer  --- */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/kampus_umc.jpg"
          alt="Kampus Universitas Muhammadiyah Cirebon"
          fill
          className="object-cover"
          priority
        />

        {/* LAYER 1: Overlay Gelap Merata (Agar teks pasti terbaca di mana saja) */}
        <div className="absolute inset-0 bg-slate-950/60" />

        {/* LAYER 2: Gradient Bawah (Agar transisi ke footer/section bawah mulus) */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Pattern Overlay (Texture) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* --- 2. Main Content Area --- */}
      {/* Tambahkan 'pt-24' atau 'pt-32' untuk mobile agar turun ke bawah navbar */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-24 pt-32 md:pt-20 flex-grow flex flex-col justify-center">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md mb-6 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs md:text-sm font-medium text-blue-100 tracking-wide uppercase shadow-sm">
              Pendaftaran Dibuka
            </span>
          </div>

          {/* Headline dengan Drop Shadow agar extra jelas */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
            Membangun Generasi <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-accent drop-shadow-none">
              Unggul & Islami
            </span>
            <span className="block text-2xl md:text-4xl font-light text-gray-200 mt-2">
              di Era Teknologi Digital
            </span>
          </h1>

          {/* Subheadline: Warna lebih terang (gray-200) daripada sebelumnya */}
          <p className="text-lg text-gray-100 mb-8 max-w-2xl leading-relaxed font-light border-l-2 border-accent pl-4 drop-shadow-md">
            Bergabunglah dengan Program Studi Teknik Informatika UMC. Kurikulum
            adaptif, dosen praktisi, dan ekosistem pembelajaran modern untuk
            masa depan karir gemilang.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="https://pmb.umc.ac.id"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base bg-accent font-semibold text-white rounded-lg overflow-hidden transition-all hover:bg-accent shadow-lg hover:shadow-accent/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                Daftar Sekarang
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/akademik"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white transition-all bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 backdrop-blur-md shadow-lg"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Jelajahi Program Studi
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* --- 3. Bottom Info Bar (Responsive Grid) --- */}
      <div className="relative z-20 w-full border-t border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Di Mobile jadi 2 kolom (grid-cols-2), di Tablet/Desktop 4 kolom */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {/* Stat Item 1 */}
            <div className="py-6 px-4 flex flex-col items-center text-center md:items-start md:text-left gap-3 md:flex-row md:gap-4 group">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                <Award className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-white">
                  Baik Sekali
                </p>
                <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">
                  Akreditasi
                </p>
              </div>
            </div>

            {/* Stat Item 2 */}
            <div className="py-6 px-4 flex flex-col items-center text-center md:items-start md:text-left gap-3 md:flex-row md:gap-4 group">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-white">
                  3.5k+
                </p>
                <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">
                  Mahasiswa
                </p>
              </div>
            </div>

            {/* Stat Item 3 */}
            <div className="py-6 px-4 flex flex-col items-center text-center md:items-start md:text-left gap-3 md:flex-row md:gap-4 group border-t border-white/10 md:border-t-0">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                <Globe className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-white">50+</p>
                <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">
                  Mitra
                </p>
              </div>
            </div>

            {/* Stat Item 4 */}
            <div className="py-6 px-4 flex flex-col items-center text-center md:items-start md:text-left gap-3 md:flex-row md:gap-4 group border-t border-white/10 md:border-t-0">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-white">90%</p>
                <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">
                  Kerja
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
