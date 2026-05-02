"use client";

import React from "react";

const services = [
  {
    image: "/images/munich-residential.jpg",
    title: "Hochbau & Neubau",
    body: "Neubau von Wohnanlagen, Mehrfamilienhäusern, Einfamilienhäusern und öffentlichen Gebäuden. Von der Bodenplatte bis zum Dach – alles aus einer Hand.",
  },
  {
    image: "/images/craftsmen-stone-facade.jpg",
    title: "Sanierung & Umbau",
    body: "Modernisierung, Umbau und Erweiterung von Bestandsgebäuden. Wir haben langjährige Erfahrung auch mit denkmalgeschützten Gebäuden und Kirchensanierungen.",
  },
  {
    image: "/images/team-blueprints.jpg",
    title: "Erd- & Kanalbau",
    body: "Tiefbauarbeiten, Erschließungen, Kanal- und Wasserleitungsarbeiten. Jahresrahmenverträge mit Kommunen belegen unsere Verlässlichkeit im Tiefbau.",
  },
  {
    image: "/images/villa-twilight.jpg",
    title: "Ingenieurbau",
    body: "Konstruktiver Bau mit höchsten technischen Anforderungen: Sichtbetonbauwerke, Hochbehälter, Stützkonstruktionen und Spezialtiefbau.",
  },
  {
    image: "/images/interior-oak-concrete.jpg",
    title: "Industrie- & Gewerbebau",
    body: "Produktionshallen, Bürogebäude, Betriebsstätten und gewerbliche Anlagen. Bekannte Referenzen: Firma Seidenader, Raiffeisen Bank, Brauerei Schweiger.",
  },
];

export function Layout239() {
  return (
    <section className="bg-background-primary px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-2xl md:mb-18 lg:mb-20">
          <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
            Unsere Leistungen auf einen Blick
          </p>
          <h2 className="mb-5 font-heading text-4xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl lg:text-6xl whitespace-nowrap">
            Fünf Gewerke. Ein Ansprechpartner.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div key={s.title} className="group flex flex-col">
              <div className="mb-5 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-6 shrink-0 bg-hoser-gold" />
                <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-hoser-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mb-3 font-heading text-xl font-bold leading-tight text-text-primary md:text-2xl">
                {s.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-text-secondary md:text-base">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 md:mt-16">
          <a
            href="/kontakt"
            className="inline-flex items-center bg-hoser-gold px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity duration-200 hover:opacity-85"
          >
            Projekt anfragen
          </a>
          <a
            href="/projekte"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-text-primary transition-colors duration-200 hover:text-hoser-gold"
          >
            Referenzprojekte ansehen
            <span className="text-hoser-gold">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
