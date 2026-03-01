import Navbar from "@/components/Navbar";
import HeroDashboard from "@/components/HeroDashboard";
import { AppBackground } from "@/components/AppBackground";
import TerminalStats from "@/components/TerminalStats";
import AboutSection from "@/components/AboutSection";
import TechStack from "@/components/TechStack";
import ProjectsGrid from "@/components/ProjectsGrid";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FinTechTicker from "@/components/FinTechTicker";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none">
        <AppBackground />
      </div>
      <Navbar />
      <main className="w-full flex justify-center mt-[10vh]">
        <article className="max-w-[1200px] w-full px-5">
          <HeroDashboard />
          <TerminalStats />
          <AboutSection />
          <ProjectsGrid />
          <TechStack />
          <ContactSection />
          <Footer />
        </article>
        <div className="fixed bottom-0 left-0 w-full z-50">
          <FinTechTicker />
        </div>
      </main>
    </>
  );
}
