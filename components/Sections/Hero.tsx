import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative bg-linear-to-br from-primary via-primary/90 to-primary/80 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="mb-8 fade-in-up">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium">Program Studi</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Teknik Informatika</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Bergabunglah dengan program studi terdepan dalam pengembangan teknologi informasi di Indonesia
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/daftar"
              className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/berita"
              className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/30 hover:bg-white/30 transition-colors"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold">50+</p>
              <p className="text-sm opacity-80">Dosen Berpengalaman</p>
            </div>
            <div>
              <p className="text-3xl font-bold">2000+</p>
              <p className="text-sm opacity-80">Alumni Sukses</p>
            </div>
            <div>
              <p className="text-3xl font-bold">15+</p>
              <p className="text-sm opacity-80">Laboratorium Modern</p>
            </div>
          </div>
        </div>
      </div>

      <svg className="w-full h-24 text-background -mb-1" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,30 Q300,0 600,30 T1200,30 L1200,120 L0,120 Z" fill="currentColor"></path>
      </svg>
    </section>
  )
}
