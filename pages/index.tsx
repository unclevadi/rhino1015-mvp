import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const bgTranslate = {
    transform: `translate(${(mousePos.x - window.innerWidth / 2) * 0.01}px, ${(mousePos.y - window.innerHeight / 2) * 0.01}px)`
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden text-white font-sans">
      {/* Animated background image */}
      <motion.div
        className="absolute inset-0"
        style={bgTranslate}
        transition={{ type: "spring", stiffness: 20 }}
      >
        <Image
          src="/your-photo.jpg"
          alt="Founder"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          priority
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-6"
        >
          <Image
            src="/rhino-logo.png"
            alt="Rhino Logo"
            width={180}
            height={180}
            className="drop-shadow-[0_0_25px_rgba(0,255,255,0.6)]"
            priority
          />
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Welcome to Rhino 1015
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Learn. Earn. Evolve.
        </motion.p>

        <motion.a
          href="/login"
          className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          🚀 Start Now
        </motion.a>
      </div>
    </div>
  );
}
