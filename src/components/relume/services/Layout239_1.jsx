"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout239_1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <p className="mb-3 font-semibold md:mb-4">Prozess</p>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Von der ersten Besprechung bis zur Schlüsselübergabe
              </h2>
              <p className="md:text-md">
                Jedes Projekt folgt demselben strukturierten Ablauf. Wir hören
                zuerst zu, planen sorgfältig, bauen mit Präzision und übergeben
                mit Sorgfalt. Termine werden schriftlich festgehalten und eingehalten.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col items-center text-center">
              <div className="rb-6 mb-6 md:mb-8">
                <img
                  src="/images/hero-aerial-construction.jpg"
                  alt="Relume placeholder image"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Erstgespräch und Grundstücksbesichtigung
              </h3>
              <p>
                Wir nehmen uns Zeit für Ihre Wünsche, besichtigen das Grundstück
                und klären gemeinsam, was möglich ist.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="rb-6 mb-6 md:mb-8">
                <img
                  src="/images/villa-twilight.jpg"
                  alt="Relume placeholder image"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Planung, Genehmigung und Festpreisangebot
              </h3>
              <p>Detaillierte Pläne, Einreichung aller Genehmigungen, Kosten schriftlich fixiert.</p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="rb-6 mb-6 md:mb-8">
                <img
                  src="/images/team-blueprints.jpg"
                  alt="Relume placeholder image"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Bauausführung und regelmäßige Fortschrittsberichte
              </h3>
              <p>
                Termingerechte Umsetzung mit wöchentlichen Berichten und
                vollständiger Transparenz.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
            <Button variant="secondary">Anfragen</Button>
            <Button iconRight={<RxChevronRight />} variant="link" size="link">
              Projekte ansehen
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
