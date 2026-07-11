import React, { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { MarqueeSection } from "./components/MarqueeSection";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { ContactModal } from "./components/ContactModal";

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

      {/* Interactive Contact Portal Modal */}
      <ContactModal isOpen={isContactOpen} onClose={closeContact} />

      {/* Subtle Copyright Signature at absolute bottom */}
      <footer className="w-full bg-[#0C0C0C] border-t border-neutral-900 py-6 text-center text-xs text-[#D7E2EA]/30 tracking-widest uppercase select-none">
        &copy; {new Date().getFullYear()} FAHED &bull; ALL RIGHTS RESERVED
      </footer>
    </div>
  );
}
