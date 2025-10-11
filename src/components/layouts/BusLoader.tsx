"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import animationLogo from "../../../public/animationLogo.png";

export default function BusLoader() {
  const [progress, setProgress] = useState(0);
  const [positions, setPositions] = useState<{ left: string; top: string }[]>([]);

  // Generate random positions AFTER client mounts
  useEffect(() => {
    const newPositions = Array.from({ length: 8 }).map(() => ({
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 60 + 20}%`,
    }));
    setPositions(newPositions);
  }, []);

  // Simulate loading
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Don't render animated elements until positions are ready (avoids mismatch)
  if (positions.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white z-[9999] overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
      >
        {/* ======= SPEED LINES ======= */}
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={pos}
            animate={{
              x: [-120, -250],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.4,
            }}
          >
            <div className="w-16 h-1 bg-blue-400 rounded-full opacity-80"></div>
          </motion.div>
        ))}

        {/* ======= CLOUDS ======= */}
        <motion.div
          className="absolute"
          style={{ right: "20%", top: "25%" }}
          animate={{
            x: [0, 20, 0],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
            <ellipse cx="20" cy="25" rx="15" ry="12" fill="#93C5FD" />
            <ellipse cx="35" cy="20" rx="18" ry="15" fill="#93C5FD" />
            <ellipse cx="45" cy="25" rx="12" ry="10" fill="#93C5FD" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute"
          style={{ right: "15%", bottom: "30%" }}
          animate={{
            x: [0, -15, 0],
            y: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <svg width="50" height="35" viewBox="0 0 50 35" fill="none">
            <ellipse cx="15" cy="20" rx="12" ry="10" fill="#93C5FD" />
            <ellipse cx="28" cy="17" rx="15" ry="12" fill="#93C5FD" />
            <ellipse cx="38" cy="20" rx="10" ry="8" fill="#93C5FD" />
          </svg>
        </motion.div>

        {/* ======= BUS LOGO ======= */}
        <div className="relative flex flex-col items-center">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={animationLogo}
              alt="Bus"
              width={180}
              height={180}
              className="object-contain"
            />
          </motion.div>

          {/* Broken Road */}
          <div className="flex gap-2 mt-2">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="w-10 h-[3px] bg-blue-500 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              ></motion.div>
            ))}
          </div>
        </div>

        {/* ======= TEXT ======= */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-blue-600">MyBusGo</h2>
          <motion.p
            className="text-lg text-blue-600 mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Traveling...
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
