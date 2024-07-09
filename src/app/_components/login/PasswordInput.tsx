"use client";
import React, { ChangeEvent } from "react";
import { motion } from "framer-motion";

interface PasswordProps {
  label: string;
  value: string;
  onShake: boolean;
  onChange: (value: string) => void;
  isConfirm?: boolean;
}

function PasswordInput({
  label,
  value,
  onShake,
  onChange,
  isConfirm = false,
}: PasswordProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <motion.div
      className="ml-9 mt-12 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="text-[#A5A5A5] font-light text-sm">{label}</div>
      <motion.div
        className="flex items-center"
        animate={onShake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <input
          type="password"
          className="w-[415px] p-2 border-b-2 border-[#A5A5A5] border-x-0 border-t-0 outline-none focus-within:border-main transition duration-300 placeholder:font-light placeholder:text-sm"
          placeholder={isConfirm ? "" : "영문·숫자·특수문자 포함 8자 이상"}
          value={value}
          onChange={handleChange}
        />
      </motion.div>
    </motion.div>
  );
}

export default PasswordInput;
