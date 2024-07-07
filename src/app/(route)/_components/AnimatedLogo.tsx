"use client";
import { motion } from "framer-motion";

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
        className="mt-9 font-archivo-black text-main text-7xl leading-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="relative">
          <div className="text-7xl">zero</div>
          <div className="text-7xl absolute top-full left-0 -mt-[0.35em]">
            zero
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
