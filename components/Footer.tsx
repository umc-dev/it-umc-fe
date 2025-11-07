import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <Image
                  src="/logo.svg"
                  alt="Logo UMC"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>
              <h3 className="font-bold">Teknik Informatika</h3>
            </div>
            <p className="text-sm opacity-80">
              Program Studi Teknik Informatika Universitas Muhammadiyah Cirebon
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/berita"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Berita
                </Link>
              </li>
              <li>
                <Link
                  href="/dosen"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Dosen & Staf
                </Link>
              </li>
              <li>
                <Link
                  href="/fasilitas"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Fasilitas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 shrink-0" />
                <span className="opacity-80">
                  Jl. Kampus No. 1, Cirebon, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span className="opacity-80">(0231) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span className="opacity-80">ti@umc.ac.id</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Media Sosial</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-sm opacity-75">
          <p>
            &copy; 2025 Program Studi Teknik Informatika Universitas
            Muhammadiyah Cirebon. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
