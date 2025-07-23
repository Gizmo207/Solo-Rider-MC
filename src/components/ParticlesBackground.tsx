"use client";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      init={particlesInit}
      className="absolute inset-0"
      options={{
        fpsLimit: 60,
        particles: {
          number: { value: 40, density: { enable: true, area: 800 } },
          color: { value: "#ffffff" },
          opacity: { value: 0.1 },
          size: { value: 2 },
          move: { enable: true, speed: 1 },
        },
        interactivity: {
          detectsOn: "canvas",
          events: { onhover: { enable: true, mode: "repulse" } },
          modes: { repulse: { distance: 80 } },
        },
        detectRetina: true,
      }}
    />
  );
}
