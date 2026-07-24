import { Metadata } from "next";
import { getNews } from "@/actions/news";
import PromosiClient from "@/components/PromosiClient";

export const metadata: Metadata = {
  title: "Promosi & Event Spesial - Teknik Informatika UMC",
  description:
    "Jelajahi galeri promosi, penawaran beasiswa, pendaftaran PMB, dan event spesial Program Studi Teknik Informatika Universitas Muhammadiyah Cirebon.",
};

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

export default async function PromosiPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);
  const search = params?.search ?? "";
  const limit = 12;

  let newsRes;
  try {
    newsRes = await getNews({
      page,
      limit,
      search,
      category: "promosi",
    });
  } catch (error) {
    newsRes = {
      data: [],
      meta: { total: 0, page: 1, limit: 12, totalPages: 0 },
    };
  }

  return <PromosiClient promotions={newsRes.data} search={search} />;
}
