import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// 1. ContactButton
export function ContactButton({
  id,
  className = "",
  onClick,
}: {
  id?: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      id={id || "contact-btn"}
      onClick={onClick}
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
        outline: "2px solid white",
        outlineOffset: "-3px",
      }}
      className={`rounded-full uppercase font-medium tracking-widest text-white transition-transform hover:scale-105 active:scale-95 duration-200 cursor-pointer px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base ${className}`}
    >
      Contact Me
    </button>
  );
}

// 2. LiveProjectButton
export function LiveProjectButton({
  id,
  className = "",
  onClick,
}: {
  id?: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      id={id || "live-project-btn"}
      onClick={onClick}
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200 cursor-pointer ${className}`}
    >
      Live Project
    </button>
  );
}

// 3. FadeIn
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: any;
  className?: string;
  id?: string;
  key?: any;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = "div",
  className = "",
  id,
}: FadeInProps) {
  // Use motion.create dynamically
  const MotionComponent = motion.create(as);
  return (
    <MotionComponent
      id={id}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

// 4. Magnet
interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0px, 0px, 0px)");
  const [transition, setTransition] = useState(inactiveTransition);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Activates when cursor is within padding distance of element edge
      const maxRadius = Math.max(rect.width, rect.height) / 2 + padding;

      if (distance < maxRadius) {
        setTransition(activeTransition);
        const moveX = distanceX / strength;
        const moveY = distanceY / strength;
        setTransform(`translate3d(${moveX}px, ${moveY}px, 0px)`);
      } else {
        setTransition(inactiveTransition);
        setTransform("translate3d(0px, 0px, 0px)");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={ref}
      style={{
        transform,
        transition,
        willChange: "transform",
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
}

// 5. AnimatedText
interface AnimatedTextProps {
  text: string;
  className?: string;
  id?: string;
}

export function AnimatedText({ text, className = "", id }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");

  return (
    <p ref={ref} id={id} className={`${className} relative inline-wrap leading-relaxed`}>
      {chars.map((char, i) => {
        // Calculate start and end for each character to reveal sequentially
        const start = (i / chars.length) * 0.8;
        const end = Math.min(1, start + 0.2);

        // Transform motion value for opacity
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

        return (
          <span key={i} className="relative inline-block whitespace-pre">
            {/* Invisible placeholder */}
            <span className="opacity-0">{char}</span>
            {/* Absolute positioned animated character */}
            <motion.span
              style={{ opacity }}
              className="absolute left-0 top-0 select-none"
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
}
