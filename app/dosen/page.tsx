import StaffGrid from "@/components/StaffGrid"
import { getLecturers, getStaff } from "@/lib/staff-data"

export const metadata = {
  title: "Dosen & Staf | Teknik Informatika",
  description: "Tim dosen dan staf profesional Program Studi Teknik Informatika",
}

export default function DosenPage() {
  const lecturers = getLecturers()
  const staff = getStaff()

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Dosen & Staf</h1>
          <p className="text-lg md:text-xl text-white/90">
            Tim profesional yang siap membimbing dan mendukung perjalanan akademik Anda
          </p>
        </div>
      </section>

      {/* Lecturers Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Tim Dosen</h2>
            <div className="w-16 h-1 bg-accent rounded-full"></div>
            <p className="text-muted-foreground mt-4 text-lg">
              Dosen-dosen berpengalaman dengan keahlian di berbagai bidang Teknologi Informasi
            </p>
          </div>
          <StaffGrid members={lecturers} />
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Staff Pendukung</h2>
            <div className="w-16 h-1 bg-accent rounded-full"></div>
            <p className="text-muted-foreground mt-4 text-lg">
              Tim administratif dan teknis yang siap memberikan dukungan terbaik
            </p>
          </div>
          <StaffGrid members={staff} />
        </div>
      </section>
    </>
  )
}
