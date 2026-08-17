"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// Tipe data untuk struktur menu navbar
interface NavSubItem {
  label: string;
  href: string;
  description?: string;
  isExternal?: boolean;
}

interface NavCategory {
  title: string;
  items: NavSubItem[];
}

interface NavItem {
  label: string;
  href: string | null;
  categories?: NavCategory[];
  singleList?: NavSubItem[];
}

// --- PENGELOMPOKAN NAVIGASI STANDAR WEB PRODI KAMPUS ---
const NAV_ITEMS: NavItem[] = [
  {
    label: "Beranda",
    href: "/",
  },
  {
    label: "Profil",
    href: null,
    singleList: [
      { label: "Profil S1 Teknik Informatika", href: "/s1", description: "Visi, misi, dan profil prodi S1" },
      { label: "Profil D3 Teknik Informatika", href: "/d3", description: "Visi, misi, dan profil prodi D3" },
      { label: "Dosen & Staf S1", href: "/s1/dosen", description: "Daftar pengajar prodi S1" },
      { label: "Dosen & Staf D3", href: "/d3/dosen", description: "Daftar pengajar prodi D3" },
      { label: "Pimpinan Prodi S1", href: "/s1/dosen/kepala-program-studi", description: "Ketua & pimpinan prodi S1" },
      { label: "Pimpinan Prodi D3", href: "/d3/dosen/kepala-program-studi", description: "Ketua & pimpinan prodi D3" },
    ],
  },
  {
    label: "Akademik",
    href: null,
    singleList: [
      { label: "Kurikulum S1", href: "/s1/akademik/distribusi-mata-kuliah", description: "Distribusi mata kuliah prodi S1" },
      { label: "Kurikulum D3", href: "/d3/akademik/distribusi-mata-kuliah", description: "Distribusi mata kuliah prodi D3" },
      { label: "Prospek Karir", href: "/akademik/prospek-karir", description: "Peluang kerja lulusan IT" },
      { label: "Biaya Kuliah", href: "https://pmb.umc.ac.id/assets/pdf/biayakuliah2627.pdf", description: "Rincian biaya pendidikan", isExternal: true },
      { label: "Akreditasi", href: "/akreditasi", description: "Status & sertifikat akreditasi" },
    ],
  },
  {
    label: "Kemahasiswaan & Alumni",
    href: null,
    singleList: [
      { label: "Prestasi Mahasiswa S1", href: "/s1/prestasi", description: "Capaian prestasi prodi S1" },
      { label: "Prestasi Mahasiswa D3", href: "/d3/prestasi", description: "Capaian prestasi prodi D3" },
      { label: "Portal Alumni", href: "/alumni", description: "Jejak & testimoni alumni" },
    ],
  },
  {
    label: "Informasi & Fasilitas",
    href: null,
    singleList: [
      { label: "Berita & Pengumuman", href: "/berita", description: "Kabar terbaru seputar prodi & kampus" },
      { label: "Informasi PMB & Promosi", href: "/promosi", description: "Penerimaan mahasiswa baru" },
      { label: "Fasilitas Kampus", href: "/fasilitas", description: "Laboratorium & sarana pembelajaran" },
      { label: "Kerja Sama & Mitra", href: "/kerja-sama", description: "Kemitraan industri & instansi" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const isActive = (href: string | null): boolean => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    if (href === "/s1" || href === "/d3") return pathname === href;
    return pathname.startsWith(href);
  };

  const isCategoryActive = (item: NavItem): boolean => {
    if (item.href && isActive(item.href)) return true;
    if (item.categories) {
      return item.categories.some((cat) =>
        cat.items.some((sub) => isActive(sub.href))
      );
    }
    if (item.singleList) {
      return item.singleList.some((sub) => isActive(sub.href));
    }
    return false;
  };

  const toggleSubmenu = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur-md shadow-xs transition-all">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-18">
          {/* --- LOGO BRANDING KAMPUS --- */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src="/logo.svg"
                alt="Logo Teknik Informatika UMC"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <h1 className="font-bold text-primary text-base sm:text-lg tracking-tight group-hover:text-primary/90">
                Teknik Informatika
              </h1>
              <p className="text-xs text-muted-foreground font-medium hidden sm:block">
                Universitas Muhammadiyah Cirebon
              </p>
            </div>
          </Link>

          {/* --- DESKTOP NAVIGATION (BERSIH, FORMAL & MUDAH DIBACA) --- */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const active = isCategoryActive(item);
              const isHovered = activeDropdown === item.label;

              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:text-primary hover:bg-muted/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      active || isHovered
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:text-primary hover:bg-muted/60"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-300 ${
                        isHovered ? "rotate-180 text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </button>

                  {/* Single Column Dropdown untuk Kategori */}
                  {isHovered && item.singleList && (
                    <div className="absolute top-full left-0 pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="bg-white border border-border/80 rounded-2xl shadow-2xl p-2 space-y-1 ring-1 ring-black/5">
                        {item.singleList.map((sub) => {
                          const subActive = isActive(sub.href);
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              target={sub.isExternal ? "_blank" : undefined}
                              rel={sub.isExternal ? "noopener noreferrer" : undefined}
                              className={`block p-2.5 rounded-xl transition-all ${
                                subActive
                                  ? "bg-primary/10 text-primary font-semibold"
                                  : "hover:bg-muted/60 text-foreground hover:text-primary"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs font-semibold">{sub.label}</span>
                                {sub.isExternal && <ExternalLink size={12} className="text-muted-foreground shrink-0" />}
                              </div>
                              {sub.description && (
                                <div className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5 font-normal">
                                  {sub.description}
                                </div>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* --- RIGHT ACTION BUTTONS --- */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <Link
              href="https://pmb.umc.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex px-4 py-2 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 shadow-md hover:shadow-lg transition-all text-xs sm:text-sm"
            >
              Pendaftaran PMB
            </Link>

            {/* --- MOBILE TOGGLE BUTTON --- */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground hover:bg-muted rounded-xl transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* --- MOBILE & TABLET DRAWER MENU --- */}
        {isOpen && (
          <div className="lg:hidden border-t border-border mt-1 bg-white">
            <div className="py-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto px-2">
              {NAV_ITEMS.map((item) => {
                if (item.href) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`block px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                        isActive(item.href)
                          ? "bg-primary text-white"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                }

                const isOpenSub = activeDropdown === item.label;

                return (
                  <div key={item.label} className="space-y-1">
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                        isOpenSub ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${
                          isOpenSub ? "rotate-180 text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </button>

                    {isOpenSub && (
                      <div className="pl-3 pr-1 py-1 space-y-2 border-l-2 border-primary/20 ml-4 my-1">
                        {item.singleList &&
                          item.singleList.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              target={sub.isExternal ? "_blank" : undefined}
                              rel={sub.isExternal ? "noopener noreferrer" : undefined}
                              onClick={closeMobileMenu}
                              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                isActive(sub.href)
                                  ? "bg-primary text-white font-bold"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                              }`}
                            >
                              <span>{sub.label}</span>
                              {sub.isExternal && <ExternalLink size={12} className="opacity-70" />}
                            </Link>
                          ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-border mt-4 px-2 space-y-3">
                <Link
                  href="https://pmb.umc.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="block text-center w-full py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-md"
                >
                  Pendaftaran PMB Sekarang
                </Link>
                <div className="flex items-center justify-between px-2 pt-2">
                  <span className="text-xs text-muted-foreground font-semibold">Pilih Bahasa:</span>
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
