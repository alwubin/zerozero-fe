"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AnimatedLogo() {
  return (
    <motion.div
      className="flex-grow flex flex-col items-center justify-start mt-44"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-8xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
      >
        🥤
      </motion.div>
      <motion.div
        className="w-2/5 mt-9"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Image
          src="/images/nameLogo.png"
          alt="name-logo"
          className="max-w-full h-auto"
          width={412}
          height={268}
        />
      </motion.div>
    </motion.div>
  );
}
