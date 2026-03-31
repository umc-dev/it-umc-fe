import { getDosen } from "@/actions/dosen";
import { getStrukturOrganisasi } from "@/actions/strukturOrganisasi";
import DosenGroupSection from "@/components/dosen/DosenGroupSection";
import StrukturOrganisasiSection from "@/components/dosen/StrukturOrganisasiSection";
import { Dosen, DosenPosition } from "@/types/dosen";

export const metadata = {
  title: "Dosen | Teknik Informatika",
  description:
    "Dosen-dosen berpengalaman dengan keahlian di berbagai bidang Teknologi Informasi",
};

// Helper: Get active position
function getActivePosition(dosen: Dosen): DosenPosition | null {
  if (!dosen.positions || dosen.positions.length === 0) return null;
  const activePosition = dosen.positions.find((p) => !p.endDate);
  return activePosition ?? dosen.positions[0];
}

export default async function DosenPage() {
  const [response, structResponse] = await Promise.all([
    getDosen({ limit: 100 }),
    getStrukturOrganisasi(),
  ]);
  const lecturers = response.data;
  const strukturData = structResponse.data;

  // Grouping logic
  const groupedData: Record<string, Dosen[]> = {};

  // Default group name if no active position
  const defaultGroupName = "Dosen Program Studi";

  lecturers.forEach((dosen) => {
    const activePos = getActivePosition(dosen);
    let groupName = defaultGroupName;

    if (activePos) {
      if (activePos.lectureship.name.toLowerCase() === "kepala program studi") {
        // If the position is officially Kaprodi, we must ensure it's still ACTIVE (!endDate).
        // If they are no longer Kaprodi, they should fall back to standard Dosen.
        if (!activePos.endDate) {
          groupName = activePos.lectureship.name;
        }
      } else {
        // For other positions like Sekprodi, etc., just use the active name.
        if (!activePos.endDate) {
            groupName = activePos.lectureship.name;
        }
      }
    }

    if (!groupedData[groupName]) {
      groupedData[groupName] = [];
    }
    groupedData[groupName].push(dosen);
  });

  // Sort groups: "Kepala Program Studi" should be first. 
  // Others can be sorted alphabetically.
  const groupNames = Object.keys(groupedData).sort((a, b) => {
    if (a.toLowerCase() === "kepala program studi") return -1;
    if (b.toLowerCase() === "kepala program studi") return 1;
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

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Dosen</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Dosen profesional yang siap membimbing dan mendukung perjalanan
            akademik Anda di Teknik Informatika
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
          <div className="mb-12">
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