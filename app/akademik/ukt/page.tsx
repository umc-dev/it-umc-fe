import { uktData } from "@/lib/akademik-data";

export const metadata = {
  title: "UKT | Teknik Informatika",
  description: "Informasi Uang Kuliah Tunggal (UKT) Program Studi Teknik Informatika",
}

export default function UKTPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">UKT (Uang Kuliah Tunggal)</h1>
          <p className="text-lg md:text-xl text-white/90">
            Informasi nominal Uang Kuliah Tunggal untuk setiap program studi
          </p>
        </div>
      </section>

      {/* UKT Table Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Header */}
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-semibold">Fakultas</th>
                    <th className="px-6 py-4 text-left font-semibold">Program Studi</th>
                    <th className="px-6 py-4 text-right font-semibold">Nominal (Rp)</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody className="divide-y divide-border">
                  {uktData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-foreground font-medium">{item.fakultas}</td>
                      <td className="px-6 py-4 text-foreground">{item.programStudi}</td>
                      <td className="px-6 py-4 text-right font-semibold text-primary">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(item.nominal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Info Box */}
            <div className="bg-muted/50 border-t border-border p-6">
              <p className="text-muted-foreground text-sm">
                <span className="font-semibold text-foreground">Catatan:</span> Informasi UKT di atas adalah nominal per
                semester untuk tahun akademik 2024/2025. Untuk informasi lebih lanjut, silakan hubungi Bagian
                Administrasi Akademik.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
