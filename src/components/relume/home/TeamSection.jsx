"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

const michael = {
  num: "01",
  name: "Georg Härtl",
  title: "Geschäftsführer",
  role: "Inhaber",
  image: "/images/michael-schmid.png",
  email: "info@bauunternehmen-haertl.de",
  bio: "2007 übernahm Georg Härtl das väterliche Unternehmen und führt es seitdem mit Persönlichkeit und Beständigkeit weiter. Mit einem zehnköpfigen Team realisiert er Projekte von der Planung bis zur Schlüsselübergabe – in der Region Erding und weit darüber hinaus.",
  facts: [
    { label: "Unternehmen", value: "Baugeschäft GmbH Georg Härtl" },
    { label: "Schwerpunkt", value: "Hochbau, Tiefbau & Baustoffhandel" },
    { label: "Übernahme", value: "2007 (Familienbetrieb seit 1992)" },
  ],
};

export function TeamSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // Image: clip-path wipe in from right
      tl.fromTo(".team-img-wrap",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power2.inOut" },
        0
      );

      // Eyebrow label
      tl.fromTo(".team-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.2
      );

      // Name – mask reveal
      tl.fromTo(".team-name-inner",
        { y: "105%" },
        { y: "0%", duration: 0.85 },
        0.35
      );

      // Sub-title
      tl.fromTo(".team-subtitle",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        0.55
      );

      // Gold divider line
      tl.fromTo(".team-divider",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.6 },
        0.65
      );

      // Bio paragraph
      tl.fromTo(".team-bio",
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.75
      );

      // Fact rows staggered
      tl.fromTo(".team-fact",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
        0.9
      );

      // Email
      tl.fromTo(".team-email",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45 },
        1.2
      );
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative" style={{ backgroundColor: "#0A1628" }} ref={sectionRef}>

      <div className="relative h-screen w-full overflow-hidden flex">

        {/* Links: Text */}
        <div className="flex h-full w-1/2 flex-col justify-center px-12 md:px-16 lg:px-20">
          <p className="team-eyebrow mb-5 font-body text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: "#F07040" }}>
            {michael.num} · Geschäftsführung
          </p>

          <div style={{ overflow: "hidden", marginBottom: "0.5rem" }}>
            <h2
              className="team-name-inner font-heading font-bold leading-tight tracking-tight text-white"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
            >
              {michael.name}
            </h2>
          </div>

          <p className="team-subtitle mb-8 font-body text-sm uppercase tracking-[0.18em] text-white/50">
            {michael.title} · {michael.role}
          </p>

          <div className="team-divider mb-8 h-px w-12" style={{ backgroundColor: "#F07040" }} />

          <p className="team-bio mb-10 max-w-md font-body text-sm leading-relaxed text-white/60 md:text-base">
            {michael.bio}
          </p>

          <div className="mb-10 space-y-4">
            {michael.facts.map((f) => (
              <div key={f.label} className="team-fact flex items-baseline gap-4">
                <span className="w-28 shrink-0 font-body text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "#F07040" }}>
                  {f.label}
                </span>
                <span className="font-body text-sm text-white/80">{f.value}</span>
              </div>
            ))}
          </div>

          <a
            href={`mailto:${michael.email}`}
            className="team-email inline-flex items-center gap-2 font-body text-sm text-white/50 transition-colors duration-200 hover:text-white"
          >
            {michael.email} <span style={{ color: "#F07040" }}>→</span>
          </a>
        </div>

        {/* Rechts: Bild */}
        <div className="team-img-wrap h-full w-1/2 bg-[#f0ede8]">
          <img
            src={michael.image}
            alt={michael.name}
            className="h-full w-full object-cover"
            style={{ objectPosition: "30% 15%" }}
          />
        </div>

      </div>
    </div>
  );
}
