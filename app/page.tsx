import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Link
        href="/berita"
        className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
        Lihat Semua Berita
      </Link>
    </div>
  );
}
