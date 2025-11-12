import { getAllProgramStudi } from "@/lib/akademik-data"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata = {
  title: "Program Studi | Teknik Informatika",
  description: "Program Studi Teknik Informatika S1 dan D3 Universitas Muhammadiyah Cirebon",
}

export default function ProgramPage() {
  const programs = getAllProgramStudi()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Program Studi</h1>
          <p className="text-lg md:text-xl text-white/90">
            Pilihan program pendidikan berkualitas di bidang Teknologi Informasi
          </p>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {programs.map((program) => (
              <div
                key={program.id}
                className="border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Program Header */}
                <div className="bg-linear-to-r from-primary to-primary/80 text-white p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{program.name}</h2>
                      <p className="text-white/90 text-lg">{program.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/90">Akreditasi</p>
                      <p className="text-4xl font-bold">{program.akreditasi}</p>
                      <p className="text-white/80 text-sm">{program.akreditasiDate}</p>
                    </div>
                  </div>
                </div>

                {/* Program Content */}
                <div className="p-8">
                  {/* Key Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white/50 rounded-lg p-6 border border-border">
                      <p className="text-muted-foreground text-sm mb-2">Total SKS</p>
                      <p className="text-3xl font-bold text-primary">{program.totalSKS}</p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-6 border border-border">
                      <p className="text-muted-foreground text-sm mb-2">Masa Studi</p>
                      <p className="text-3xl font-bold text-primary">{program.masaStudi}</p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-6 border border-border">
                      <p className="text-muted-foreground text-sm mb-2">Pimpinan Program</p>
                      <p className="font-semibold text-foreground">{program.pimpinProdi}</p>
                      <p className="text-sm text-muted-foreground mt-2">{program.pimpinProdiEmail}</p>
                    </div>
                  </div>

                  {/* Curriculum */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-primary mb-6 pb-3 border-b-2 border-accent">
                      Struktur Kurikulum
                    </h3>
                    <div className="space-y-8">
                      {program.kurikulum.map((sem) => (
                        <div key={sem.semester}>
                          <h4 className="text-lg font-semibold text-primary mb-4">Semester {sem.semester}</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-primary text-white">
                                  <th className="border border-primary p-4 text-left font-semibold">No.</th>
                                  <th className="border border-primary p-4 text-left font-semibold">Nama Matakuliah</th>
                                  <th className="border border-primary p-4 text-center font-semibold">SKS</th>
                                </tr>
                              </thead>
                              <tbody>
                                {sem.courses.map((course, idx) => (
                                  <tr key={idx} className="hover:bg-white/30 transition-colors">
                                    <td className="border border-border p-4 text-center">{idx + 1}</td>
                                    <td className="border border-border p-4">{course.name}</td>
                                    <td className="border border-border p-4 text-center font-semibold">{course.sks}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* UKT Link */}
                  <div className="mt-8">
                    <Link
                      href={`/akademik/ukt?program=${program.level}`}
                      className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
                    >
                      Lihat Informasi UKT
                      <ChevronRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
