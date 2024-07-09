"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useSignupStore } from "@/app/store/signupStore";

interface NicknameInputProps {
  onShake: boolean;
}

function NicknameInput({ onShake }: NicknameInputProps) {
  const { nickname, setNickname } = useSignupStore();

  const handleNickname = (e: ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);

  return (
    <motion.div
      className="ml-9 mt-32 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="text-[#A5A5A5] font-light text-sm">닉네임</div>
      <motion.div
        className="flex items-center"
        animate={onShake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          className="w-[415px] p-2 border-b-2 border-[#A5A5A5] border-x-0 border-t-0 outline-none focus-within:border-main transition duration-300 placeholder:font-light placeholder:text-sm"
          placeholder="제로제로"
          value={nickname}
          onChange={handleNickname}
        />
      </motion.div>
    </motion.div>
  );
}

export default NicknameInput;
