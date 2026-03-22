import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import { getFacilities } from "@/actions/facilities";
import Pagination from "@/components/Pagination";

export const metadata = {
  title: "Fasilitas | Teknik Informatika",
  description: "Fasilitas lengkap Program Studi Teknik Informatika UMCirebon",
};

type Props = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};

export default async function FasilitasPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);
  const limit = Number(params?.limit ?? 9);

  const { data: facilities, meta } = await getFacilities({ limit, page });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fasilitas</h1>
          <p className="text-lg md:text-xl text-white/90">
            Fasilitas modern dan lengkap untuk mendukung pembelajaran dan
            penelitian
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
              Fasilitas Jurusan
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mb-4"></div>
            <p className="text-muted-foreground text-lg max-w-xl">
              Menampilkan fasilitas yang tersedia di Program Studi Teknik
              Informatika Universitas Muhammadiyah Cirebon
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.length > 0 ? (
              facilities.map((facility) => (
                <div
                  key={facility.id}
                  className="group bg-white border border-border/50 shadow-sm rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1"
                >
                  {/* Image Container with Hover Zoom */}
                  <div className="relative w-full aspect-4/3 overflow-hidden bg-muted">
                    <Image
                      src={facility.photo}
                      alt={facility.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <p className="text-white/95 text-sm md:text-base leading-relaxed wrap-break-word whitespace-normal line-clamp-5 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                        {facility.description}
                      </p>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 justify-center items-center text-center flex flex-col grow bg-linear-to-b from-white to-slate-50/50">
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                      {facility.name}
                    </h3>
                    <div className="w-12 h-1 bg-accent/20 rounded-full group-hover:w-16 group-hover:bg-accent transition-all duration-500 ease-out"></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center col-span-full">
                Data fasilitas belum tersedia.
              </p>
            )}
          </div>
          
          <Pagination meta={meta} />
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Jam Operasional
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground">Senin - Jumat</p>
                  <p>07:00 - 16:00 WIB</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Sabtu</p>
                  <p>07:00 - 12:00 WIB</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    Minggu & Libur
                  </p>
                  <p>Tutup</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Peminjaman Fasilitas
              </h2>
              <p className="text-muted-foreground mb-4">
                Untuk peminjaman fasilitas atau jadwal penggunaan lab, silakan
                menghubungi staf kami:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone size={20} className="text-accent" />
                  <span>(0231) 209608, 209617</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail size={20} className="text-accent" />
                  <span>teknikinformatika@umc.ac.id</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
