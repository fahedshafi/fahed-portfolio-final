import React, { useRef, useState, useEffect } from "react";

const VIDEOS = [
  "/videos/wirecard-documentary.mp4",
  "/videos/wirecard-trial-30sec.mp4",
  "/videos/wirecard-consistency.mp4",
  "/videos/skillkube-main.mp4",
  "/videos/skillkube-sgnk-sample.mp4",
  "/videos/skillkube-essential.mp4",
  "/videos/shopify-main.mp4",
  "/videos/shopify-documentary-style.mp4",
];

function VideoTile({ src, label }: { src: string; label: string; key?: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.muted = false;
  };

  const handleMouseLeave = () => {
    if (videoRef.current) videoRef.current.muted = true;
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/50"
    >
      <video
        ref={videoRef}
        src={src}
        aria-label={label}
        className="w-full h-full object-cover pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}

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

  // Row 1: first 4 videos, tripled
  const row1VideosOriginal = VIDEOS.slice(0, 4);
  const row1Videos = [
    ...row1VideosOriginal,
    ...row1VideosOriginal,
    ...row1VideosOriginal,
  ];

  // Row 2: remaining 4 videos, tripled
  const row2VideosOriginal = VIDEOS.slice(4);
  const row2Videos = [
    ...row2VideosOriginal,
    ...row2VideosOriginal,
    ...row2VideosOriginal,
  ];

  // Row 1 translation: moves RIGHT on scroll: translateX(offset - 200)
  const row1Transform = `translate3d(${scrollOffset - 200}px, 0px, 0px)`;

  // Row 2 translation: moves LEFT on scroll: translateX(-(offset - 200))
  const row2Transform = `translate3d(${-(scrollOffset - 200)}px, 0px, 0px)`;

  return (
    <section
      id="projects"
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
            {row1Videos.map((src, i) => (
              <VideoTile key={`row1-${i}`} src={src} label={`Portfolio preview Row 1 Tile ${i}`} />
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
            {row2Videos.map((src, i) => (
              <VideoTile key={`row2-${i}`} src={src} label={`Portfolio preview Row 2 Tile ${i}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
