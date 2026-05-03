"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { gsap } from "../../../utils/gsap";

const FRAME_COUNT = 361;

// Section time ranges — matched to colleague's updated sequence
const TITLE_EVENTS = [
  { start: 0.00, end: 0.18, lines: ["Hochbau",      "& Neubau"],      eyebrow: "Leistung 01", number: "01" },
  { start: 0.20, end: 0.38, lines: ["Erd- &",        "Kanalbau"],      eyebrow: "Leistung 02", number: "02" },
  { start: 0.40, end: 0.58, lines: ["Sanierung",     "& Umbau"],       eyebrow: "Leistung 03", number: "03" },
  { start: 0.60, end: 0.78, lines: ["Ingenieur-",    "bau"],           eyebrow: "Leistung 04", number: "04" },
  { start: 0.80, end: 0.97, lines: ["Industrie- &",  "Gewerbebau"],    eyebrow: "Leistung 05", number: "05" },
];

const SUBTITLE_EVENTS = [
  { start: 0.02, end: 0.10, text: "Fundierte Planung und massive Bauweise." },
  { start: 0.10, end: 0.18, text: "Dein Projekt, Stein für Stein verwirklicht." },
  { start: 0.22, end: 0.30, text: "Millimetergenaue Präzision tief im Erdreich." },
  { start: 0.30, end: 0.38, text: "Sichere Netze und ein stabiles Fundament." },
  { start: 0.42, end: 0.50, text: "Neues Leben für bestehende Strukturen." },
  { start: 0.50, end: 0.58, text: "Energieeffizient und modernisiert für die Zukunft." },
  { start: 0.62, end: 0.70, text: "Komplexe Konstruktionen sicher gemeistert." },
  { start: 0.70, end: 0.78, text: "Tragwerke für höchste Anforderungen." },
  { start: 0.82, end: 0.90, text: "Funktionale Architektur und große Hallen." },
  { start: 0.90, end: 0.97, text: "Gebaut für deinen wirtschaftlichen Erfolg." },
];

