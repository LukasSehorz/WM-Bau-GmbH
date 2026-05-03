"use client";

import React from "react";
import liebherrLogo from "../../../assets/logos/liebherr.svg";
import zeppelinLogo from "../../../assets/logos/zeppelin.svg";
import hiltiLogo from "../../../assets/logos/hilti.svg";
import heidelbergLogo from "../../../assets/logos/heidelberg.svg";

const certifications = [
  { label: "ISO 9001", sub: "Qualitätsmanagement" },
  { label: "SCC**", sub: "Arbeitssicherheit" },
  { label: "VOB", sub: "Vergabe & Vertragsordnung" },
  { label: "DGNB", sub: "Nachhaltiges Bauen" },
];

const partners = [
  { label: "PERI", logo: null },
  { label: "Liebherr", logo: liebherrLogo },
  { label: "Zeppelin", logo: zeppelinLogo },
  { label: "Hilti", logo: hiltiLogo },
  { label: "Knauf", logo: null },
  { label: "Heidelberg Materials", logo: heidelbergLogo },
];

export function Layout239_1() {
  return (
    <section className="bg-[#f0f0ef] px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">

        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
            Zertifikate & Partner
          </p>
          <h2
            className="font-heading font-bold leading-tight tracking-tight text-[#0a1020]"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
          >
            Qualität, die man nachweisen kann.
          </h2>
        </div>

        {/* Certifications */}
        <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#0a1020]/40">
          Zertifizierungen
        </p>
        <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {certifications.map((c) => (
            <div
              key={c.label}
              className="flex flex-col items-center justify-center rounded-2xl bg-[#111827] px-6 py-8 text-center"
            >
              <span className="font-heading text-2xl font-bold text-white md:text-3xl">
                {c.label}
              </span>
              <span className="mt-2 font-body text-xs text-white/40 tracking-wide">
                {c.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Partners */}
        <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#0a1020]/40">
          Partner & Lieferanten
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((p) => (
            <div
              key={p.label}
              className="flex items-center justify-center rounded-2xl bg-white px-6"
              style={{ minHeight: "90px" }}
            >
              {p.logo ? (
                <img
                  src={p.logo}
                  alt={p.label}
                  style={{ maxHeight: "40px", width: "auto", maxWidth: "100%", display: "block" }}
                />
              ) : (
                <span className="font-heading text-base font-bold text-[#111827] text-center">
                  {p.label}
                </span>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
