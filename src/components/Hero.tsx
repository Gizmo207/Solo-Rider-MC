// Hero.tsx - Cinematic landing section for Solo Riders MC
// This component renders a fullscreen video background, animated club logo, tagline, and CTA button.
// It uses Framer Motion for smooth entrance and hover effects.

"use client";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import BikeScene from "./BikeScene";

/**
 * Hero component for the landing section.
 * Fullscreen layout with background video, club logo, animated text, and CTA.
 */
export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Cinematic video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* 3D Spline Bike Scene Placeholder (can be layered above video if needed) */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        <BikeScene />
      </div>
      {/* UI Layer */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        {/* 🛡️ Club Logo */}
        <img
          src="/logo.svg"
          alt="Solo Riders MC"
          className="w-32 md:w-48 mb-6 animate-pulse drop-shadow-xl"
        />
        {/* 💥 Tagline with entrance animation */}
        <motion.h1
          {...{ className: "text-5xl md:text-7xl font-stencil font-extrabold tracking-wide drop-shadow-2xl mb-6" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          FORGED ON THE THROTTLE
        </motion.h1>
        {/* 🚀 CTA button with hover interaction */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          {...{ className: "mt-8" }}
        >
          <button
            className="px-8 py-4 bg-white text-black text-2xl font-stencil font-bold rounded-full hover:bg-solo-red hover:text-white transition shadow-lg"
            onClick={() => {
              // Smooth scroll to next section on click
              if (typeof window !== "undefined") {
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
              }
            }}
          >
            SEE THE RIDE
          </button>
        </motion.div>
      </div>
      {/* ⬇ Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        <div className="animate-bounce text-white text-4xl drop-shadow-lg">⬇</div>
      </div>
      {/* Overlay for cinematic effect */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-10 pointer-events-none" />
    </section>
  );
}
