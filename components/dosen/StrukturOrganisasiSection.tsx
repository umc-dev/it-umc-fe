import ImageModal from "@/components/ImageModal";
import { StrukturOrganisasi } from "@/types/strukturOrganisasi";

interface StrukturOrganisasiSectionProps {
  data: StrukturOrganisasi;
}

export default function StrukturOrganisasiSection({ data }: StrukturOrganisasiSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Struktur Organisasi
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mx-auto md:mx-0"></div>
          <p className="text-muted-foreground mt-4 text-lg">
            Bagan struktur organisasi program studi Teknik Informatika
          </p>
        </div>

        <div className="flex flex-col gap-8 md:gap-12">
          {/* Gambar Struktur */}
          <div className="bg-slate-50 p-2 sm:p-6 rounded-2xl border border-slate-100 shadow-sm w-full">
            <ImageModal
               src={data.image}
               alt="Struktur Organisasi Teknik Informatika"
               unoptimized
               wrapperClassName="relative w-full aspect-video md:aspect-16/7 lg:aspect-21/9 rounded-lg overflow-hidden flex items-center justify-center bg-white border border-slate-100 p-2"
               imageClassName="object-contain"
            />
          </div>

          {/* Keterangan */}
          <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:text-primary prose-a:text-accent sm:text-left text-justify prose-p:leading-relaxed prose-img:rounded-xl">
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          </div>
        </div>
      </div>
    </section>
  );
}
