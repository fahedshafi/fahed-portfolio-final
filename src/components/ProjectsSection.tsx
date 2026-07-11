import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LiveProjectButton, FadeIn } from "./Reusable";

interface Project {
  number: string;
  category: string;
  name: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
}

const PROJECTS: Project[] = [
  {
    number: "01",
    category: "Client Project",
    name: "Nextlevel Studio",
    col1Image1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    col1Image2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    col2Image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
  },
  {
    number: "02",
    category: "Personal Project",
    name: "Aura Brand Identity",
    col1Image1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    col1Image2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    col2Image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
  },
  {
    number: "03",
    category: "Client Project",
    name: "Solaris Digital",
    col1Image1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    col1Image2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    col2Image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
  key?: any;
}

function ProjectCard({ project, index, totalCards }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll position of the card's container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;

  // Transform scale from 1 down to targetScale as we scroll past this card
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  // Translate slightly on stacking for added depth
  const y = useTransform(scrollYProgress, [0, 1], [0, index * -5]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[85vh] flex justify-center items-start pt-10"
    >
      <motion.div
        style={{
          scale,
          y,
          top: `calc(96px + ${index * 28}px)`, // Sticky top configuration + cumulative card offsets
          willChange: "transform",
        }}
        className="sticky w-full max-w-5xl h-[70vh] min-h-[460px] md:h-[72vh] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl z-10"
      >
        {/* Top row: Info & Live Project Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full border-b border-neutral-800/60 pb-4 md:pb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Number (custom oversized typography matching Services) */}
            <span className="font-black text-[#D7E2EA] opacity-30 text-[clamp(2.5rem,7vw,100px)] leading-none select-none">
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-[#D7E2EA] opacity-50 uppercase text-xs sm:text-sm tracking-wider font-light">
                {project.category}
              </span>
              <h3 className="text-[#D7E2EA] uppercase font-semibold text-lg sm:text-2xl md:text-3xl leading-none tracking-tight">
                {project.name}
              </h3>
            </div>
          </div>
          {/* Live project button */}
          <div className="shrink-0 self-start sm:self-center">
            <LiveProjectButton
              onClick={() => window.open(project.col2Image, "_blank")}
            />
          </div>
        </div>

        {/* Bottom row: Dynamic Two-column Image Grid */}
        <div className="flex gap-4 md:gap-6 items-stretch w-full flex-1 mt-4 md:mt-6 overflow-hidden">
          {/* Left Column (40% width) */}
          <div className="w-[40%] flex flex-col gap-4 md:gap-6 justify-between h-full">
            {/* Left Top Image */}
            <div
              style={{ height: "clamp(100px, 14vw, 230px)" }}
              className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-neutral-900"
            >
              <img
                src={project.col1Image1}
                alt={`${project.name} top item`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            {/* Left Bottom Image */}
            <div
              style={{ height: "clamp(120px, 18vw, 340px)" }}
              className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden flex-1 bg-neutral-900"
            >
              <img
                src={project.col1Image2}
                alt={`${project.name} bottom item`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column (60% width) - Tall Image */}
          <div className="w-[60%] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-neutral-900 h-full">
            <img
              src={project.col2Image}
              alt={`${project.name} main showcase`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 pb-24 overflow-hidden -mt-10 sm:-mt-12 md:-mt-14 z-15"
    >
      <div className="max-w-5xl mx-auto flex flex-col">
        {/* Section Title */}
        <FadeIn y={30} delay={0} className="w-full flex justify-center mb-10">
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none select-none">
            Project
          </h2>
        </FadeIn>

        {/* Sticky Stacking Cards Container */}
        <div className="relative flex flex-col w-full mt-6">
          {PROJECTS.map((project, idx) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={idx}
              totalCards={PROJECTS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
