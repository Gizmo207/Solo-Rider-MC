// Hero.tsx - Cinematic landing section for Solo Riders MC
// This component renders a fullscreen video background, animated club logo, tagline, and CTA button.
// It uses Framer Motion for smooth entrance and hover effects.

"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import styles from "./Hero.module.css";
import BikeScene from "./BikeScene";

// List your video filenames here
const videoFiles = ["bg.mp4", "bg2.mp4", "bg3.mp4"];

/**
 * Hero component for the landing section.
 * Fullscreen layout with background video, club logo, animated text, and CTA.
 */
export default function Hero() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // When video ends, go to next video (loop at end)
  const handleEnded = () => {
    setCurrentVideo((prev) => (prev + 1) % videoFiles.length);
  };

  // Remove event listener logic; rely on onEnded prop for reliability

  // If you want to auto-play next video after a fixed time (e.g., 10s), uncomment below:
  // useEffect(() => {
  //   const timer = setTimeout(() => handleEnded(), 10000);
  //   return () => clearTimeout(timer);
  // }, [currentVideo]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Cinematic video background */}
      <video
        key={videoFiles[currentVideo]}
        ref={videoRef}
        autoPlay
        muted
        loop={false}
        playsInline
        onEnded={handleEnded}
        className="absolute inset-0 object-cover object-[center_70%] w-full h-full opacity-100 z-0 hero-video-bright"
      >
        <source src={`/${videoFiles[currentVideo]}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <BikeScene /> Temporarily commented out to test video visibility */}
      {/* UI Layer */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        {/* Club Logo removed as requested */}
        {/* 💥 Tagline with entrance animation */}
        <AnimatedHeroText />
      </div>
      {/* ⬇ Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        <div className="animate-bounce text-white text-4xl drop-shadow-lg">⬇</div>
      </div>
      {/* Overlay removed for maximum video brightness */}
    </section>
  );
}

// AnimatedHeroText: handles the fade in/out sequence for hero titles
function AnimatedHeroText() {
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowTitle(false), 4500); // Extended to 4.5s for title
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
      {/* First Title - FORGED ON THE THROTTLE with enhanced styling */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ 
          opacity: showTitle ? 1 : 0, 
          y: showTitle ? 0 : -50, 
          scale: showTitle ? 1 : 0.8 
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <span
          className="text-6xl md:text-8xl lg:text-9xl font-stencil font-extrabold tracking-wider mb-8
                   bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent
                   drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] 
                   [text-shadow:_0_0_20px_rgb(255_255_255_/_80%),_0_0_40px_rgb(255_255_255_/_40%)]"
        >
          FORGED ON THE THROTTLE
        </span>
      </motion.div>

      {/* Second Title - LIVE FREE RIDE SOLO with massive sizing and glow effects */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ 
          opacity: showTitle ? 0 : 1, 
          y: showTitle ? 50 : 0, 
          scale: showTitle ? 0.9 : 1 
        }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        className="w-full flex flex-col items-center space-y-4"
      >
        {/* LIVE FREE */}
        <motion.span 
          animate={{ 
            textShadow: [
              "0 0 15px rgb(255 255 255 / 90%), 0 0 30px rgb(255 255 255 / 50%)",
              "0 0 20px rgb(255 255 255 / 100%), 0 0 40px rgb(255 255 255 / 70%)",
              "0 0 15px rgb(255 255 255 / 90%), 0 0 30px rgb(255 255 255 / 50%)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-stencil font-bold 
                     bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent
                     drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]
                     [text-shadow:_0_0_15px_rgb(255_255_255_/_90%),_0_0_30px_rgb(255_255_255_/_50%)]
                     tracking-widest">
            LIVE FREE
          </span>
        </motion.span>

        {/* RIDE SOLO */}
        <div className="flex items-center space-x-4">
          <span className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-stencil font-extrabold 
                          bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent
                          drop-shadow-[0_0_30px_rgba(255,255,255,0.9)]
                          [text-shadow:_0_0_20px_rgb(255_255_255_/_90%),_0_0_40px_rgb(255_255_255_/_60%)]
                          tracking-widest">
            RIDE
          </span>
          <motion.span 
            animate={{ 
              textShadow: [
                "0 0 25px rgb(239 68 68 / 90%), 0 0 50px rgb(239 68 68 / 60%)",
                "0 0 35px rgb(239 68 68 / 100%), 0 0 70px rgb(239 68 68 / 80%)",
                "0 0 25px rgb(239 68 68 / 90%), 0 0 50px rgb(239 68 68 / 60%)"
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-stencil font-extrabold 
                       bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent
                       drop-shadow-[0_0_35px_rgba(239,68,68,0.9)]
                       [text-shadow:_0_0_25px_rgb(239_68_68_/_90%),_0_0_50px_rgb(239_68_68_/_60%)]
                       tracking-widest">
              SOLO
            </span>
          </motion.span>
        </div>

        {/* Subtle underline effect */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: showTitle ? 0 : 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <span className="w-64 md:w-96 lg:w-[32rem] h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 block" />
        </motion.div>
      </motion.div>
    </div>
  );
}
