import { getNews } from "@/actions/news";
import { getPartnerships } from "@/actions/partnerships";
import { getVisionMission } from "@/actions/visionMission";
import { getStatisticStudents } from "@/actions/statisticStudent"
import Hero from "@/components/Sections/Hero";
import LatestNews from "@/components/Sections/LatestNews";
import Partners from "@/components/Sections/Partners";
import ProgramInfo from "@/components/Sections/ProgramInfo";
import StudentStatistics from "@/components/Sections/StudentStatistics"; 

export default async function Home() {
  const newsResponse = await getNews({ limit: 4 });
  const allNews = newsResponse.data || [];

  const partnershipsResponse = await getPartnerships({ limit: 50 });
  const allPartnerships = partnershipsResponse.data || [];

  const visionMissionResponse = await getVisionMission({ limit: 1 });
  const visionMissionData = visionMissionResponse.data || [];

  // 3. Fetch Data Statistik
  const statisticsResponse = await getStatisticStudents({ limit: 100 });
  const statisticsData = statisticsResponse.data || [];

  return (
    <>
      <Hero />
      <ProgramInfo visionMission={visionMissionData} />
      <StudentStatistics data={statisticsData} />
      <LatestNews news={allNews} />
      <Partners partnerships={allPartnerships} />
    </>
  );
}