import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LiveProjectButton, FadeIn } from "./Reusable";

interface Project {
  number: string;
  category: string;
  name: string;
  col1Video1: string;
  col1Video2?: string;
  col2Video: string;
}

const PROJECTS: Project[] = [
  {
    number: "01",
    category: "Clients Project",
    name: "Wirecard Documentary",
    col1Video1: "/videos/wirecard-trial-30sec.mp4",
    col1Video2: "/videos/wirecard-consistency.mp4",
    col2Video: "/videos/wirecard-documentary.mp4",
  },
  {
    number: "02",
    category: "Clients Project",
    name: "Skillkube",
    col1Video1: "/videos/skillkube-sgnk-sample.mp4",
    col1Video2: "/videos/skillkube-essential.mp4",
    col2Video: "/videos/skillkube-main.mp4",
  },
  {
    number: "03",
    category: "Clients Project",
    name: "Shopify Project",
    col1Video1: "/videos/shopify-documentary-style.mp4",
    col2Video: "/videos/shopify-main.mp4",
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

  const hasSecondClip = Boolean(project.col1Video2);

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
              onClick={() => window.open(project.col2Video, "_blank")}
            />
          </div>
        </div>

        {/* Bottom row: Dynamic Two-column Video Grid */}
        <div className="flex gap-4 md:gap-6 items-stretch w-full flex-1 mt-4 md:mt-6 overflow-hidden">
          {/* Left Column (40% width) */}
          <div
            className={`w-[40%] flex flex-col gap-4 md:gap-6 h-full ${
              hasSecondClip ? "justify-between" : "justify-center"
            }`}
          >
            {/* Left Top Video */}
            <div
              style={{ height: hasSecondClip ? "clamp(100px, 14vw, 230px)" : "100%" }}
              className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-neutral-900"
            >
              <video
                src={project.col1Video1}
                aria-label={`${project.name} clip one`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
            {/* Left Bottom Video (only if a second clip exists) */}
            {hasSecondClip && (
              <div
                style={{ height: "clamp(120px, 18vw, 340px)" }}
                className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden flex-1 bg-neutral-900"
              >
                <video
                  src={project.col1Video2}
                  aria-label={`${project.name} clip two`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
            )}
          </div>

          {/* Right Column (60% width) - Main Showcase Video */}
          <div className="w-[60%] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-neutral-900 h-full">
            <video
              src={project.col2Video}
              aria-label={`${project.name} main showcase`}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
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
