import { getNews } from "@/actions/news";
import { getPartnerships } from "@/actions/partnerships";
import { getVisionMission } from "@/actions/visionMission"; // Import action baru
import Hero from "@/components/Sections/Hero";
import LatestNews from "@/components/Sections/LatestNews";
import Partners from "@/components/Sections/Partners";
import ProgramInfo from "@/components/Sections/ProgramInfo";

export default async function Home() {
  const newsResponse = await getNews({ limit: 4 });
  const allNews = newsResponse.data || [];

  const partnershipsResponse = await getPartnerships({ limit: 50 });
  const allPartnerships = partnershipsResponse.data || [];

  const visionMissionResponse = await getVisionMission({ limit: 1 });
  const visionMissionData = visionMissionResponse.data || [];

  return (
    <>
      <Hero />
      {/* Oper data ke component */}
      <ProgramInfo visionMission={visionMissionData} />
      <LatestNews news={allNews} />
      <Partners partnerships={allPartnerships} />
    </>
  );
}