// Hero.tsx - Cinematic landing section for Solo Riders MC
// This component renders a fullscreen video background, animated club logo, tagline, and CTA button.
// It uses Framer Motion for smooth entrance and hover effects.

"use client";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

/**
 * Hero component for the landing section.
 * Fullscreen layout with background video, club logo, animated text, and CTA.
 */
export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* 🎥 Background video loop */}
      <video
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        src="/bg.mp4"
      />
      {/* 🧱 Content Layer (logo, title, CTA) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        {/* 🛡️ Club Logo */}
        <img
          src="/logo.svg"
          alt="Solo Riders MC"
          className="w-32 md:w-48 mb-6 animate-pulse"
        />
        {/* 💥 Tagline with entrance animation */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          FORGED ON THE THROTTLE
        </motion.h1>
        {/* 🚀 CTA button with hover interaction */}
        <motion.button
          className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded hover:bg-red-600 transition"
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            // Smooth scroll to next section on click
            if (typeof window !== "undefined") {
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            }
          }}
        >
          SEE THE RIDE
        </motion.button>
      </div>
      {/* ⬇ Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce text-white text-2xl">⬇</div>
      </div>
    </section>
  );
}
