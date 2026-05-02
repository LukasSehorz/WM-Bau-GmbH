"use client";

import React from "react";

const team = [
  {
    name: "Claudia Hoser",
    title: "Dipl. Ingenieurin (FH)",
    role: "Geschäftsführerin",
    image: "/images/claudia-hoser.jpg",
    email: "claudia.hoser@hoser-bauunternehmung.de",
    align: "left",
  },
  {
    name: "Josef Lippacher",
    title: "Dipl. Ingenieur (FH)",
    role: "Geschäftsführer",
    image: "/images/josef-lippacher.jpg",
    email: "josef.lippacher@hoser-bauunternehmung.de",
    align: "right",
  },
];

const EASE = [0.76, 0, 0.24, 1];

export function TeamSection() {
  return (
    <section
      style={{ background: "linear-gradient(160deg, #040D1C 0%, #071428 60%, #050F22 100%)" }}
    >
      {/* Subtle grid */}
      <div
        className="pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      >
        {/* Heading */}
        <div className="container px-[5%] pt-16 pb-14 md:pt-24 md:pb-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
                Geschäftsführung
              </p>
              <h2
                className="font-heading font-bold leading-[1.05] tracking-tight text-white"
                style={{ fontSize: "clamp(2.2rem, 4vw, 4rem)" }}
              >
                Die dritte Generation.
              </h2>
            </div>
            <div className="flex items-end">
              <p className="font-body text-base leading-relaxed text-white/45 md:text-lg">
                Was Michael Hoser 1952 als Maurerbetrieb begann, führen
                Claudia Hoser und Josef Lippacher heute weiter. Beide sind
                ausgebildete Ingenieure und stehen persönlich für jedes
                Projekt ein – von der ersten Besprechung bis zur Übergabe.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gold top line */}
      <div className="h-px bg-gradient-to-r from-transparent via-hoser-gold/40 to-transparent" />

      {/* Full-bleed panels */}
      <div
        className="flex flex-col md:flex-row"
        style={{ height: "clamp(460px, 72vh, 820px)" }}
      >
        {team.map((person, i) => (
          <div
            key={person.name}
            className="group relative flex-1 overflow-hidden"
            style={{ background: "#040D1C" }}
          >
            {/* Photo — object-contain so no cropping */}
            <img
              src={person.image}
              alt={person.name}
              className="absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              style={{
                objectFit: "cover",
                objectPosition: "center 20%",
              }}
            />

            {/* Bottom gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040D1C]/95 via-[#040D1C]/20 to-transparent" />

            {/* Outer edge vignette */}
            <div
              className="absolute inset-0"
              style={{
                background: i === 0
                  ? "linear-gradient(to right, #040D1C 0%, transparent 25%, transparent 100%)"
                  : "linear-gradient(to left, #040D1C 0%, transparent 25%, transparent 100%)",
              }}
            />

            {/* Vertical separator */}
            {i === 0 && (
              <div className="absolute right-0 top-0 bottom-0 hidden w-px bg-hoser-gold/20 md:block" />
            )}

            {/* Info */}
            <div
              className={`absolute bottom-0 p-8 md:p-12 ${
                person.align === "left" ? "left-0" : "right-0 text-right"
              }`}
            >
              <div
                className={`mb-3 h-px w-8 bg-hoser-gold ${
                  person.align === "right" ? "ml-auto" : ""
                }`}
              />
              <p className="mb-1 font-body text-xs font-semibold uppercase tracking-[0.2em] text-hoser-gold">
                {person.title} · {person.role}
              </p>
              <h3
                className="font-heading font-bold tracking-tight text-white"
                style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)" }}
              >
                {person.name}
              </h3>
              <a
                href={`mailto:${person.email}`}
                className="mt-2 inline-block font-body text-xs text-white/30 transition-colors duration-200 hover:text-hoser-gold"
              >
                {person.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
