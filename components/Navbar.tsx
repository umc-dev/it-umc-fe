"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

// --- KONFIGURASI MENU DI SINI ---
const NAV_ITEMS = [
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
    href: null, // null berarti ini adalah dropdown
    children: [
      {
        label: "Program Studi",
        href: "/akademik/program-studi",
        description: "S1 & D3 Teknik Informatika",
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
    ],
  },
  {
    label: "Dosen",
    href: "/dosen",
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
  const [isOpen, setIsOpen] = useState(false);

  // State untuk melacak dropdown mana yang sedang aktif (Desktop & Mobile)
  // Menyimpan label menu, misal: "Akademik"
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Fungsi untuk toggle submenu di mobile
  const toggleSubmenu = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null); // Tutup jika sudah terbuka
    } else {
      setActiveDropdown(label); // Buka yang diklik
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border shadow-sm bg-white backdrop-blur-md">
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
              <h1 className="font-bold text-primary">Teknik Informatika</h1>
              <p className="text-xs text-muted-foreground md:hidden lg:block">
                Universitas Muhammadiyah Cirebon
              </p>
            </div>
          </Link>

          {/* --- DESKTOP MENU (MAPPING DATA) --- */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item, index) => (
              <div key={index}>
                {/* Cek apakah item ini punya children (Dropdown) atau Link biasa */}
                {item.children ? (
                  // LOGIKA DROPDOWN
                  <div
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center gap-2 px-3 py-2 text-foreground hover:text-accent transition-colors rounded-lg hover:bg-accent/5">
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Submenu Dropdown */}
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 pt-2 w-56 z-50">
                        <div className="bg-white border border-border rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                          {item.children.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className="block px-4 py-3 text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200 rounded-lg mx-2"
                            >
                              <div className="font-medium">{subItem.label}</div>
                              {subItem.description && (
                                <div className="text-xs text-muted-foreground">
                                  {subItem.description}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // LOGIKA LINK BIASA
                  <Link
                    href={item.href || "#"}
                    className="text-foreground hover:text-accent transition-colors"
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
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* --- MOBILE MENU CONTENT (MAPPING DATA) --- */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {NAV_ITEMS.map((item, index) => (
              <div key={index}>
                {item.children ? (
                  // Mobile Dropdown (Accordion)
                  <div className="space-y-1">
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="w-full text-left px-4 py-2 text-foreground hover:bg-accent/10 rounded-lg transition-colors flex items-center justify-between"
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {/* Tampilkan anak menu jika state active sesuai */}
                    {activeDropdown === item.label && (
                      <div className="pl-4 space-y-1">
                        {item.children.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block px-4 py-2 text-foreground hover:bg-accent/10 rounded-lg transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Mobile Link Biasa
                  <Link
                    href={item.href || "#"}
                    className="block px-4 py-2 text-foreground hover:bg-accent/10 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
