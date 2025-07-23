"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-white">
      
      {/* 🎥 Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        src="/bg.mp4"
      />

      {/* 🧪 Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent z-10" />

      {/* 🧱 Content Layer */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        {/* 🛡️ Club Logo */}
        <img
          src="/logo.svg"
          alt="SoloRidersMC"
          className="w-32 md:w-48 mb-6"
        />

        {/* 💥 Hero Tagline */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          FORGED ON THE THROTTLE
        </motion.h1>

        {/* 🚀 CTA Button */}
        <motion.button
          className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded hover:bg-red-600 transition"
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          SEE THE RIDE
        </motion.button>
      </div>

      {/* ⬇ Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          className="text-white text-2xl animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          ⬇
        </motion.div>
      </div>

    </section>
  );
}
