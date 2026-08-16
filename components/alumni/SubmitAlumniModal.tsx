"use client";

import { useState } from "react";
import { submitPublicAlumni } from "@/actions/alumni";
import { UserPlus, X, Upload, CheckCircle2 } from "lucide-react";

export default function SubmitAlumniModal() {
  const [isOpen, setIsOpen] = useState(false);
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
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal mengirimkan testimoni.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSuccess(false);
    setErrorMsg("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition shadow-md hover:shadow-lg"
      >
        <UserPlus size={18} />
        Isi Form Testimoni Alumni
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl relative my-8 text-foreground">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                <h3 className="text-2xl font-bold text-foreground">Terima Kasih!</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                  Testimoni Anda telah diterima dan sedang dalam proses peninjauan oleh tim admin.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-foreground mb-1">Form Data Alumni Mandiri</h3>
                <p className="text-xs text-muted-foreground mb-6">
                  Isi formulir ini untuk membagikan pengalaman & testimoni Anda sebagai lulusan Teknik Informatika UMC.
                </p>

                {errorMsg && (
                  <div className="p-3 mb-4 text-xs font-medium bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg border border-red-500/20">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                  <div>
                    <label className="block font-medium mb-1">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      required
                      placeholder="Masukkan nama lengkap Anda"
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium mb-1">
                        Program Studi <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="prodi"
                        required
                        className="w-full px-3 py-2 rounded-xl border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="S1">S1 Teknik Informatika</option>
                        <option value="D3">D3 Teknik Informatika</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium mb-1">
                        Angkatan <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="year"
                        type="number"
                        required
                        placeholder="Contoh: 2019"
                        className="w-full px-3 py-2 rounded-xl border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium mb-1">Tahun Lulus</label>
                      <input
                        name="graduationYear"
                        type="number"
                        placeholder="Contoh: 2023"
                        className="w-full px-3 py-2 rounded-xl border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-1">Perusahaan / Tempat Kerja</label>
                      <input
                        name="workplace"
                        placeholder="Contoh: PT Tech Nusantara"
                        className="w-full px-3 py-2 rounded-xl border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium mb-1">Jabatan / Posisi</label>
                      <input
                        name="position"
                        placeholder="Contoh: Frontend Engineer"
                        className="w-full px-3 py-2 rounded-xl border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-1">URL LinkedIn</label>
                      <input
                        name="linkedin"
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-3 py-2 rounded-xl border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium mb-1">Instagram</label>
                      <input
                        name="instagram"
                        placeholder="@username atau URL"
                        className="w-full px-3 py-2 rounded-xl border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-1">Link Video Testimoni</label>
                      <input
                        name="video"
                        placeholder="https://youtube.com/..."
                        className="w-full px-3 py-2 rounded-xl border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-1">
                      Pesan / Kesan / Testimoni <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      placeholder="Bagikan pengalaman & ilmu yang Anda dapatkan di IT UMC..."
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Foto Profile / Alumni</label>
                    <input
                      name="photo"
                      type="file"
                      accept="image/*"
                      className="w-full px-3 py-1.5 rounded-xl border border-border bg-input text-xs"
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-border">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 py-2.5 rounded-xl border border-border font-semibold text-muted-foreground hover:bg-muted"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 disabled:opacity-50"
                    >
                      {isLoading ? "Mengirim..." : "Kirim Data"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
