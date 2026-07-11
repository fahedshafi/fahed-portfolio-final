import React, { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { MarqueeSection } from "./components/MarqueeSection";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactModal } from "./components/ContactModal";
import { MessageSquareCode, Github, Sparkles } from "lucide-react";

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  return (
    <div
      style={{ overflowX: "clip" }}
      className="relative min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-sans antialiased selection:bg-[#B600A8] selection:text-white"
    >
      {/* SECTION ORDER */}
      {/* 1. HeroSection */}
      <HeroSection onContactClick={openContact} />

      {/* 2. MarqueeSection */}
      <MarqueeSection />

      {/* 3. AboutSection */}
      <AboutSection onContactClick={openContact} />

      {/* 4. ServicesSection */}
      <ServicesSection />

      {/* 5. ProjectsSection */}
      <ProjectsSection />

      {/* Interactive Contact Portal Modal */}
      <ContactModal isOpen={isContactOpen} onClose={closeContact} />

      {/* Ambient Visual Accents & Global Social / Utility Rail (Bottom Right Corner) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Floating Action Trigger */}
        <button
          onClick={openContact}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900/85 hover:bg-neutral-800 border border-[#D7E2EA]/15 text-[#D7E2EA] hover:text-white text-xs sm:text-sm uppercase tracking-wider font-medium backdrop-blur-md transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Sparkles size={14} className="text-[#B600A8] animate-pulse" />
          <span>Hire Jack</span>
        </button>
      </div>

      {/* Subtle Copyright Signature at absolute bottom */}
      <footer className="w-full bg-[#0C0C0C] border-t border-neutral-900 py-6 text-center text-xs text-[#D7E2EA]/30 tracking-widest uppercase select-none">
        &copy; {new Date().getFullYear()} JACK &bull; ALL RIGHTS RESERVED
      </footer>
    </div>
  );
}
