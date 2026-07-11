import React from "react";
import { FadeIn } from "./Reusable";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "3d-modeling",
    number: "01",
    title: "3D Modeling",
    description:
      "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.",
  },
  {
    id: "rendering",
    number: "02",
    title: "Rendering",
    description:
      "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.",
  },
  {
    id: "motion-design",
    number: "03",
    title: "Motion Design",
    description:
      "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.",
  },
  {
    id: "branding",
    number: "04",
    title: "Branding",
    description:
      "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.",
  },
  {
    id: "web-design",
    number: "05",
    title: "Web Design",
    description:
      "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 overflow-hidden select-none z-10"
    >
      <div className="max-w-5xl mx-auto flex flex-col">
        {/* Services Heading */}
        <FadeIn y={30} delay={0}>
          <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none mb-16 sm:mb-20 md:mb-28">
            Services
          </h2>
        </FadeIn>

        {/* Vertical List of Services */}
        <div className="flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {SERVICES.map((service, i) => (
            <FadeIn
              key={service.id}
              y={30}
              delay={i * 0.1}
              className="border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10">
                {/* Number (Left) */}
                <div className="font-black text-[#0C0C0C] leading-none shrink-0 text-[clamp(3rem,10vw,140px)] min-w-[70px] sm:min-w-[120px]">
                  {service.number}
                </div>

                {/* Title + Description Stack (Right) */}
                <div className="flex-1 flex flex-col gap-2 md:gap-3">
                  <h3 className="font-medium uppercase text-[#0C0C0C] text-[clamp(1.25rem,2.2vw,2.1rem)] leading-tight">
                    {service.title}
                  </h3>
                  <p className="font-light text-[#0C0C0C] opacity-70 leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)]">
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
