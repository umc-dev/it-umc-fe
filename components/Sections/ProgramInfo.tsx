import { BookOpen, Lightbulb, Users, Award } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Kurikulum Modern",
    description:
      "Kurikulum yang disesuaikan dengan perkembangan industri teknologi terkini dan kebutuhan pasar kerja global.",
  },
  {
    icon: Lightbulb,
    title: "Inovasi Berkelanjutan",
    description:
      "Kami fokus pada penelitian dan pengembangan solusi teknologi yang memberikan dampak positif bagi masyarakat.",
  },
  {
    icon: Users,
    title: "Kolaborasi Industri",
    description:
      "Kerjasama dengan perusahaan teknologi terkemuka untuk memberikan pengalaman praktis kepada mahasiswa.",
  },
  {
    icon: Award,
    title: "Prestasi Mahasiswa",
    description: "Alumni kami tersebar di perusahaan multinasional dan startup teknologi ternama di seluruh dunia.",
  },
]

export default function ProgramInfo() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Tentang Program Studi Kami</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Program Studi Teknik Informatika Universitas Muhammadiyah Cirebon adalah institusi pendidikan terkemuka
                yang berkomitmen menghasilkan profesional teknologi informasi berkualitas tinggi.
              </p>
              <p>
                Dengan fasilitas laboratorium modern dan dosen-dosen berpengalaman, kami mempersiapkan generasi ahli
                yang siap menghadapi tantangan era digital.
              </p>
              <p>
                Visi kami adalah menjadi program studi pilihan utama yang menghasilkan inovator dan pemimpin dalam
                bidang teknologi informasi.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-linear-to-br from-primary/5 to-accent/5 rounded-xl border border-border hover:shadow-md transition-shadow"
              >
                <feature.icon className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-linear-to-r from-primary to-primary/80 text-white rounded-xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Visi & Misi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Visi</h4>
              <p className="opacity-90">
                Menjadi program studi Teknik Informatika terdepan dalam menghasilkan profesional yang inovatif,
                berkarakter, dan berdaya saing global.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Misi</h4>
              <ul className="space-y-2 opacity-90 text-sm">
                <li>• Menyelenggarakan pendidikan berkualitas tinggi dalam bidang teknologi informasi</li>
                <li>• Mengembangkan penelitian yang relevan dengan kebutuhan industri</li>
                <li>• Melaksanakan pengabdian kepada masyarakat melalui transfer teknologi</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
