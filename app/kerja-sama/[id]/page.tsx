import { notFound } from "next/navigation";
import Link from "next/link";
import { getPartnershipById } from "@/actions/partnerships";
import {
  ArrowLeft,
  CalendarDays,
  FileText,
  ExternalLink,
  Building2,
  Eye,
  CheckCircle2,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partnership = await getPartnershipById(id);

  if (!partnership) {
    return {
      title: "Kerja Sama Tidak Ditemukan | Teknik Informatika UMC",
    };
  }

  return {
    title: `${partnership.name} - Detail Kerja Sama | Teknik Informatika UMC`,
    description: partnership.description,
  };
}

function formatDateIndo(dateStr: string) {
  if (!dateStr) return "-";
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export default async function PartnershipDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const partnership = await getPartnershipById(id);

  if (!partnership) {
    notFound();
  }

  const logoFile = partnership.files?.find(
    (f) =>
      f.fileType?.startsWith("image/") ||
      /\.(jpg|jpeg|png|webp|svg|gif)$/i.test(f.fileUrl)
  );

  const filesList = partnership.files || [];

  const startDateFormatted = formatDateIndo(partnership.startDate);
  const endDateFormatted = formatDateIndo(partnership.endDate);

  // Check active status
  const now = new Date();
  const endDate = new Date(partnership.endDate);
  const isActive = endDate >= now;

  return (
    <>
      {/* Top Banner */}
      <section className="bg-primary text-white py-14">
        <div className="container mx-auto px-4">
          <Link
            href="/kerja-sama"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar Kerja Sama
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
            {/* Logo Mitra */}
            <div className="w-24 h-24 bg-white rounded-xl p-3 border border-white/30 flex items-center justify-center shrink-0 shadow-lg">
              {logoFile ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoFile.fileUrl}
                  alt={`Logo ${partnership.name}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Building2 className="w-10 h-10 text-slate-400" />
              )}
            </div>

            {/* Info Title */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {partnership.name}
                </h1>

                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isActive ? "Kerja Sama Aktif" : "Selesai"}
                </span>
              </div>

              <div className="flex items-center text-white/80 text-sm gap-2">
                <CalendarDays className="w-4 h-4 text-accent" />
                <span>
                  Periode: {startDateFormatted} – {endDateFormatted}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-5xl space-y-8">
          {/* Deskripsi Kerja Sama */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-accent rounded-full inline-block" />
              Deskripsi Kerja Sama
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed whitespace-pre-line">
              {partnership.description || "Tidak ada deskripsi rinci yang dicantumkan."}
            </p>
          </div>

          {/* Rincian Periode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-xs flex items-center gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                <CalendarDays className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">
                  Tanggal Mulai
                </p>
                <p className="text-base font-bold text-foreground mt-0.5">
                  {startDateFormatted}
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-xs flex items-center gap-4">
              <div className="p-3 bg-accent/10 text-accent rounded-xl shrink-0">
                <CalendarDays className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">
                  Tanggal Berakhir
                </p>
                <p className="text-base font-bold text-foreground mt-0.5">
                  {endDateFormatted}
                </p>
              </div>
            </div>
          </div>

          {/* Bukti & Berkas Kerja Sama */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Bukti & Berkas Kerja Sama ({filesList.length})
              </h2>
            </div>

            {filesList.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
                <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-sm font-medium">Belum ada berkas terlampir untuk kerja sama ini.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filesList.map((file) => {
                  const isImage =
                    file.fileType?.startsWith("image/") ||
                    /\.(jpg|jpeg|png|webp|svg|gif)$/i.test(file.fileUrl);

                  return (
                    <div
                      key={file.id}
                      className="border border-border rounded-xl p-4 bg-card hover:border-primary/50 transition-all duration-200 flex flex-col justify-between gap-4 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-primary/10 text-primary rounded-lg shrink-0 mt-0.5">
                          {isImage ? (
                            <Eye className="w-5 h-5" />
                          ) : (
                            <FileText className="w-5 h-5" />
                          )}
                        </div>

                        <div className="overflow-hidden">
                          <p className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors" title={file.fileName}>
                            {file.fileName}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {file.fileType || (isImage ? "Gambar Bukti" : "Dokumen Bukti")}
                          </p>
                        </div>
                      </div>

                      {/* Image Preview if applicable */}
                      {isImage && (
                        <div className="w-full h-40 bg-muted/40 rounded-lg overflow-hidden border border-border relative flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={file.fileUrl}
                            alt={file.fileName}
                            className="max-h-full max-w-full object-contain p-2"
                          />
                        </div>
                      )}

                      {/* Action Button */}
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-primary text-white hover:bg-primary/90 rounded-lg text-xs font-semibold transition-colors"
                      >
                        {isImage ? "Lihat Gambar Bukti" : "Buka / Unduh Dokumen"}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
