"use client";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

interface InteractiveGearCardProps {
  image: string;
  title: string;
  price: string;
}

export default function InteractiveGearCard({ image, title, price }: InteractiveGearCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = e.clientX - rect.left - rect.width / 2;
    const posY = e.clientY - rect.top - rect.height / 2;
    x.set(posX);
    y.set(posY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY }}
      className="relative overflow-hidden rounded-xl shadow-xl cursor-pointer"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        className="w-full h-full"
      >
        <Image
          src={image}
          alt={title}
          width={400}
          height={500}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
            <h3 className="text-white text-2xl font-bold">{title}</h3>
            <span className="text-solo-red text-xl">{price}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
