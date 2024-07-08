"use client";
import React, { useState, ChangeEvent } from "react";

function NicknameInput() {
  const [nickname, setNickname] = useState<string>("");

  const handleNickname = (e: ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);

  return (
    <div className="ml-9 mt-32 w-full">
      <div className="text-[#A5A5A5] font-light text-sm">닉네임</div>
      <div className="flex items-center">
        <input
          type="text"
          className="w-[415px] p-2 border-b-2 border-[#A5A5A5] border-x-0 border-t-0 outline-none focus-within:border-main transition duration-300 placeholder:font-light placeholder:text-sm"
          placeholder="제로제로"
          value={nickname}
          onChange={handleNickname}
        />
      </div>
    </div>
  );
}

export default NicknameInput;
