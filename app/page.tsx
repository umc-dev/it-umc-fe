import Facilities from "@/components/Sections/Facilities";
import Hero from "@/components/Sections/Hero";
import LatestNews from "@/components/Sections/LatestNews";
import ProgramInfo from "@/components/Sections/ProgramInfo";

export default function Home() {
  return (
    <>
      <Hero /> 
      <LatestNews />
      <ProgramInfo />
      <Facilities />
    </>
  );
}
