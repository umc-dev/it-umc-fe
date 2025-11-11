import { Briefcase, Users, Target, Award } from "lucide-react"
import { getCareerPaths } from "@/lib/akademik-data"

export const metadata = {
  title: "Prospek Karir | Teknik Informatika",
  description: "Peluang karir dan prospek lulusan Program Studi Teknik Informatika",
}

export default function CareerPathPage() {
  const careers = getCareerPaths()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Prospek Karir Lulusan</h1>
          <p className="text-lg md:text-xl text-white/90">
            Jelajahi peluang karir dan jalur pengembangan profesional untuk lulusan Teknik Informatika
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg border border-border p-8 text-center">
              <Users className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-primary mb-2">Lulusan Tersebar</h3>
              <p className="text-muted-foreground">
                Di berbagai industri dan perusahaan terkemuka nasional dan internasional
              </p>
            </div>
            <div className="bg-white rounded-lg border border-border p-8 text-center">
              <Target className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-primary mb-2">Beragam Karir</h3>
              <p className="text-muted-foreground">
                Dari Software Developer hingga Entrepreneur dengan berbagai spesialisasi
              </p>
            </div>
            <div className="bg-white rounded-lg border border-border p-8 text-center">
              <Award className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-primary mb-2">Kompetensi Global</h3>
              <p className="text-muted-foreground">Siap bersaing di pasar kerja global dengan keahlian yang relevan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">Bidang Karir Utama</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Berikut adalah berbagai bidang karir yang dapat dijalani oleh lulusan Program Studi Teknik Informatika
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careers.map((career) => (
              <div
                key={career.id}
                className="bg-white rounded-lg border border-border p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-3 mb-4">
                  <Briefcase className="w-8 h-8 text-accent shrink-0 mt-1" />
                  <h3 className="font-semibold text-lg text-primary">{career.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{career.description}</p>
                <div className="pt-6 border-t border-border">
                  <p className="text-sm font-semibold text-primary mb-3">Contoh Perusahaan:</p>
                  <div className="flex flex-wrap gap-2">
                    {career.companies.map((company) => (
                      <span
                        key={company}
                        className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-medium"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Siap Memulai Karir Anda?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan alumni kami yang sukses di berbagai industri teknologi
          </p>
          <a
            href="/akademik/program"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Lihat Program Studi Kami
          </a>
        </div>
      </section>
    </div>
  )
}
