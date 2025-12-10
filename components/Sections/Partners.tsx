const partners = [
  "GoTo",
  "Traveloka",
  "Bukalapak",
  "Tokopedia",
  "Shopee",
  "Blibli",
  "Tiket.com",
];

export default function Partners() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase pb-12">
          Partner & Mitra Kami
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradients untuk efek memudar di kiri kanan */}
        <div className="absolute top-0 left-0 z-10 w-20 h-full bg-linear-to-r from-gray-50 to-transparent"></div>
        <div className="absolute top-0 right-0 z-10 w-20 h-full bg-linear-to-l from-gray-50 to-transparent"></div>

        {/* Container Animasi */}
        <div className="flex animate-scroll w-[200%]">
          {/* Kita render list logo 2 kali agar loopingnya mulus */}
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-[150px] mx-6"
            >
              {/* Ganti div ini dengan <img /> logo kamu */}
              <span className="text-xl font-bold text-gray-400 font-sans">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
