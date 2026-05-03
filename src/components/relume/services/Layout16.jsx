"use client";

import React from "react";

const points = [
  "Eigenes, ausgebildetes Fachpersonal – kein Rückgriff auf Werklohnfirmen",
  "Umfangreicher Maschinen- und Fuhrpark für alle Gewerke",
  "Direkte Kommunikation mit der Geschäftsführung",
];

export function Layout16() {
  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28 overflow-hidden">
      {/* Background video */}
      <video
        src="/videos/video5.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

      {/* Content */}
      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
              Warum Hoser
            </p>
            <h2 className="mb-5 font-heading text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Kompetenz und Terminsicherheit – garantiert.
            </h2>
            <p className="mb-6 font-body text-base leading-relaxed text-white/90 md:text-lg">
              Durch geschultes Personal, neueste Technik und einen umfangreichen
              Maschinenpark bieten wir Ihnen ein Know-how, das Kompetenz und
              Terminsicherheit garantiert. Hoher Qualitätsstandard der verarbeiteten
              Materialien und erfahrene Fachkräfte bürgen für zuverlässige Ausführung.
            </p>
            <ul className="mb-8 space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 font-body text-sm text-white/90 md:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hoser-gold" />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 border border-white/60 px-7 py-3 font-body text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:border-hoser-gold hover:text-hoser-gold"
            >
              Projekt besprechen
              <span className="text-hoser-gold">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
