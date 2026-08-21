import { getAccreditations } from "@/actions/accreditation";
import { FileText, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Akreditasi | Teknik Informatika UMC",
  description: "Informasi resmi akreditasi Program Studi dan Perguruan Tinggi Universitas Muhammadiyah Cirebon.",
};

export const revalidate = 60;

type Props = {
  searchParams: Promise<{
    category?: string;
    prodi?: string;
  }>;
};

export default async function AkreditasiPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = params?.category?.toUpperCase();
  const prodi = params?.prodi?.toUpperCase();

  const response = await getAccreditations({ category, prodi });
  const accreditations = response.data || [];

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Akreditasi</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Informasi resmi akreditasi Program Studi dan Perguruan Tinggi Universitas Muhammadiyah Cirebon
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Header & Filter Tabs */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Daftar Akreditasi</h2>
              <div className="w-20 h-1.5 bg-accent rounded-full mb-4"></div>
              <p className="text-muted-foreground text-base max-w-xl">
                Sertifikat dan Surat Keputusan (SK) Akreditasi Kampus dan Program Studi Teknik Informatika.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex bg-muted p-1.5 rounded-2xl border border-border self-start md:self-end">
              <Link
                href="/akreditasi"
                className={`px-5 py-2 text-sm font-semibold rounded-xl transition-all ${
                  !category
                    ? "bg-background text-primary shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Semua
              </Link>
              <Link
                href="/akreditasi?category=kampus"
                className={`px-5 py-2 text-sm font-semibold rounded-xl transition-all ${
                  category === "KAMPUS"
                    ? "bg-background text-primary shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Kampus
              </Link>
              <Link
                href="/akreditasi?category=prodi"
                className={`px-5 py-2 text-sm font-semibold rounded-xl transition-all ${
                  category === "PRODI"
                    ? "bg-background text-primary shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Prodi
              </Link>
            </div>
          </div>

          {/* Accreditation List Cards */}
          {accreditations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {accreditations.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Badge Category & Grade */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                        {item.category} {item.prodi ? `(${item.prodi})` : ""}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-muted text-foreground border border-border">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        {item.grade}
                      </span>
                    </div>

                    {/* Title & Institution */}
                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    {item.institution && (
                      <p className="text-sm text-primary font-medium mb-4">
                        Lembaga: {item.institution}
                      </p>
                    )}

                    {/* SK Number & Validity */}
                    <div className="space-y-2 py-3 my-3 border-y border-border/60 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nomor SK:</span>
                        <span className="font-semibold text-foreground truncate max-w-[200px]" title={item.skNumber}>
                          {item.skNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Masa Berlaku:</span>
                        <span className="font-medium text-foreground">
                          {formatDate(item.validFrom)} - {formatDate(item.validUntil)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions / Download Buttons */}
                  <div className="flex items-center gap-3 pt-4">
                    {item.certificateFile && (
                      <a
                        href={item.certificateFile}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition"
                      >
                        <FileText className="w-4 h-4" />
                        Sertifikat (PDF)
                      </a>
                    )}
                    {item.skLink && (
                      <a
                        href={item.skLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center p-2.5 rounded-xl border border-border hover:bg-muted text-foreground transition"
                        title="Buka Link SK Resmi"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-muted/30 rounded-3xl border border-dashed border-border">
              <ShieldCheck className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Belum ada data akreditasi</h3>
              <p className="text-muted-foreground max-w-md">
                Data akreditasi belum dipublikasikan atau sesuai dengan filter pilihan Anda.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
