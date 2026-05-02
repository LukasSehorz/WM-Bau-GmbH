"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const claudia = {
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
};

const josef = {
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
};

function TextPanel({ person }) {
  return (
    <div className="flex h-full flex-col justify-center px-12 md:px-16 lg:px-20">
      <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em] text-hoser-gold">
        {person.num} · Geschäftsführung
      </p>
      <h2
        className="mb-2 font-heading font-bold leading-tight tracking-tight text-white"
        style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
      >
        {person.name}
      </h2>
      <p className="mb-8 font-body text-sm uppercase tracking-[0.15em] text-white/40">
        {person.title} · {person.role}
      </p>
      <div className="mb-8 h-px w-12 bg-hoser-gold/50" />
      <p className="mb-10 max-w-md font-body text-sm leading-relaxed text-white/55 md:text-base">
        {person.bio}
      </p>
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
  );
}

export function TeamSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animations-Timeline (kein blasses Ausblenden mehr, stattdessen elegantes Sliden):
  // 0.00 - 0.15: Claudia ist voll sichtbar
  // 0.15 - 0.35: Claudia slidet nach außen aus dem Bild
  // 0.35 - 0.65: Das helle Panel rutscht von rechts nach links
  // 0.65 - 0.85: Josef slidet von außen ins Bild
  // 0.85 - 1.00: Josef ist voll sichtbar

  // Claudia slidet aus dem Bild (Text nach links, Bild nach rechts)
  const claudiaTextX = useTransform(scrollYProgress, [0.15, 0.35], ["0%", "-100%"]);
  const claudiaImageX = useTransform(scrollYProgress, [0.15, 0.35], ["0%", "100%"]);

  // Hintergrund-Panel wechselt die Seite
  const lightPanelX = useTransform(scrollYProgress, [0.35, 0.65], ["100%", "0%"]);

  // Josef slidet ins Bild (Bild von links, Text von rechts)
  const josefImageX = useTransform(scrollYProgress, [0.65, 0.85], ["-100%", "0%"]);
  const josefTextX = useTransform(scrollYProgress, [0.65, 0.85], ["100%", "0%"]);

  return (
    <div ref={containerRef} style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#040D1C]">

        {/* ── Der bewegliche helle Hintergrund (für die Bilder) ── */}
        <motion.div 
          className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#f0ede8]"
          style={{ x: lightPanelX, willChange: "transform" }}
        />

        {/* ── Phase 1: Claudia — Text Links, Bild Rechts ── */}
        <div className="absolute inset-0 flex pointer-events-none overflow-hidden">
          {/* Links: Dunkler Text */}
          <motion.div 
            className="flex h-full w-1/2 bg-transparent pointer-events-auto"
            style={{ x: claudiaTextX, willChange: "transform" }}
          >
            <TextPanel person={claudia} />
          </motion.div>
          {/* Rechts: Helles Bild */}
          <motion.div 
            className="flex h-full w-1/2 items-end justify-center bg-transparent pointer-events-auto"
            style={{ x: claudiaImageX, willChange: "transform" }}
          >
            <img
              src={claudia.image}
              alt={claudia.name}
              className="h-full w-full object-cover"
              style={{ objectPosition: "50% 15%" }}
            />
          </motion.div>
        </div>

        {/* ── Phase 2: Josef — Bild Links, Text Rechts ── */}
        <div className="absolute inset-0 flex pointer-events-none overflow-hidden">
          {/* Links: Helles Bild */}
          <motion.div 
            className="flex h-full w-1/2 items-end justify-center bg-transparent pointer-events-auto"
            style={{ x: josefImageX, willChange: "transform" }}
          >
            <img
              src={josef.image}
              alt={josef.name}
              className="h-full w-full object-cover"
              style={{ objectPosition: "30% 15%" }}
            />
          </motion.div>
          {/* Rechts: Dunkler Text */}
          <motion.div 
            className="flex h-full w-1/2 bg-transparent pointer-events-auto"
            style={{ x: josefTextX, willChange: "transform" }}
          >
            <TextPanel person={josef} />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
