import { Zap, Server, Microscope, Wifi } from "lucide-react"
import { SkeletonFacilityCard } from "@/components/skeletons/skeleton-facility-card"
import { SkeletonImage } from "@/components/skeletons/skeleton-image"
import { SKELETON_COUNTS } from "@/lib/skeleton-utils"

const facilities = [
  {
    icon: Microscope,
    title: "Laboratorium Komputer",
    description:
      "Ruang lab dengan 60+ workstation berteknologi tinggi untuk praktik pemrograman dan pengembangan software.",
  },
  {
    icon: Server,
    title: "Lab Server & Networking",
    description: "Infrastruktur jaringan lengkap untuk mempelajari sistem administrasi dan security networking.",
  },
  {
    icon: Zap,
    title: "Lab AI & Machine Learning",
    description: "Fasilitas dengan GPU server untuk riset kecerdasan buatan dan deep learning.",
  },
  {
    icon: Wifi,
    title: "Lab IoT & Embedded",
    description: "Peralatan modern untuk eksplorasi Internet of Things dan embedded systems development.",
  },
]

interface FacilitiesProps {
  isLoading?: boolean
}

export default function Facilities({ isLoading = false }: FacilitiesProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Fasilitas & Laboratorium</h2>
          <p className="text-muted-foreground text-lg">
            Dilengkapi dengan fasilitas laboratorium terkini untuk mendukung pembelajaran praktis mahasiswa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {isLoading
            ? Array.from({ length: SKELETON_COUNTS.FACILITIES }).map((_, i) => <SkeletonFacilityCard key={i} />)
            : facilities.map((facility, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl border border-border hover:shadow-lg transition-shadow"
                >
                  <facility.icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{facility.title}</h3>
                  <p className="text-muted-foreground">{facility.description}</p>
                </div>
              ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonImage key={i} height="h-64" />)
            : [
                { image: "/modern-computer-lab-with-monitors.webp", alt: "Lab Komputer" },
                { image: "/server-room-with-networking-equipment.webp", alt: "Lab Server" },
                { image: "/students-working-on-technology-projects.webp", alt: "Praktik Mahasiswa" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="h-64 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}
