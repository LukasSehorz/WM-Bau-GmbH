"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

const georg = {
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

const claudia = {
  num: "02",
  name: "Claudia Härtl",
  title: "Büroleitung",
  role: "Prokuristin",
  image: "/images/claudia-haertl-ki.png",
  email: "info@bauunternehmen-haertl.de",
  bio: "Claudia Härtl verantwortet die kaufmännische Führung des Unternehmens und sorgt mit ihrem Organisationstalent für reibungslose Abläufe – von der Angebotserstellung bis zur Projektabrechnung.",
  facts: [
    { label: "Bereich", value: "Kaufmännische Leitung" },
    { label: "Schwerpunkt", value: "Organisation & Verwaltung" },
    { label: "Im Betrieb", value: "Seit 2007" },
  ],
};

function Panel({ person, prefix }) {
  return (
    <div
      className="flex flex-shrink-0"
      style={{ width: "100vw", height: "100vh", backgroundColor: "#0A1628" }}
    >
      <div className="flex h-full w-1/2 flex-col justify-center px-12 md:px-16 lg:px-20">
        <p
          className={`${prefix}-eyebrow mb-5 font-body text-xs font-semibold uppercase tracking-[0.32em]`}
          style={{ color: "#F07040" }}
        >
          {person.num} · Geschäftsführung
        </p>

        <div style={{ overflow: "hidden", marginBottom: "0.5rem" }}>
          <h2
            className={`${prefix}-name-inner font-heading font-bold leading-tight tracking-tight text-white`}
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
          >
            {person.name}
          </h2>
        </div>

        <p className={`${prefix}-subtitle mb-8 font-body text-sm uppercase tracking-[0.18em] text-white/50`}>
          {person.title} · {person.role}
        </p>

        <div className={`${prefix}-divider mb-8 h-px w-12`} style={{ backgroundColor: "#F07040" }} />

        <p className={`${prefix}-bio mb-10 max-w-md font-body text-sm leading-relaxed text-white/60 md:text-base`}>
          {person.bio}
        </p>

        <div className="mb-10 space-y-4">
          {person.facts.map((f) => (
            <div key={f.label} className={`${prefix}-fact flex items-baseline gap-4`}>
              <span
                className="w-28 shrink-0 font-body text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: "#F07040" }}
              >
                {f.label}
              </span>
              <span className="font-body text-sm text-white/80">{f.value}</span>
            </div>
          ))}
        </div>

        <a
          href={`mailto:${person.email}`}
          className={`${prefix}-email inline-flex items-center gap-2 font-body text-sm text-white/50 transition-colors duration-200 hover:text-white`}
        >
          {person.email} <span style={{ color: "#F07040" }}>→</span>
        </a>
      </div>

      <div className={`${prefix}-img-wrap h-full w-1/2 bg-[#f0ede8]`}>
        <img
          src={person.image}
          alt={person.name}
          className="h-full w-full object-cover"
          style={{ objectPosition: "30% 15%" }}
        />
      </div>
    </div>
  );
}

export function TeamSection() {
  const wrapperRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const strip = stripRef.current;
    if (!wrapper || !strip) return;

    const ctx = gsap.context(() => {
      // Georg entry animation on first scroll into view
      const georgTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      georgTl
        .fromTo(".georg-img-wrap",
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power2.inOut" },
          0
        )
        .fromTo(".georg-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.2)
        .fromTo(".georg-name-inner", { y: "105%" }, { y: "0%", duration: 0.85 }, 0.35)
        .fromTo(".georg-subtitle", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 0.55)
        .fromTo(".georg-divider", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.6 }, 0.65)
        .fromTo(".georg-bio", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.75)
        .fromTo(".georg-fact", { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 }, 0.9)
        .fromTo(".georg-email", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, 1.2);

      // Pre-hide Claudia elements so they don't flash as panel slides in
      gsap.set(".claudia-img-wrap", { clipPath: "inset(0 100% 0 0)" });
      gsap.set(".claudia-eyebrow", { opacity: 0, y: 20 });
      gsap.set(".claudia-name-inner", { y: "105%" });
      gsap.set(".claudia-subtitle", { opacity: 0, y: 16 });
      gsap.set(".claudia-divider", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".claudia-bio", { opacity: 0, y: 22 });
      gsap.set(".claudia-fact", { opacity: 0, y: 16 });
      gsap.set(".claudia-email", { opacity: 0, y: 10 });

      // Horizontal scroll: pin wrapper, slide strip left by one viewport width
      let claudiaAnimated = false;

      gsap.to(strip, {
        x: () => -window.innerWidth,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          end: () => "+=" + window.innerWidth,
          onUpdate: (self) => {
            // Trigger Claudia entry animations when ~80% through the horizontal slide
            if (self.progress >= 0.8 && !claudiaAnimated) {
              claudiaAnimated = true;
              gsap.timeline({ defaults: { ease: "power3.out" } })
                .fromTo(".claudia-img-wrap",
                  { clipPath: "inset(0 100% 0 0)" },
                  { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power2.inOut" },
                  0
                )
                .fromTo(".claudia-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.2)
                .fromTo(".claudia-name-inner", { y: "105%" }, { y: "0%", duration: 0.85 }, 0.35)
                .fromTo(".claudia-subtitle", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 0.55)
                .fromTo(".claudia-divider",
                  { scaleX: 0, transformOrigin: "left center" },
                  { scaleX: 1, duration: 0.6 },
                  0.65
                )
                .fromTo(".claudia-bio", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.75)
                .fromTo(".claudia-fact", { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 }, 0.9)
                .fromTo(".claudia-email", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, 1.2);
            }
          },
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} style={{ overflow: "hidden", backgroundColor: "#0A1628" }}>
      <div ref={stripRef} style={{ display: "flex", width: "200vw" }}>
        <Panel person={georg} prefix="georg" />
        <Panel person={claudia} prefix="claudia" />
      </div>
    </div>
  );
}
