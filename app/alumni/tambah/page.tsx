"use client";

import { useState } from "react";
import { submitPublicAlumni } from "@/actions/alumni";
import { ArrowLeft, CheckCircle2, UserPlus, Upload, GraduationCap, Briefcase, Share2, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function TambahAlumniPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);

    try {
      await submitPublicAlumni(formData);
      setIsSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal mengirimkan testimoni.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Navigation back link */}
        <Link
          href="/alumni"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Kembali ke Daftar Alumni
        </Link>

        {isSuccess ? (
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 text-center shadow-xl space-y-6">
            <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={48} />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Terima Kasih!</h1>
            <p className="text-muted-foreground max-w-md mx-auto text-base">
              Data dan testimoni Anda telah berhasil dikirim. Data Anda sedang dalam proses peninjauan oleh tim admin sebelum ditampilkan secara publik.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <Link
                href="/alumni"
                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition shadow-md"
              >
                Lihat Alumni Lainnya
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-xl space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                <UserPlus size={14} />
                Formulir Pendataan Alumni
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Tambah Data Alumni Mandiri
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                Bantu kami memperbarui basis data alumni Teknik Informatika UMC serta bagikan pengalaman Anda kepada adik tingkat.
              </p>
            </div>

            {errorMsg && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl text-sm font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Informasi Akademik */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-base font-semibold text-foreground border-b border-border pb-2">
                  <GraduationCap className="text-primary" size={20} />
                  <span>Informasi Akademik</span>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Masukkan nama lengkap beserta gelar (jika ada)"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Program Studi <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="prodi"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    >
                      <option value="S1">S1 Teknik Informatika</option>
                      <option value="D3">D3 Teknik Informatika</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Angkatan / Tahun Masuk <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="year"
                      type="number"
                      min={1900}
                      max={2099}
                      required
                      placeholder="Contoh: 2019"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Tahun Lulus</label>
                    <input
                      name="graduationYear"
                      type="number"
                      min={1900}
                      max={2099}
                      placeholder="Contoh: 2023"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Karir & Pekerjaan */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-base font-semibold text-foreground border-b border-border pb-2">
                  <Briefcase className="text-primary" size={20} />
                  <span>Karir & Pekerjaan</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Perusahaan / Instansi</label>
                    <input
                      name="workplace"
                      placeholder="Contoh: PT Tokopedia, Google, Mandiri"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Jabatan / Posisi</label>
                    <input
                      name="position"
                      placeholder="Contoh: Software Engineer, Data Analyst"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Media Sosial & Profil */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-base font-semibold text-foreground border-b border-border pb-2">
                  <Share2 className="text-primary" size={20} />
                  <span>Media Sosial & Profil</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">LinkedIn URL</label>
                    <input
                      name="linkedin"
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Instagram URL</label>
                    <input
                      name="instagram"
                      placeholder="https://instagram.com/username"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Link Video Testimoni</label>
                    <input
                      name="video"
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Foto Profil</label>
                  <input
                    name="photo"
                    type="file"
                    accept="image/*"
                    className="w-full px-4 py-2 rounded-xl border border-border bg-input text-foreground text-xs file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload foto diri resmi atau profesional (JPG/PNG).
                  </p>
                </div>
              </div>

              {/* Section 4: Testimoni */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-base font-semibold text-foreground border-b border-border pb-2">
                  <MessageSquare className="text-primary" size={20} />
                  <span>Kesan & Testimoni</span>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Pesan / Testimoni Alumni <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Bagikan pengalaman belajar, manfaat ilmu yang didapatkan di IT UMC, serta saran atau kesan untuk adik-adik mahasiswa..."
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-border">
                <Link
                  href="/alumni"
                  className="px-6 py-3 rounded-xl border border-border font-semibold text-sm text-muted-foreground hover:bg-muted transition"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-primary text-white font-semibold rounded-xl text-sm hover:bg-primary/90 transition shadow-md disabled:opacity-50"
                >
                  {isLoading ? "Mengirim..." : "Kirim Data Alumni"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
