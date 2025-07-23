"use client";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      <video
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        src="/bg.mp4"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <img
          src="/logo.svg"
          alt="Solo Riders MC"
          className="w-32 md:w-48 mb-6 animate-pulse"
        />
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          FORGED ON THE THROTTLE
        </motion.h1>
        <motion.button
          className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded hover:bg-red-600 transition"
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            }
          }}
        >
          SEE THE RIDE
        </motion.button>
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce text-white text-2xl">⬇</div>
      </div>
    </section>
  );
}
