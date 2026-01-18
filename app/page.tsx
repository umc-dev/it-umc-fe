import { getNews } from "@/actions/news";
import Hero from "@/components/Sections/Hero";
import LatestNews from "@/components/Sections/LatestNews";
import Partners from "@/components/Sections/Partners";
import ProgramInfo from "@/components/Sections/ProgramInfo";

export default async function Home() {
  const newsResponse = await getNews({ limit: 4 });
  const allNews = newsResponse.data || [];

  return (
    <>
      <Hero />
      <ProgramInfo />
      <LatestNews news={allNews} />
      <Partners />
    </>
  );
}
