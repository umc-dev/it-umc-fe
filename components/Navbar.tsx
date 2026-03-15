"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

// Tipe data untuk struktur menu
interface NavChild {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href: string | null;
  children?: NavChild[];
}

// --- KONFIGURASI MENU DI SINI ---
const NAV_ITEMS: NavItem[] = [
  {
    label: "Beranda",
    href: "/",
  },
  {
    label: "Berita",
    href: "/berita",
  },
  {
    label: "Akademik",
    href: null,
    children: [
      {
        label: "Program Studi",
        href: "/akademik/program-studi",
        description: "S1 Teknik Informatika",
      },
      {
        label: "UKT",
        href: "/akademik/ukt",
        description: "Biaya Pendidikan",
      },
      {
        label: "Prospek Karir",
        href: "/akademik/prospek-karir",
        description: "Peluang Karir Lulusan",
      },
      {
        label: "Prestasi Mahasiswa",
        href: "/prestasi",
        description: "Pencapaian Mahasiswa",
      },
    ],
  },
  {
    label: "Dosen",
    href: null,
    children: [
      {
        label: "Daftar Dosen",
        href: "/dosen",
        description: "Staff Pengajar Teknik Informatika",
      },
      {
        label: "Sejarah Kaprodi",
        href: "/dosen/kepala-program-studi",
        description: "Sejarah Kepala Program Studi",
      },
    ],
  },
  {
    label: "Alumni",
    href: "/alumni",
  },
  {
    label: "Fasilitas",
    href: "/fasilitas",
  },
  {
    label: "Pendaftaran",
    href: "https://pmb.umc.ac.id",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Fungsi untuk cek apakah link aktif
  const isActive = (href: string | null): boolean => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Fungsi untuk cek apakah dropdown punya child yang aktif
  const hasActiveChild = (children?: NavChild[]): boolean => {
    if (!children) return false;
    return children.some((child) => isActive(child.href));
  };

  const toggleSubmenu = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* --- LOGO --- */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
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
              <h1 className="font-bold text-primary text-sm sm:text-base">Teknik Informatika</h1>
              <p className="text-xs text-muted-foreground md:hidden lg:block">
                Universitas Muhammadiyah Cirebon
              </p>
            </div>
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <div
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 font-medium
                        ${
                          hasActiveChild(item.children) || activeDropdown === item.label
                            ? "text-accent underline underline-offset-8 decoration-accent decoration-2"
                            : "text-foreground hover:text-accent hover:underline hover:underline-offset-8 hover:decoration-accent/60"
                        }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 pt-2 w-64 z-50">
                        <div className="bg-white border border-border/70 rounded-xl shadow-xl py-2 ring-1 ring-black/5">
                          {item.children.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`group flex items-center gap-3 px-4 py-3 transition-all duration-200 rounded-lg mx-1.5
                                ${
                                  isActive(subItem.href)
                                    ? "bg-accent/10 text-accent font-semibold"
                                    : "text-foreground hover:bg-accent/5 hover:text-accent"
                                }`}
                            >
                              <div>
                                <div className="font-medium">{subItem.label}</div>
                                {subItem.description && (
                                  <div className="text-xs text-muted-foreground group-hover:text-accent/80">
                                    {subItem.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-200
                      ${
                        isActive(item.href)
                          ? "text-accent underline underline-offset-8 decoration-accent decoration-2 font-semibold"
                          : "text-foreground hover:text-accent hover:underline hover:underline-offset-8 hover:decoration-accent/60"
                      }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* --- MOBILE MENU --- */}
        {isOpen && (
          <div className="md:hidden border-t border-border mt-1">
            <div className="py-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div className="space-y-1">
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        className={`w-full text-left px-5 py-3.5 rounded-xl transition-all flex items-center justify-between font-medium
                          ${
                            hasActiveChild(item.children) || activeDropdown === item.label
                              ? "bg-accent/10 text-accent"
                              : "text-foreground hover:bg-accent/5"
                          }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {activeDropdown === item.label && (
                        <div className="bg-muted/40 rounded-xl mx-3 mb-2 overflow-hidden">
                          {item.children.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={closeMobileMenu}
                              className={`flex items-center gap-3 px-6 py-3 border-b border-border/50 last:border-b-0 transition-colors
                                ${
                                  isActive(subItem.href)
                                    ? "bg-accent text-white font-medium"
                                    : "text-foreground hover:bg-white/60 hover:text-accent"
                                }`}
                            >
                              <div>
                                <div className="font-medium">{subItem.label}</div>
                                {subItem.description && (
                                  <div
                                    className={`text-xs mt-0.5 ${
                                      isActive(subItem.href) ? "text-white/80" : "text-muted-foreground"
                                    }`}
                                  >
                                    {subItem.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onClick={closeMobileMenu}
                      className={`block px-5 py-3.5 rounded-xl font-medium transition-all
                        ${
                          item.label === "Pendaftaran"
                            ? isActive(item.href)
                              ? "bg-accent text-white"
                              : "bg-accent/5 text-accent hover:bg-accent/15"
                            : isActive(item.href)
                            ? "bg-accent text-white font-semibold"
                            : "text-foreground hover:bg-accent/5"
                        }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}