export function VideoScrollSection() {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);

  // ── Colleague's improved loading: fetch + createImageBitmap (GPU-decoded) ──
  const bitmapsRef      = useRef(new Array(FRAME_COUNT).fill(null));
  const currentFrameRef = useRef(-1);
  const rafIdRef        = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady]         = useState(false);

  // ── GSAP text refs ────────────────────────────────────────────────────
  const line1Ref       = useRef(null);
  const line2Ref       = useRef(null);
  const eyebrowLineRef = useRef(null);
  const eyebrowTextRef = useRef(null);
  const eyebrowRowRef  = useRef(null);
  const titleBlockRef  = useRef(null);
  const ghostNumberRef = useRef(null);
  const subtitleRef    = useRef(null);
  const progressBarRef = useRef(null);

  // ── Scroll-state tracking ─────────────────────────────────────────────
  const activeTitleRef    = useRef(-1);
  const activeSubtitleRef = useRef(-1);
  const prevScrollRef     = useRef(0);
  const activeTitleDirRef = useRef(-1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── Canvas draw (uses ImageBitmap — zero JS decode overhead) ──────────
  const drawFrame = useCallback((frameIndex) => {
    if (frameIndex === currentFrameRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bitmap = bitmapsRef.current[frameIndex];
    if (!bitmap) return;
    currentFrameRef.current = frameIndex;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth * dpr;
    const h = canvas.clientHeight * dpr;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    const ctx = canvas.getContext("2d", { alpha: false });
    const ca = w / h;
    const ba = bitmap.width / bitmap.height;
    let rw, rh, x, y;
    if (ca > ba) { rw = w; rh = w / ba; x = 0; y = (h - rh) / 2; }
    else { rh = h; rw = h * ba; y = 0; x = (w - rw) / 2; }
    ctx.drawImage(bitmap, x, y, rw, rh);
  }, []);

  // ── Batch loading: 25 frames at a time, sequential so early frames come first ──
  useEffect(() => {
    let loaded = 0;
    const bitmaps = bitmapsRef.current;
    const BATCH = 25;

    const loadFrame = (i) =>
      fetch(`/images/video3-sequence/frame_${String(i).padStart(4, "0")}.jpg`)
        .then(r => r.blob())
        .then(blob => createImageBitmap(blob))
        .then(bitmap => {
          bitmaps[i - 1] = bitmap;
          loaded++;
          setLoadedCount(loaded);
          if (loaded === 1) drawFrame(0);
          if (loaded === FRAME_COUNT) setIsReady(true);
        });

    const loadAll = async () => {
      for (let start = 1; start <= FRAME_COUNT; start += BATCH) {
        const end = Math.min(start + BATCH - 1, FRAME_COUNT);
        await Promise.all(
          Array.from({ length: end - start + 1 }, (_, k) => loadFrame(start + k))
        );
      }
    };
    loadAll();
  }, [drawFrame]);

  // ── GSAP animation helpers ────────────────────────────────────────────
  const enterTitle = (event) => {
    if (ghostNumberRef.current)  ghostNumberRef.current.textContent  = event.number || "";
    if (eyebrowTextRef.current)  eyebrowTextRef.current.textContent  = event.eyebrow;
    if (line1Ref.current)        line1Ref.current.textContent        = event.lines[0] || "";
    if (line2Ref.current)        line2Ref.current.textContent        = event.lines[1] || "";

    gsap.killTweensOf([line1Ref.current, line2Ref.current, eyebrowLineRef.current, eyebrowTextRef.current, ghostNumberRef.current]);

    // Alternate direction per section index
    const idx = TITLE_EVENTS.indexOf(event);
    const dir = idx % 2 === 0 ? -1 : 1; // -1 = from left, 1 = from right
    activeTitleDirRef.current = dir;

    // Reposition block + align text to match entry side
    const fromRight = dir === 1;
    if (titleBlockRef.current) {
      titleBlockRef.current.style.left      = fromRight ? "auto" : "5%";
      titleBlockRef.current.style.right     = fromRight ? "5%"   : "auto";
      titleBlockRef.current.style.textAlign = fromRight ? "right" : "left";
    }
    if (eyebrowRowRef.current) {
      eyebrowRowRef.current.style.flexDirection = fromRight ? "row-reverse" : "row";
    }
    if (ghostNumberRef.current) {
      ghostNumberRef.current.style.left  = fromRight ? "3%"  : "auto";
      ghostNumberRef.current.style.right = fromRight ? "auto" : "3%";
    }

    // "Erd- & Kanalbau" (02) flies in a beat later for dramatic emphasis
    const extraDelay = event.number === "02" ? 0.4 : 0;

    gsap.set([line1Ref.current, line2Ref.current], { x: dir * -90, opacity: 0 });
    gsap.set(eyebrowLineRef.current, { scaleX: 0 });
    gsap.set(eyebrowTextRef.current, { opacity: 0, x: dir * -28 });
    gsap.set(ghostNumberRef.current, { opacity: 0, x: dir * 55 });

    gsap.timeline({ delay: extraDelay })
      .to(eyebrowLineRef.current,  { scaleX: 1, duration: 0.42, ease: "power3.inOut" },                           0)
      .to(eyebrowTextRef.current,  { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" },                      0.12)
      .to(line1Ref.current,        { x: 0, opacity: 1, duration: 0.65, ease: "power3.out" },                      0.18)
      .to(line2Ref.current,        { x: 0, opacity: 1, duration: 0.65, ease: "power3.out" },                      0.32)
      .to(ghostNumberRef.current,  { opacity: event.number ? 0.07 : 0, x: 0, duration: 0.95, ease: "power2.out" }, 0.08);
  };

  const exitTitle = () => {
    const xOut = activeTitleDirRef.current * -80;
    gsap.killTweensOf([line1Ref.current, line2Ref.current, eyebrowLineRef.current, eyebrowTextRef.current, ghostNumberRef.current]);
    gsap.timeline()
      .to([line1Ref.current, line2Ref.current], { x: xOut, opacity: 0, duration: 0.36, ease: "power2.in", stagger: 0.05 }, 0)
      .to(eyebrowTextRef.current,               { opacity: 0, x: xOut * 0.5, duration: 0.25 },                             0)
      .to(eyebrowLineRef.current,               { scaleX: 0, duration: 0.28, ease: "power2.in" },                          0.04)
      .to(ghostNumberRef.current,               { opacity: 0, duration: 0.22 },                                            0);
  };

  const enterSubtitle = (event) => {
    if (!subtitleRef.current) return;
    subtitleRef.current.textContent = event.text;
    gsap.killTweensOf(subtitleRef.current);
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, x: 45 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
    );
  };

  const exitSubtitle = () => {
    if (!subtitleRef.current) return;
    gsap.killTweensOf(subtitleRef.current);
    gsap.to(subtitleRef.current, { opacity: 0, x: -35, duration: 0.3, ease: "power2.in" });
  };

  // ── Scroll driver ─────────────────────────────────────────────────────
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const scrollingDown = latest > prevScrollRef.current;
    prevScrollRef.current = latest;

    // Canvas frame (only once ready)
    if (isReady) {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        drawFrame(Math.floor(Math.max(0, Math.min(0.9999, latest)) * FRAME_COUNT));
      });
    }

    // Progress bar
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${latest})`;
    }

    // Title state machine
    const newTitleIdx = TITLE_EVENTS.findIndex(e => latest >= e.start && latest < e.end);
    if (newTitleIdx !== activeTitleRef.current) {
      if (activeTitleRef.current >= 0) exitTitle();
      activeTitleRef.current = newTitleIdx;
      if (newTitleIdx >= 0) enterTitle(TITLE_EVENTS[newTitleIdx]);
    }

    // Subtitle state machine
    const newSubIdx = SUBTITLE_EVENTS.findIndex(e => latest >= e.start && latest < e.end);
    if (newSubIdx !== activeSubtitleRef.current) {
      if (activeSubtitleRef.current >= 0) exitSubtitle();
      activeSubtitleRef.current = newSubIdx;
      if (newSubIdx >= 0) enterSubtitle(SUBTITLE_EVENTS[newSubIdx]);
    }
  });

  // ── Init + resize ─────────────────────────────────────────────────────
  useEffect(() => {
    gsap.set([line1Ref.current, line2Ref.current], { x: -90, opacity: 0 });
    gsap.set(eyebrowLineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set([eyebrowTextRef.current, ghostNumberRef.current, subtitleRef.current], { opacity: 0 });

    const handleResize = () => {
      if (!canvasRef.current) return;
      currentFrameRef.current = -1;
      const idx = Math.floor(Math.max(0, Math.min(0.9999, scrollYProgress.get())) * FRAME_COUNT);
      drawFrame(idx);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [scrollYProgress, drawFrame]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#040D1C]" style={{ height: "1100vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Atmospheric gradient */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(4,13,28,0.65) 0%, rgba(4,13,28,0.1) 45%, rgba(4,13,28,0.2) 100%)",
          }}
        />

        {/* Vignette */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.45) 100%)" }}
        />

        {/* Ghost section number */}
        <div
          ref={ghostNumberRef}
          className="pointer-events-none absolute bottom-[6%] right-[3%] font-heading font-bold leading-none text-white select-none z-20"
          style={{ fontSize: "clamp(10rem, 24vw, 28rem)", letterSpacing: "-0.04em", opacity: 0 }}
          aria-hidden="true"
        />

        {/* ── Title block — repositions dynamically left/right ── */}
        <div
          ref={titleBlockRef}
          className="pointer-events-none absolute bottom-[11%] z-30"
          style={{ left: "5%" }}
        >
          <div ref={eyebrowRowRef} className="mb-5 flex items-center gap-4">
            <span ref={eyebrowLineRef} className="block h-px bg-hoser-gold" style={{ width: "2.2rem" }} />
            <span ref={eyebrowTextRef} className="font-body text-xs font-semibold uppercase tracking-[0.32em] text-hoser-gold" />
          </div>

          <div
            ref={line1Ref}
            className="font-heading font-bold leading-[0.9] tracking-tight text-white"
            style={{
              fontSize: "clamp(4rem, 9vw, 10.5rem)",
              textShadow: "0 4px 60px rgba(0,0,0,0.98), 0 2px 16px rgba(0,0,0,0.9)",
              paddingBottom: "0.04em",
            }}
          />
          <div
            ref={line2Ref}
            className="font-heading font-bold leading-[0.9] tracking-tight text-white"
            style={{
              fontSize: "clamp(4rem, 9vw, 10.5rem)",
              textShadow: "0 4px 60px rgba(0,0,0,0.98), 0 2px 16px rgba(0,0,0,0.9)",
              paddingBottom: "0.04em",
            }}
          />
        </div>

        {/* Subtitle */}
        <div className="pointer-events-none absolute top-[9%] right-[5%] md:right-[7%] z-30 max-w-[360px] text-right">
          <p
            ref={subtitleRef}
            className="font-body text-xl leading-relaxed text-white/90 md:text-2xl"
            style={{ textShadow: "0 2px 28px rgba(0,0,0,0.98), 0 1px 8px rgba(0,0,0,0.9)" }}
          />
        </div>

        {/* Progress bar */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-40 h-[2px] w-full bg-white/8">
          <div
            ref={progressBarRef}
            className="h-full bg-hoser-gold"
            style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
          />
        </div>

        {/* Grain */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08] mix-blend-overlay z-20" xmlns="http://www.w3.org/2000/svg">
          <filter id="vss-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#vss-grain)" />
        </svg>

        {/* Loading screen */}
        {!isReady && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#040D1C]">
            <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-white/40">Wird geladen</p>
            <div className="h-px w-48 bg-white/10">
              <div
                className="h-full bg-hoser-gold transition-all duration-300"
                style={{ width: `${Math.round((loadedCount / FRAME_COUNT) * 100)}%` }}
              />
            </div>
            <p className="mt-3 font-body text-xs text-white/25">{Math.round((loadedCount / FRAME_COUNT) * 100)}%</p>
          </div>
        )}

      </div>
    </section>
  );
}
