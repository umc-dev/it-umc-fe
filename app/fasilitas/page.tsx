import { Mail, Phone } from "lucide-react"

export const metadata = {
  title: "Fasilitas | Teknik Informatika",
  description: "Fasilitas lengkap Program Studi Teknik Informatika UMCirebon",
}

export default function FasilitasPage() {
  const facilities = [
    {
      id: 1,
      name: "Laboratorium Komputer",
      description: "Lab dengan 40 unit komputer high-end untuk praktik pemrograman, jaringan, dan sistem operasi",
      icon: "💻",
    },
    {
      id: 2,
      name: "Lab Jaringan",
      description: "Fasilitas lengkap untuk praktik konfigurasi jaringan, routing, dan cybersecurity",
      icon: "🌐",
    },
    {
      id: 3,
      name: "Lab IoT & Embedded",
      description: "Peralatan IoT, mikrokontroler, dan sensor untuk proyek pengembangan sistem tertanam",
      icon: "⚙️",
    },
    {
      id: 4,
      name: "Server Room",
      description: "Ruang server dengan sistem cooling dan UPS untuk praktik administrasi server",
      icon: "🖥️",
    },
    {
      id: 5,
      name: "Studio Multimedia",
      description: "Fasilitas editing video, audio, dan desain grafis untuk produksi konten digital",
      icon: "🎬",
    },
    {
      id: 6,
      name: "Perpustakaan Digital",
      description: "Koleksi jurnal, e-book, dan referensi teknologi informasi terkini",
      icon: "📚",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fasilitas</h1>
          <p className="text-lg md:text-xl text-white/90">
            Fasilitas modern dan lengkap untuk mendukung pembelajaran dan penelitian
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Infrastruktur & Peralatan</h2>
            <div className="w-16 h-1 bg-accent rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility) => (
              <div
                key={facility.id}
                className="bg-white border border-border rounded-lg p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-5xl mb-4">{facility.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-2">{facility.name}</h3>
                <p className="text-muted-foreground">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Jam Operasional</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground">Senin - Jumat</p>
                  <p>07:00 - 16:30 WIB</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Sabtu</p>
                  <p>07:00 - 12:00 WIB</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Minggu & Libur</p>
                  <p>Tutup</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Peminjaman Fasilitas</h2>
              <p className="text-muted-foreground mb-4">
                Untuk peminjaman fasilitas atau jadwal penggunaan lab, silakan menghubungi staf kami:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone size={20} className="text-accent" />
                  <span>(0231) 205-205</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail size={20} className="text-accent" />
                  <span>ti@unmuhcirebon.ac.id</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
