"use client";

import React from "react";

const services = [
  {
    image: "/images/munich-residential.jpg",
    num: "01",
    title: "Hochbau & Neubau",
    body: "Neubau von Wohnanlagen, Mehrfamilienhäusern, Einfamilienhäusern und öffentlichen Gebäuden.",
    tags: ["Wohnbau", "Mehrfamilienhäuser", "Öffentliche Bauten"],
  },
  {
    image: "/images/craftsmen-stone-facade.jpg",
    num: "02",
    title: "Sanierung & Umbau",
    body: "Modernisierung und Erweiterung von Bestandsgebäuden – auch denkmalgeschützte Bauwerke.",
    tags: ["Denkmalschutz", "Modernisierung", "Kirchensanierung"],
  },
  {
    image: "/images/team-blueprints.jpg",
    num: "03",
    title: "Erd- & Kanalbau",
    body: "Tiefbauarbeiten, Erschließungen, Kanal- und Wasserleitungsarbeiten für Kommunen und Private.",
    tags: ["Erschließung", "Kanalbau", "Kommunalaufträge"],
  },
  {
    image: "/images/villa-twilight.jpg",
    num: "04",
    title: "Ingenieurbau",
    body: "Konstruktiver Bau mit höchsten technischen Anforderungen: Sichtbeton, Hochbehälter, Stützkonstruktionen.",
    tags: ["Sichtbeton", "Hochbehälter", "Spezialtiefbau"],
  },
  {
    image: "/images/interior-oak-concrete.jpg",
    num: "05",
    title: "Industrie- & Gewerbebau",
    body: "Produktionshallen, Bürogebäude und gewerbliche Anlagen – maßgeschneidert für Ihren Betrieb.",
    tags: ["Produktionshallen", "Bürogebäude", "Betriebsstätten"],
  },
];

export function Layout239() {
  return (
    <section className="bg-[#f0f0ef] px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">

        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
            Unsere Leistungen auf einen Blick
          </p>
          <h2
            className="font-heading font-bold leading-tight tracking-tight text-[#0a1020] whitespace-nowrap"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
          >
            Fünf Gewerke. Ein Ansprechpartner.
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl bg-[#111827]"
            >
              {/* Image */}
              <div className="relative h-36 overflow-hidden md:h-44">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/30 to-transparent" />

                {/* Number top-left */}
                <span className="absolute left-5 top-5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-hoser-gold">
                  {s.num}
                </span>

                {/* Title overlay bottom-left */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
                  <h3 className="font-heading text-base font-bold leading-tight text-white md:text-lg">
                    {s.title}
                  </h3>
                  <span className="text-hoser-gold text-sm">→</span>
                </div>
              </div>

              {/* Bottom panel */}
              <div className="px-4 pb-4 pt-3">
                <p className="mb-3 font-body text-xs leading-relaxed text-white/50">
                  {s.body}
                </p>
                <div className="border-t border-white/8 pt-3 flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 font-body text-[11px] tracking-wide text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-6 md:mt-14">
          <a
            href="/kontakt"
            className="inline-flex items-center bg-hoser-gold px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity duration-200 hover:opacity-85"
          >
            Projekt anfragen
          </a>
          <a
            href="/projekte"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.1em] text-white/50 transition-colors duration-200 hover:text-hoser-gold"
          >
            Referenzprojekte ansehen
            <span className="text-hoser-gold">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
