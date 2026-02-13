import Image from "next/image";
import type { Partnership } from "@/types/partnership";
import { Handshake } from "lucide-react";

interface PartnersProps {
  partnerships?: Partnership[];
}

// Minimal item supaya marquee selalu kelihatan penuh
const MIN_ITEMS = 12;

// Fallback statis kalau API tidak keambil
const STATIC_PARTNERS: Partnership[] = [
  {
    id: "static-1",
    name: "Google",
    photo: null,
    startDate: "",
    endDate: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "static-2",
    name: "Microsoft",
    photo: null,
    startDate: "",
    endDate: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "static-3",
    name: "AWS",
    photo: null,
    startDate: "",
    endDate: "",
    createdAt: "",
    updatedAt: "",
  },
];

export default function Partners({ partnerships = [] }: PartnersProps) {
  // Pakai data statis kalau API kosong / gagal
  const safePartners =
    partnerships.length > 0 ? partnerships : STATIC_PARTNERS;

  // Kalau bahkan fallback pun kosong
  if (safePartners.length === 0) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Handshake className="mx-auto mb-4 text-gray-400" size={40} />
          <p className="text-sm text-gray-500">
            Belum ada mitra kerja sama yang terdaftar
          </p>
        </div>
      </section>
    );
  }

  // Gandakan data kalau jumlahnya sedikit
  const filledPartners: Partnership[] = [];
  while (filledPartners.length < MIN_ITEMS) {
    filledPartners.push(...safePartners);
  }

  // Potong biar konsisten
  const normalizedPartners = filledPartners.slice(0, MIN_ITEMS);

  // Duplikasi untuk looping marquee
  const marqueePartners = [
    ...normalizedPartners,
    ...normalizedPartners,
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase pb-12">
          Partner & Mitra Kami
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* efek fade kiri kanan */}
        <div className="pointer-events-none absolute top-0 left-0 z-10 w-24 h-full bg-linear-to-r from-gray-50 to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 z-10 w-24 h-full bg-linear-to-l from-gray-50 to-transparent" />

        {/* track marquee */}
        <div className="flex animate-scroll w-max">
          {marqueePartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="group relative flex items-center justify-center min-w-45 px-6"
            >
              {/* Tooltip */}
              <div className="pointer-events-none absolute -top-8 opacity-0 group-hover:opacity-100 transition">
                <div className="px-2 py-1 text-xs text-white bg-black rounded whitespace-nowrap">
                  {partner.name}
                </div>
              </div>

              {partner.photo ? (
                <Image
                  src={partner.photo}
                  alt={partner.name}
                  title={partner.name}
                  width={140}
                  height={70}
                  unoptimized
                  className="object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition"
                />
              ) : (
                <span
                  title={partner.name}
                  className="text-sm font-semibold text-gray-400 whitespace-nowrap"
                >
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
