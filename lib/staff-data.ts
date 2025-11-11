// Staff and lecturer data for the Computer Science program

export interface StaffMember {
  id: string
  name: string
  position: string
  email: string
  phone: string
  specialization?: string
  image: string
  type: "lecturer" | "staff"
}

export const staffMembers: StaffMember[] = [
  // Lecturers
  {
    id: "1",
    name: "Prof. Dr. Bambang Setiawan",
    position: "Ketua Program Studi",
    email: "bambang@umcirebon.ac.id",
    phone: "+62 231-487-4567",
    specialization: "Artificial Intelligence & Machine Learning",
    image: "/profesional-pria-berjas-formal-profesional.webp",
    type: "lecturer",
  },
  {
    id: "2",
    name: "Dr. Siti Nurhaliza, M.Kom",
    position: "Dosen Senior",
    email: "siti@umcirebon.ac.id",
    phone: "+62 231-487-4568",
    specialization: "Database & Data Science",
    image: "/profesional-wanita-berambut-panjang-formal.webp",
    type: "lecturer",
  },
  {
    id: "3",
    name: "Ir. Ahmad Wijaya, M.T",
    position: "Dosen Senior",
    email: "ahmad@umcirebon.ac.id",
    phone: "+62 231-487-4569",
    specialization: "Web Development & Software Engineering",
    image: "/profesional-pria-muda-berjas.webp",
    type: "lecturer",
  },
  {
    id: "4",
    name: "Dr. Eka Putri Wijayanti, M.Kom",
    position: "Dosen",
    email: "eka@umcirebon.ac.id",
    phone: "+62 231-487-4570",
    specialization: "Computer Networks & Cybersecurity",
    image: "/profesional-wanita-muda-tersenyum.webp",
    type: "lecturer",
  },
  {
    id: "5",
    name: "Drs. Rudi Hermawan, M.Kom",
    position: "Dosen",
    email: "rudi@umcirebon.ac.id",
    phone: "+62 231-487-4571",
    specialization: "Mobile Application Development",
    image: "/profesional-pria-berambut-pendek.webp",
    type: "lecturer",
  },
  {
    id: "6",
    name: "Indra Setiawan, M.Kom",
    position: "Dosen",
    email: "indra@umcirebon.ac.id",
    phone: "+62 231-487-4572",
    specialization: "Algorithms & Data Structures",
    image: "/profesional-muda-pria-bersenyum.webp",
    type: "lecturer",
  },
  // Staff
  {
    id: "7",
    name: "Retno Sari",
    position: "Staff Administrasi",
    email: "retno@umcirebon.ac.id",
    phone: "+62 231-487-4573",
    image: "/profesional-wanita-staff-kantor.webp",
    type: "staff",
  },
  {
    id: "8",
    name: "Budi Raharjo",
    position: "Teknisi Lab",
    email: "budi@umcirebon.ac.id",
    phone: "+62 231-487-4574",
    image: "/teknisi-pria-dengan-tools.webp",
    type: "staff",
  },
  {
    id: "9",
    name: "Maya Kusuma",
    position: "Staff Pendampingan Akademik",
    email: "maya@umcirebon.ac.id",
    phone: "+62 231-487-4575",
    image: "/wanita-muda-staff-akademik.webp",
    type: "staff",
  },
]

export function getLecturers() {
  return staffMembers.filter((member) => member.type === "lecturer")
}

export function getStaff() {
  return staffMembers.filter((member) => member.type === "staff")
}
