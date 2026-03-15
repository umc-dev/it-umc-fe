import { getDosen } from "@/actions/dosen";
import KaprodiGrid from "@/components/dosen/KaprodiGrid";
import { Dosen, DosenPosition } from "@/types/dosen";

export const metadata = {
  title: "Sejarah Kaprodi | Teknik Informatika",
  description:
    "Mengenal sosok-sosok yang pernah menjabat sebagai Kepala Program Studi Teknik Informatika dari masa ke masa.",
};

interface KaprodiHistoryItem {
  id: string; // unique key combination
  dosen: Dosen;
  position: DosenPosition;
}

export default async function SejarahKaprodiPage() {
  const response = await getDosen({ limit: 100 });
  const allLecturers = response.data;

  // Extract all "Kepala Program Studi" positions across all lecturers
  const historyItems: KaprodiHistoryItem[] = [];

  allLecturers.forEach((dosen) => {
    if (!dosen.positions) return;

    // Filter positions where the role is "Kepala Program Studi"
    const kaprodiPositions = dosen.positions.filter(
      (pos) => pos.lectureship?.name.toLowerCase() === "kepala program studi"
    );

    // Add each distinct period as a history item
    kaprodiPositions.forEach((pos) => {
      historyItems.push({
        id: `${dosen.id}-${pos.id}`,
        dosen,
        position: pos,
      });
    });
  });

  // Sort by startDate (Newest/Current first -> Oldest last)
  historyItems.sort((a, b) => {
    const dateA = new Date(a.position.startDate).getTime();
    const dateB = new Date(b.position.startDate).getTime();
    
    // Sort descending (latest/current first)
    return dateB - dateA;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sejarah Kaprodi</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Mengenal tokoh-tokoh inspiratif yang telah menavigasi, memimpin, dan mendedikasikan diri 
            untuk kemajuan Program Studi Teknik Informatika dari masa ke masa.
          </p>
        </div>
      </section>

      {/* History Timeline Content */}
      <section className="py-20 bg-slate-50 relative">
        <div className="container mx-auto px-4 relative z-10">
          {historyItems.length > 0 ? (
            <div className="max-w-7xl mx-auto">
              <KaprodiGrid historyItems={historyItems} />
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center py-20 bg-white rounded-2xl shadow-sm border border-border">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏳</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Belum Ada Data</h3>
              <p className="text-muted-foreground">
                Data sejarah Kepala Program Studi belum tersedia atau belum ditambahkan ke dalam sistem.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
