import { getNews } from "@/actions/news";
import { getPartnerships } from "@/actions/partnerships";
import Hero from "@/components/Sections/Hero";
import LatestNews from "@/components/Sections/LatestNews";
import Partners from "@/components/Sections/Partners";
import ProgramInfo from "@/components/Sections/ProgramInfo";

export default async function Home() {
  const newsResponse = await getNews({ limit: 4 });
  const partnershipsResponse = await getPartnerships({ limit: 50 });

  return (
    <>
      <Hero />
      <ProgramInfo />
      <LatestNews news={newsResponse.data || []} />
      <Partners partnerships={partnershipsResponse.data || []} />
    </>
  );
}
