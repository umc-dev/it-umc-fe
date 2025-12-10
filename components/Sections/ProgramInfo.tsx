import {
  BookOpen,
  Lightbulb,
  Users,
  Award,
  Target,
  Compass,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Kurikulum Modern",
    description:
      "Materi pembelajaran adaptif sesuai standar industri global terkini.",
  },
  {
    icon: Lightbulb,
    title: "Riset & Inovasi",
    description:
      "Pusat pengembangan solusi teknologi yang berdampak bagi masyarakat.",
  },
  {
    icon: Users,
    title: "Koneksi Industri",
    description:
      "Jejaring luas dengan perusahaan teknologi untuk pengalaman praktis.",
  },
  {
    icon: Award,
    title: "Rekam Jejak",
    description:
      "Alumni sukses berkarier di startup unicorn dan perusahaan multinasional.",
  },
];

export default function ProgramInfo() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-background">
      {/* Dekorasi Background (Subtle Gradient) */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary/5 via-background to-accent/5 -z-10" />

      <div className="container mx-auto px-6">
        {/* SECTION 1: Intro & Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Kiri: Main Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Teknik Informatika UMC
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Membangun Masa Depan <span className="text-primary">Digital</span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Program Studi Teknik Informatika Universitas Muhammadiyah
                Cirebon berkomitmen mencetak talenta digital yang tidak hanya
                ahli secara teknis, tapi juga berkarakter kuat.
              </p>
              <p>
                Didukung ekosistem pembelajaran modern dan dosen praktisi, kami
                mempersiapkan Anda untuk menjadi pemimpin di era revolusi
                industri 4.0.
              </p>
            </div>

            <div className="pt-4">
              <button className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>

          {/* Kanan: Feature Grid (Bento Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-card border border-border hover:border-accent/50 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-bold text-lg text-card-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Visi & Misi (Separated Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Visi */}
          <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-8 md:p-10 shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Compass className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Compass className="w-6 h-6 text-accent-foreground" />
                <h3 className="text-2xl font-bold">Visi Kami</h3>
              </div>
              <p className="text-primary-foreground/90 text-lg leading-relaxed font-light">
                Menjadi program studi Teknik Informatika terdepan dalam
                menghasilkan profesional yang inovatif, berkarakter, dan berdaya
                saing global
              </p>
            </div>
          </div>

          {/* Card Misi */}
          <div className="relative overflow-hidden rounded-2xl bg-card border border-border p-8 md:p-10 shadow-lg">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Target className="w-32 h-32 text-foreground" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-accent" />
                <h3 className="text-2xl font-bold text-foreground">
                  Misi Utama
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Pendidikan berkualitas tinggi di bidang TI.",
                  "Penelitian relevan dengan kebutuhan industri.",
                  "Pengabdian masyarakat berbasis transfer teknologi.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
