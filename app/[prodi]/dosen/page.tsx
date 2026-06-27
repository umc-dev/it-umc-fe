import { getDosen } from "@/actions/dosen";
import { getStrukturOrganisasi } from "@/actions/strukturOrganisasi";
import DosenGroupSection from "@/components/dosen/DosenGroupSection";
import StrukturOrganisasiSection from "@/components/dosen/StrukturOrganisasiSection";
import { Dosen, DosenPosition } from "@/types/dosen";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{ prodi: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { prodi } = await params;
  const prodiUpper = prodi.toUpperCase();
  if (prodiUpper !== "S1" && prodiUpper !== "D3") {
    return {
      title: "Halaman Tidak Ditemukan | Teknik Informatika",
    };
  }
  const prodiName = prodiUpper === "S1" ? "S1 Teknik Informatika" : "D3 Teknik Informatika";
  return {
    title: `Dosen ${prodiName} | Teknik Informatika`,
    description: `Dosen-dosen berpengalaman dengan keahlian di berbagai bidang Teknologi Informasi pada program studi ${prodiName}`,
  };
}

// Helper: Get active position
function getActivePosition(dosen: Dosen): DosenPosition | null {
  if (!dosen.positions || dosen.positions.length === 0) return null;
  const now = new Date();
  const activePosition = dosen.positions.find((p) => !p.endDate || new Date(p.endDate) >= now);
  return activePosition ?? dosen.positions[0];
}

// Helper: Determine dynamic group name based on active/newest position
function getLecturerActiveGroupName(dosen: Dosen, latestKaprodiId: string | null): string {
  if (!dosen.positions || dosen.positions.length === 0) return "Dosen Program Studi";

  // Jika dosen ini adalah Kaprodi terbaru/aktif untuk prodi ini
  if (dosen.id === latestKaprodiId) {
    return "Kepala Program Studi";
  }

  const now = new Date();
  const activePositions = dosen.positions.filter((p) => !p.endDate || new Date(p.endDate) >= now);
  const targetPositions = activePositions.length > 0 ? activePositions : dosen.positions;

  // Cek Sekretaris Program Studi
  const sekprodi = targetPositions.find((p) => p.lectureship?.name.toLowerCase().includes("sekretaris"));
  if (sekprodi) return sekprodi.lectureship?.name || "Sekretaris Program Studi";

  // Cek posisi lain selain Kaprodi (agar Kaprodi lama tidak masuk section Kaprodi)
  const nonKaprodi = targetPositions.find((p) => p.lectureship?.name.toLowerCase() !== "kepala program studi");
  if (nonKaprodi) return nonKaprodi.lectureship?.name || "Dosen Program Studi";

  return "Dosen Program Studi";
}

export default async function DosenPage({ params }: PageProps) {
  const { prodi } = await params;
  const prodiUpper = prodi.toUpperCase();

  if (prodiUpper !== "S1" && prodiUpper !== "D3") {
    notFound();
  }

  const [response, structResponse] = await Promise.all([
    getDosen({ limit: 100, prodi: prodiUpper as "S1" | "D3" }),
    getStrukturOrganisasi(),
  ]);
  const lecturers = response.data || [];
  const strukturData = structResponse.data;

  // Cari Kaprodi terbaru/aktif di prodi ini
  let latestKaprodiDosenId: string | null = null;
  let latestKaprodiTime = -1;

  lecturers.forEach((d) => {
    if (!d.positions) return;
    d.positions.forEach((p) => {
      if (p.lectureship?.name.toLowerCase() === "kepala program studi") {
        const time = new Date(p.startDate).getTime();
        if (time > latestKaprodiTime) {
          latestKaprodiTime = time;
          latestKaprodiDosenId = d.id;
        }
      }
    });
  });

  // Grouping logic
  const groupedData: Record<string, Dosen[]> = {};

  lecturers.forEach((dosen) => {
    const groupName = getLecturerActiveGroupName(dosen, latestKaprodiDosenId);
    if (!groupedData[groupName]) {
      groupedData[groupName] = [];
    }
    groupedData[groupName].push(dosen);
  });

  // Sort groups berdasarkan hierarki akademik resmi
  const HIERARCHY_ORDER: Record<string, number> = {
    "kepala program studi": 1,
    "sekretaris program studi": 2,
    "guru besar": 3,
    "lektor kepala": 4,
    "lektor": 5,
    "asisten ahli": 6,
    "dosen tetap": 7,
    "dosen program studi": 8,
  };

  const groupNames = Object.keys(groupedData).sort((a, b) => {
    const orderA = HIERARCHY_ORDER[a.toLowerCase()] ?? 99;
    const orderB = HIERARCHY_ORDER[b.toLowerCase()] ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    return a.localeCompare(b);
  });

  // Sort lecturers within each group by `startDate` (ascending, oldest first)
  groupNames.forEach((groupName) => {
    groupedData[groupName].sort((a, b) => {
      const posA = getActivePosition(a);
      const posB = getActivePosition(b);

      const dateA = posA ? new Date(posA.startDate).getTime() : 0;
      const dateB = posB ? new Date(posB.startDate).getTime() : 0;

      return dateA - dateB;
    });
  });

  const prodiName = prodiUpper === "S1" ? "S1 Teknik Informatika" : "D3 Teknik Informatika";

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Dosen {prodiName}</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Dosen profesional yang siap membimbing dan mendukung perjalanan
            akademik Anda di {prodiName}
          </p>
        </div>
      </section>

      {/* Struktur Organisasi Section */}
      {strukturData && (
        <StrukturOrganisasiSection data={strukturData} />
      )}

      {/* Lecturers Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">
                  Daftar Pengajar
                </h2>
              </div>
              <div className="w-16 h-1 bg-accent rounded-full"></div>
              <p className="text-muted-foreground mt-4 text-lg">
                Menampilkan {lecturers.length} dosen dengan berbagai bidang
                keahlian
              </p>
            </div>
            <div>
              <Link
                href={`/${prodi.toLowerCase()}/dosen/kepala-program-studi`}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-primary/20 text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm text-sm"
              >
                Sejarah Kepala Program Studi ➔
              </Link>
            </div>
          </div>

          {lecturers.length > 0 ? (
            <div className="space-y-16">
              {groupNames.map((groupName) => (
                <DosenGroupSection
                  key={groupName}
                  groupName={groupName}
                  members={groupedData[groupName]}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground italic">
                Data dosen tidak ditemukan.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
