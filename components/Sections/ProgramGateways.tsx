import Link from "next/link";

export default function ProgramGateways() {
  return (
    <section className="py-20 bg-slate-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 tracking-tight">
            Program Studi Teknik Informatika
          </h2>
          <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto font-light">
            Informasi pilihan jalur pendidikan di Program Studi Teknik Informatika Universitas Muhammadiyah Cirebon.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* S1 Card */}
          <div className="bg-white rounded-2xl border border-border/80 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 p-8 md:p-10 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full transition-colors" />
            <div>
              <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                Program Sarjana (S1)
              </span>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                S1 Teknik Informatika
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
                Program pendidikan strata satu (S1) yang berfokus pada penguasaan teori dasar ilmu komputer, analisis algoritma, serta perancangan perangkat lunak.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Gelar Akademik: Sarjana Teknik (S.T.)",
                  "Kurikulum pemaduan teori dan praktikum komputer",
                  "Prospek Kerja: Programmer, Analis Sistem, Pengembang TI",
                  "Masa Studi Standar: 4 Tahun (8 Semester)",
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-foreground/80 font-light">
                    <span className="text-primary font-bold">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/s1"
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-xs group-hover:scale-[1.01] duration-200"
            >
              Lihat Profil S1 <span>➔</span>
            </Link>
          </div>

          {/* D3 Card */}
          <div className="bg-white rounded-2xl border border-border/80 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 p-8 md:p-10 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full transition-colors" />
            <div>
              <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                Program Diploma (D3)
              </span>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                D3 Teknik Informatika
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
                Program pendidikan diploma tiga (D3) yang menitikberatkan pada keterampilan praktis dan terapan operasional teknologi informasi.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Gelar Akademik: Ahli Madya Teknik (A.Md.T.)",
                  "Kurikulum dominan praktikum laboratorium",
                  "Prospek Kerja: Pengembang Web/Mobile, Teknisi Jaringan",
                  "Masa Studi Standar: 3 Tahun (6 Semester)",
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-foreground/80 font-light">
                    <span className="text-primary font-bold">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/d3"
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-xs group-hover:scale-[1.01] duration-200"
            >
              Lihat Profil D3 <span>➔</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
