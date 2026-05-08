"use client";

import React from "react";

export function Header69() {
  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container relative z-10 max-w-2xl">
        <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
          Über uns
        </p>
        <h1
          className="mb-5 font-heading font-bold leading-[1.05] tracking-tight text-white"
          style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)" }}
        >
          Drei Generationen.<br />Ein Name.
        </h1>
        <p className="font-body text-base leading-relaxed text-white/65 md:text-lg">
          Seit 1952 bauen wir im Raum Erding, Erding und München-Ost.
          Was als kleine Maurerfirma begann, ist heute ein leistungsstarkes
          Bauunternehmen – mit eigenem Fachpersonal, moderner Technik und
          dem Anspruch, Qualität zu liefern, die Generationen überdauert.
        </p>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="/images/villa-twilight.jpg"
          className="size-full object-cover"
          alt="Baugeschäft GmbH Georg Härtl"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
      </div>
    </section>
  );
}
