"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const people = [
  {
    num: "01",
    name: "Claudia Hoser",
    title: "Dipl. Ingenieurin (FH)",
    role: "Geschäftsführerin",
    image: "/images/claudia-detail.jpg",
    email: "claudia.hoser@hoser-bauunternehmung.de",
    bio: "Als Tochter von Manfred Hoser steht Claudia für die Kontinuität eines Familienunternehmens, das seit 1952 in Markt Schwaben verwurzelt ist. Mit ihrem Studium der Bauingenieurwissenschaften und jahrelanger Praxiserfahrung verantwortet sie heute die gesamte Projektleitung.",
    facts: [
      { label: "Generation", value: "3. Hoser-Geschäftsführung" },
      { label: "Schwerpunkt", value: "Hochbau & Wohnungsbau" },
      { label: "Studium", value: "Bauingenieurwesen (FH)" },
    ],
  },
  {
    num: "02",
    name: "Josef Lippacher",
    title: "Dipl. Ingenieur (FH)",
    role: "Geschäftsführer",
    image: "/images/josef-detail.jpg",
    email: "josef.lippacher@hoser-bauunternehmung.de",
    bio: "Josef Lippacher bringt fundiertes Ingenieurwissen und operative Stärke in die Geschäftsführung. Er verantwortet Kalkulation, Tiefbau und die termingerechte Abwicklung aller Bauprojekte – mit dem Anspruch, jedes Vorhaben im Zeit- und Budgetrahmen zu realisieren.",
    facts: [
      { label: "Schwerpunkt", value: "Tiefbau & Gewerbebau" },
      { label: "Stärke", value: "Kalkulation & Projektsteuerung" },
      { label: "Studium", value: "Bauingenieurwesen (FH)" },
    ],
  },
];

function PersonDetail({ person }) {
  return (
    <div className="flex h-full w-full">
      {/* Left: portrait */}
      <div className="relative h-full w-[45%] flex-shrink-0 overflow-hidden">
        <img
          src={person.image}
          alt={person.name}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 15%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#040D1C]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040D1C]/60 via-transparent to-transparent" />
      </div>

      {/* Right: facts */}
      <div className="flex flex-1 flex-col justify-center px-12 md:px-16 lg:px-20">
        <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em] text-hoser-gold">
          {person.num} · Geschäftsführung
        </p>
        <h2
          className="mb-2 font-heading font-bold leading-tight tracking-tight text-white"
          style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
        >
          {person.name}
        </h2>
        <p className="mb-8 font-body text-sm text-white/40 uppercase tracking-[0.15em]">
          {person.title} · {person.role}
        </p>

        <div className="mb-8 h-px w-12 bg-hoser-gold/50" />

        <p className="mb-10 max-w-md font-body text-sm leading-relaxed text-white/55 md:text-base">
          {person.bio}
        </p>

        {/* Fact list */}
        <div className="mb-10 space-y-4">
          {person.facts.map((f) => (
            <div key={f.label} className="flex items-baseline gap-4">
              <span className="w-28 shrink-0 font-body text-xs font-semibold uppercase tracking-[0.15em] text-hoser-gold/70">
                {f.label}
              </span>
              <span className="font-body text-sm text-white/70">{f.value}</span>
            </div>
          ))}
        </div>

        <a
          href={`mailto:${person.email}`}
          className="inline-flex items-center gap-2 font-body text-xs text-white/30 transition-colors duration-200 hover:text-hoser-gold"
        >
          {person.email}
        </a>
      </div>
    </div>
  );
}

export function TeamSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Overview: 0.00 → 0.28 stable, 0.28 → 0.44 fade out
  const bothOpacity = useTransform(scrollYProgress, [0.22, 0.42], [1, 0]);
  const bothScale   = useTransform(scrollYProgress, [0.22, 0.44], [1, 1.10]);
  const labelsOpacity = useTransform(scrollYProgress, [0, 0.14, 0.26], [1, 1, 0]);

  // ── Claudia: 0.30 → 0.46 fade in, 0.58 → 0.70 fade out
  const claudiaOpacity = useTransform(
    scrollYProgress, [0.30, 0.46, 0.58, 0.70], [0, 1, 1, 0]
  );

  // ── Josef: 0.62 → 0.78 fade in, stable to 1.0
  const josefOpacity = useTransform(
    scrollYProgress, [0.62, 0.78], [0, 1]
  );

  // ── Progress indicator
  const dot1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.62, 0.72], [0.3, 1, 1, 0.3]);
  const dot2Opacity = useTransform(scrollYProgress, [0.62, 0.78], [0.3, 1]);

  return (
    <div ref={containerRef} style={{ height: "320vh" }}>
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #040D1C 0%, #071428 60%, #050F22 100%)",
        }}
      >

        {/* ── Phase 1: Both overview ── */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: bothOpacity, scale: bothScale }}
        >
          <img
            src="/images/team-group.jpg"
            alt="Claudia Hoser und Josef Lippacher"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 20%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040D1C]/85 via-[#040D1C]/25 to-[#040D1C]/10" />

          {/* Heading */}
          <motion.div
            className="absolute left-[5%] top-12 md:top-16"
            style={{ opacity: labelsOpacity }}
          >
            <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.3em] text-hoser-gold">
              Geschäftsführung
            </p>
            <h2
              className="font-heading font-bold leading-tight text-white"
              style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)" }}
            >
              Die dritte Generation.
            </h2>
          </motion.div>

          {/* Person labels bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 flex"
            style={{ opacity: labelsOpacity }}
          >
            {people.map((p, i) => (
              <div
                key={p.name}
                className="flex flex-1 flex-col justify-end p-8 md:p-14"
                style={{ alignItems: i === 1 ? "flex-end" : "flex-start" }}
              >
                <p className="mb-1 font-body text-xs font-semibold uppercase tracking-[0.25em] text-hoser-gold">
                  {p.num}
                </p>
                <h3
                  className="font-heading font-bold text-white"
                  style={{ fontSize: "clamp(1.4rem, 2.2vw, 2.2rem)" }}
                >
                  {p.name}
                </h3>
                <p className="mt-1 font-body text-xs text-white/40 uppercase tracking-[0.15em]">
                  {p.role}
                </p>
                <div className="mt-5 flex items-center gap-2 text-white/25">
                  <span className="font-body text-[10px] uppercase tracking-[0.2em]">Scrollen</span>
                  <span className="text-hoser-gold text-xs">↓</span>
                </div>
              </div>
            ))}
            {/* Divider */}
            <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/8" />
          </motion.div>
        </motion.div>

        {/* ── Phase 2: Claudia detail ── */}
        <motion.div className="absolute inset-0" style={{ opacity: claudiaOpacity }}>
          <PersonDetail person={people[0]} />
        </motion.div>

        {/* ── Phase 3: Josef detail ── */}
        <motion.div className="absolute inset-0" style={{ opacity: josefOpacity }}>
          <PersonDetail person={people[1]} />
        </motion.div>

        {/* ── Progress dots ── */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
          <motion.div
            className="h-px bg-hoser-gold"
            style={{ width: 24, opacity: dot1Opacity }}
          />
          <motion.div
            className="h-px bg-hoser-gold"
            style={{ width: 24, opacity: dot2Opacity }}
          />
        </div>

      </div>
    </div>
  );
}
