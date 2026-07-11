import React from "react";
import { FadeIn, Magnet, ContactButton } from "./Reusable";

interface HeroSectionProps {
  onContactClick: () => void;
}

export function HeroSection({ onContactClick }: HeroSectionProps) {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0C0C0C] select-none">
      {/* Immersive UI Background Ambient Elements */}
      <div className="absolute top-[10%] left-[2%] w-48 opacity-[0.06] sm:opacity-[0.1] z-0 select-none pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="Ambient Moon"
          referrerPolicy="no-referrer"
          className="w-full h-auto"
        />
      </div>
      <div className="absolute top-[8%] right-[4%] w-40 opacity-[0.06] sm:opacity-[0.1] z-0 select-none pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="Ambient Lego"
          referrerPolicy="no-referrer"
          className="w-full h-auto"
        />
      </div>

      {/* 1. Navbar (Immersive UI Layout) */}
      <FadeIn
        y={-20}
        delay={0}
        as="nav"
        className="relative z-30 w-full flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8"
      >
        <div className="text-xl font-bold tracking-tighter text-[#D7E2EA] select-none">
          FAHED&mdash;
        </div>
        <div className="flex gap-6 md:gap-12 text-sm font-medium uppercase tracking-widest">
          <button
            onClick={() => handleScrollTo("about")}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.1rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => handleScrollTo("projects")}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.1rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
          >
            Projects
          </button>
          <button
            onClick={onContactClick}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.1rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
          >
            Contact
          </button>
        </div>
      </FadeIn>

      {/* 2. Hero Heading (Middle Content) */}
      <div className="relative z-5 flex-1 flex flex-col justify-center items-center px-6 md:px-10">
        <div className="overflow-hidden w-full text-center">
          <FadeIn y={40} delay={0.15}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 select-none">
              im fahed
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* 3. Hero Portrait (Centered absolutely, layered between background heading and foreground bottom bar) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-8 md:bottom-12 pointer-events-auto">
        <FadeIn y={30} delay={0.6}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full h-full flex justify-center items-end"
          >
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Fahed Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              loading="eager"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Ambient background objects */}
      <img
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
        className="absolute bottom-[15%] left-[8%] w-24 opacity-[0.06] pointer-events-none hidden lg:block z-0"
        alt="Ambient Object Left"
        referrerPolicy="no-referrer"
      />
      <img
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
        className="absolute bottom-[20%] right-[8%] w-28 opacity-[0.06] pointer-events-none hidden lg:block z-0"
        alt="Ambient Object Right"
        referrerPolicy="no-referrer"
      />

      {/* 4. Bottom bar */}
      <div className="relative z-20 w-full flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
        {/* Left: description */}
        <FadeIn y={20} delay={0.35}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] text-left select-none text-[clamp(0.75rem,1.4vw,1.5rem)]">
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        {/* Right: contact button & Service tags (stacked as specified in Immersive UI) */}
        <FadeIn y={20} delay={0.5} className="flex flex-col items-end gap-4 md:gap-5">
          <div className="flex gap-2.5 sm:gap-4">
            <div className="pill-ghost text-[9px] sm:text-[10px] md:text-xs">
              3D Modeling
            </div>
            <div className="pill-ghost text-[9px] sm:text-[10px] md:text-xs">
              Branding
            </div>
          </div>
          <ContactButton onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  );
}
