import React, { useRef, useState, useEffect } from "react";

const IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

export function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Calculate sectionTop relative to document top
      const sectionTop = rect.top + window.scrollY;
      const currentScrollY = window.scrollY;
      const innerHeight = window.innerHeight;

      // Scroll offset calculated as: (window.scrollY - sectionTop + window.innerHeight) * 0.3
      const offset = (currentScrollY - sectionTop + innerHeight) * 0.3;
      setScrollOffset(offset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to establish initial position
    handleScroll();

    // Also run on resize to keep offset accurate
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Row 1: first 11 images (indices 0 to 10), tripled
  const row1ImagesOriginal = IMAGES.slice(0, 11);
  const row1Images = [
    ...row1ImagesOriginal,
    ...row1ImagesOriginal,
    ...row1ImagesOriginal,
  ];

  // Row 2: remaining 10 images (indices 11 to 20), tripled
  const row2ImagesOriginal = IMAGES.slice(11);
  const row2Images = [
    ...row2ImagesOriginal,
    ...row2ImagesOriginal,
    ...row2ImagesOriginal,
  ];

  // Row 1 translation: moves RIGHT on scroll: translateX(offset - 200)
  const row1Transform = `translate3d(${scrollOffset - 200}px, 0px, 0px)`;

  // Row 2 translation: moves LEFT on scroll: translateX(-(offset - 200))
  const row2Transform = `translate3d(${-(scrollOffset - 200)}px, 0px, 0px)`;

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full select-none"
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1 */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div
            style={{
              transform: row1Transform,
              willChange: "transform",
              transition: "transform 0.1s ease-out", // subtle smooth trailing feel
            }}
            className="flex gap-3 whitespace-nowrap"
          >
            {row1Images.map((src, i) => (
              <div
                key={`row1-${i}`}
                className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/50"
              >
                <img
                  src={src}
                  alt={`Portfolio preview Row 1 Tile ${i}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-2xl pointer-events-none"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div
            style={{
              transform: row2Transform,
              willChange: "transform",
              transition: "transform 0.1s ease-out",
            }}
            className="flex gap-3 whitespace-nowrap"
          >
            {row2Images.map((src, i) => (
              <div
                key={`row2-${i}`}
                className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/50"
              >
                <img
                  src={src}
                  alt={`Portfolio preview Row 2 Tile ${i}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-2xl pointer-events-none"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
