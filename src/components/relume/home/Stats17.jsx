"use client";

import { useRef, useEffect } from "react";
import { gsap } from "../../../utils/gsap";

const stats = [
  { value: "547", label: "Abgeschlossene Projekte", num: 547, suffix: "" },
  { value: "98%", label: "Pünktliche Fertigstellung", num: 98,  suffix: "%" },
  { value: "96%", label: "Im Budgetrahmen",           num: 96,  suffix: "%" },
  { value: "70+", label: "Jahre in Bayern",           num: 70,  suffix: "+" },
];

export function Stats17() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Background parallax ───────────────────────────────────────────
      gsap.to(".s17-bg-img", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // ── Left column: slides in from left ─────────────────────────────
      gsap.from(".s17-left", {
        x: -70,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });

      // Gold eyebrow slightly delayed for layering effect
      gsap.from(".s17-eyebrow", {
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.18,
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });

      // CTA button slides in after heading
      gsap.from(".s17-cta", {
        y: 22,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.45,
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });

      // ── Right grid: staggered slide-up ───────────────────────────────
      gsap.from(".s17-item", {
        y: 55,
        opacity: 0,
        stagger: 0.13,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: { trigger: ".s17-grid", start: "top 76%" },
      });

      // Gold left-border accent: draws downward
      gsap.from(".s17-item-border", {
        scaleY: 0,
        transformOrigin: "top center",
        stagger: 0.13,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: { trigger: ".s17-grid", start: "top 76%" },
      });

      // ── Counter animation ─────────────────────────────────────────────
      const numEls = gsap.utils.toArray(".s17-num", sectionRef.current);
      numEls.forEach((el, i) => {
        const stat = stats[i];
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.num,
          duration: 2.4,
          ease: "power2.out",
          delay: i * 0.13,
          scrollTrigger: {
            trigger: ".s17-grid",
            start: "top 76%",
            once: true,
          },
          onUpdate() {
            el.textContent = Math.round(obj.val) + stat.suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-[5%] py-16 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Background image with parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/villa-twilight.jpg"
          alt="Bayerische Villa im Abendlicht"
          className="s17-bg-img absolute inset-0 size-full object-cover"
          style={{ willChange: "transform" }}
        />
        <div className="absolute inset-0 bg-text-primary/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-y-12 lg:grid-cols-2 lg:gap-x-20">

          {/* Left */}
          <div className="s17-left">
            <p className="s17-eyebrow mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-hoser-gold md:mb-4">
              Unsere Zahlen
            </p>
            <h2 className="mb-5 font-heading text-5xl font-bold leading-tight tracking-tight text-text-alternative md:mb-6 md:text-7xl lg:text-8xl">
              Ergebnisse,<br />die für sich sprechen
            </h2>
            <p className="font-body text-base text-text-alternative/75 md:text-lg">
              Über 70 Jahre Bauen in Bayern. Hunderte von Gebäuden. Ein Ruf.
            </p>
            <div className="s17-cta mt-8">
              <a
                href="/projekte"
                className="inline-flex items-center gap-3 border border-text-alternative/30 px-7 py-3 font-body text-sm font-semibold tracking-wide text-text-alternative transition-all duration-200 hover:border-hoser-gold hover:text-hoser-gold"
              >
                Projekte entdecken
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right: Stats grid */}
          <div className="s17-grid grid grid-cols-2 gap-x-8 gap-y-10 py-2 md:gap-x-12 md:gap-y-12">
            {stats.map((stat) => (
              <div key={stat.label} className="s17-item relative pl-6">
                {/* Animated left border */}
                <div className="s17-item-border absolute left-0 top-0 h-full w-0.5 bg-hoser-gold" />
                <p className="s17-num mb-2 font-heading text-5xl font-bold leading-tight text-text-alternative md:text-6xl lg:text-7xl">
                  {stat.value}
                </p>
                <p className="font-body text-sm font-medium text-text-alternative/70 md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
