import BackgroundVideo from "@/components/BackgroundVideo";
import Navbar from "@/components/Navbar";
import HeroDashboard from "@/components/HeroDashboard";
import TerminalStats from "@/components/TerminalStats";
import AboutSection from "@/components/AboutSection";
import TechStack from "@/components/TechStack";
import ProjectsGrid from "@/components/ProjectsGrid";
import ContactSection from "@/components/ContactSection";
import FinTechTicker from "@/components/FinTechTicker";

export default function Home() {
  return (
    <main className="w-full flex justify-center mt-[10vh]">
      <article className="max-w-[1200px] w-full px-5">
        <HeroDashboard />
        <TerminalStats />
        <AboutSection />
        <ProjectsGrid />
        <TechStack />
        <ContactSection />
      </article>
      <div className="fixed bottom-0 left-0 w-full z-50">
        <FinTechTicker />
      </div>
    </main>
  );
}
