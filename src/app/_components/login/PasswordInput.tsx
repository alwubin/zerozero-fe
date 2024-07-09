"use client";
import React, { ChangeEvent } from "react";

interface PasswordProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isConfirm?: boolean;
}

function PasswordInput({
  label,
  value,
  onChange,
  isConfirm = false,
}: PasswordProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="ml-9 mt-12 w-full">
      <div className="text-[#A5A5A5] font-light text-sm">{label}</div>
      <div className="flex items-center">
        <input
          type="password"
          className="w-[415px] p-2 border-b-2 border-[#A5A5A5] border-x-0 border-t-0 outline-none focus-within:border-main transition duration-300 placeholder:font-light placeholder:text-sm"
          placeholder={
            isConfirm
              ? "비밀번호를 다시 입력해주세요"
              : "영문·숫자·특수문자 포함 8자 이상"
          }
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default PasswordInput;
