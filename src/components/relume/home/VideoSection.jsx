"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../../../utils/gsap";

export function VideoSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  // Auto-play/pause based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.currentTime = 0;
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // GSAP: reveal text and gold line on scroll entry
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each text line: mask reveal (slides up through overflow:hidden wrapper)
      gsap.from(".vs-line-inner", {
        y: "115%",
        stagger: 0.18,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Gold divider line extends from center outward
      gsap.from(".vs-divider", {
        scaleX: 0,
        transformOrigin: "center center",
        duration: 1.0,
        ease: "power3.inOut",
        delay: 0.55,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Subtle parallax on the video background
      gsap.to(".vs-video", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ height: "80vh" }}>
      {/* Video Hintergrund */}
      <video
        ref={videoRef}
        src="/videos/video2.mp4"
        muted
        playsInline
        className="vs-video absolute inset-0 h-full w-full object-cover"
        style={{ willChange: "transform" }}
      />

      {/* Dunkles Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Text — vertikal zentriert */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-[5%] text-center">
        <div
          className="flex flex-col items-center gap-3 font-serif leading-[1.25] text-white"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 4rem)",
            textShadow: "0 2px 40px rgba(0,0,0,0.8), 0 1px 8px rgba(0,0,0,0.9)",
          }}
        >
          {/* Line 1 – mask reveal wrapper */}
          <div style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
            <span className="vs-line-inner block">
              Von der{" "}
              <strong
                className="font-bold"
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#C8962E",
                  textUnderlineOffset: "6px",
                  textDecorationThickness: "2px",
                }}
              >
                Bauskizze auf dem Schreibtisch
              </strong>
            </span>
          </div>

          {/* Line 2 – mask reveal wrapper */}
          <div style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
            <span className="vs-line-inner block">
              bis zum{" "}
              <strong
                className="font-bold"
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#C8962E",
                  textUnderlineOffset: "6px",
                  textDecorationThickness: "2px",
                }}
              >
                fertigen Gebäude.
              </strong>
            </span>
          </div>
        </div>

        {/* Goldene Trennlinie */}
        <div className="vs-divider mt-8 h-px w-16 bg-hoser-gold opacity-80" />
      </div>
    </section>
  );
}
