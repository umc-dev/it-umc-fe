import { getNews } from "@/actions/news";
import { getPartnerships } from "@/actions/partnerships";
import { getVisionMission } from "@/actions/visionMission";
import { getStatisticStudents } from "@/actions/statisticStudent";

import Hero from "@/components/Sections/Hero";
import LatestNews from "@/components/Sections/LatestNews";
import Partners from "@/components/Sections/Partners";
import ProgramInfo from "@/components/Sections/ProgramInfo";
import StudentStatistics from "@/components/Sections/StudentStatistics";

export default async function Home() {
  // Ambil data News
  const newsResponse = await getNews({ limit: 4 });
  
  // Ambil data Vision & Mission
  const visionMissionResponse = await getVisionMission({ limit: 1 });
  
  // Ambil data Partnerships
  const partnershipsResponse = await getPartnerships({ limit: 50 });
  
  // Ambil data statistik 
  const statisticsResponse = await getStatisticStudents({ limit: 100 });

  // Extract Data
  const allNews = newsResponse.data || [];
  const visionMissionData = visionMissionResponse.data || [];
  const allPartnerships = partnershipsResponse.data || [];
  const statisticsData = statisticsResponse.data || [];
  const totalPartners = partnershipsResponse.meta?.total || 0;

  // Rumus: Sum(Masuk) - Sum(Lulus) dari semua tahun
  const totalActiveStudents = statisticsData.reduce((acc, curr) => {
    const activeInYear = curr.enteredStudents - curr.graduatedStudents;
    return acc + (activeInYear > 0 ? activeInYear : 0);
  }, 0);

  // props untuk Hero
  const heroStats = {
    accreditation: "Baik Sekali",
    activeStudents: totalActiveStudents > 0 ? totalActiveStudents : 3500, // Fallback angka
    totalPartners: totalPartners > 0 ? totalPartners : 50, // Fallback angka
    employmentRate: "90%",
  };

  return (
    <>
      <Hero stats={heroStats} />
      <ProgramInfo visionMission={visionMissionData} />
      <StudentStatistics data={statisticsData} />
      <LatestNews news={allNews} />
      <Partners partnerships={allPartnerships} />
    </>
  );
}