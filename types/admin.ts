export interface Admin {
  id: string;
  email: string;
  name: string;
  password?: string; // Optional karena biasanya password tidak dikirim ke client
  avatar: string | null;
  role: "SUPER_ADMIN" | "ADMIN"; // Tambahkan role lain jika ada
  createdAt: string;
  updatedAt: string;
}
