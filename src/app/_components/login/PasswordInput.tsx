"use client";
import React, { ChangeEvent } from "react";
import { useSignupStore } from "@/app/store/signupStore";

interface PasswordProps {
  label: string;
  isConfirm?: boolean;
}

function PasswordInput({ label, isConfirm = false }: PasswordProps) {
  const { password, confirmPassword, setPassword, setConfirmPassword } =
    useSignupStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isConfirm) {
      setConfirmPassword(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
    <div className="ml-9 mt-12 w-full">
      <div className="text-[#A5A5A5] font-light text-sm">{label}</div>
      <div className="flex items-center">
        <input
          type="password"
          className="w-[415px] p-2 border-b-2 border-[#A5A5A5] border-x-0 border-t-0 outline-none focus-within:border-main transition duration-300 placeholder:font-light placeholder:text-sm"
          placeholder="영문·숫자·특수문자 포함 8자 이상"
          value={isConfirm ? confirmPassword : password}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default PasswordInput;
