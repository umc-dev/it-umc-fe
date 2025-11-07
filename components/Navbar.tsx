"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAkademikOpen, setIsAkademikOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50border-b border-border shadow-sm bg-white/50 backdrop-blur-md z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
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
              <p className="text-xs text-muted-foreground">
                Universitas Muhammadiyah Cirebon
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-foreground hover:text-accent transition-colors"
            >
              Beranda
            </Link>
            <Link
              href="/berita"
              className="text-foreground hover:text-accent transition-colors"
            >
              Berita
            </Link>
            <div
              className="relative group"
              onMouseEnter={() => setIsAkademikOpen(true)}
              onMouseLeave={() => setIsAkademikOpen(false)}
            >
              <button className="flex items-center gap-2 px-3 py-2 text-foreground hover:text-accent transition-colors rounded-lg hover:bg-accent/5">
                Akademik
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isAkademikOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isAkademikOpen && (
                <div className="absolute top-full left-0 pt-2 w-56 z-50">
                  <div className="bg-white/50 backdrop-blur-md border border-border rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                      href="/akademik/program"
                      className="block px-4 py-3 text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200 rounded-lg mx-2"
                    >
                      <div className="font-medium">Program Studi</div>
                      <div className="text-xs text-muted-foreground">
                        S1 & D3 Teknik Informatika
                      </div>
                    </Link>
                    <Link
                      href="/akademik/ukt"
                      className="block px-4 py-3 text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200 rounded-lg mx-2"
                    >
                      <div className="font-medium">UKT</div>
                      <div className="text-xs text-muted-foreground">
                        Biaya Pendidikan
                      </div>
                    </Link>
                    <Link
                      href="/akademik/career-path"
                      className="block px-4 py-3 text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200 rounded-lg mx-2"
                    >
                      <div className="font-medium">Prospek Karir</div>
                      <div className="text-xs text-muted-foreground">
                        Peluang Karir Lulusan
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/dosen"
              className="text-foreground hover:text-accent transition-colors"
            >
              Dosen & Staf
            </Link>
            <Link
              href="/fasilitas"
              className="text-foreground hover:text-accent transition-colors"
            >
              Fasilitas
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 text-foreground hover:bg-accent/10 rounded-lg transition-colors"
            >
              Beranda
            </Link>
            <Link
              href="/berita"
              className="block px-4 py-2 text-foreground hover:bg-accent/10 rounded-lg transition-colors"
            >
              Berita
            </Link>
            {/* Akademik Submenu for Mobile */}
            <div className="space-y-1">
              <button
                onClick={() => setIsAkademikOpen(!isAkademikOpen)}
                className="w-full text-left px-4 py-2 text-foreground hover:bg-accent/10 rounded-lg transition-colors flex items-center justify-between"
              >
                Akademik
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isAkademikOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isAkademikOpen && (
                <div className="pl-4 space-y-1">
                  <Link
                    href="/akademik/program"
                    className="block px-4 py-2 text-foreground hover:bg-accent/10 rounded-lg transition-colors"
                  >
                    Program Studi
                  </Link>
                  <Link
                    href="/akademik/ukt"
                    className="block px-4 py-2 text-foreground hover:bg-accent/10 rounded-lg transition-colors"
                  >
                    UKT
                  </Link>
                  <Link
                    href="/akademik/career-path"
                    className="block px-4 py-2 text-foreground hover:bg-accent/10 rounded-lg transition-colors"
                  >
                    Prospek Karir
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/dosen"
              className="block px-4 py-2 text-foreground hover:bg-accent/10 rounded-lg transition-colors"
            >
              Dosen & Staf
            </Link>
            <Link
              href="/fasilitas"
              className="block px-4 py-2 text-foreground hover:bg-accent/10 rounded-lg transition-colors"
            >
              Fasilitas
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
