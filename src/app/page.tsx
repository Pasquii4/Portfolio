"use client";

import Navbar from "@/components/Navbar";
import HeroDashboard from "@/components/HeroDashboard";
import { AppBackground } from "@/components/AppBackground";
import TerminalStats from "@/components/TerminalStats";
import AboutSection from "@/components/AboutSection";
import TechStack from "@/components/TechStack";
import ProjectsGrid from "@/components/ProjectsGrid";
import WhatIBuildSection from "@/components/WhatIBuildSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export default function Home() {
  const { locale } = useTranslation();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none">
        <AppBackground />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={locale}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.15,
            ease: "easeInOut",
          }}
        >
          <Navbar />
          <main className="w-full flex justify-center mt-[10vh]">
            <article className="max-w-[1200px] w-full px-5">
              <HeroDashboard />
              <TerminalStats />
              <AboutSection />
              <WhatIBuildSection />
              <FeaturedProjects />
              <ProjectsGrid />
              <TechStack />
              <ContactSection />
              <Footer />
            </article>
          </main>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
