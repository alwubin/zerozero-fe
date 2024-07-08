"use client";
import React, { useState, ChangeEvent } from "react";

interface EmailInputProps {
  className?: string;
}

function EmailInput({ className = "ml-9 mt-32 w-full" }: EmailInputProps) {
  const [emailId, setEmailId] = useState<string>("");
  const [domain, setDomain] = useState<string>("naver.com");
  const [customDomain, setCustomDomain] = useState<string>("");
  const [isCustomDomain, setIsCustomDomain] = useState<boolean>(false);

  const handleEmailIdChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmailId(e.target.value);

  const handleDomainChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedDomain = e.target.value;
    if (selectedDomain === "custom") {
      setIsCustomDomain(true);
      setDomain("");
    } else {
      setIsCustomDomain(false);
      setDomain(selectedDomain);
    }
  };

  const handleCustomDomainChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCustomDomain(e.target.value);

  return (
    <div className={className}>
      <div className="text-[#A5A5A5] font-light text-sm">이메일</div>
      <div className="flex items-center">
        <input
          type="text"
          value={emailId}
          onChange={handleEmailIdChange}
          className="w-2/5 p-2 border-b-2 border-[#A5A5A5] border-x-0 border-t-0 outline-none focus-within:border-main transition duration-300 placeholder:font-light placeholder:text-sm"
          placeholder="zerozero"
        />
        <span className="px-2">@</span>
        {isCustomDomain ? (
          <input
            type="text"
            value={customDomain}
            onChange={handleCustomDomainChange}
            className="w-2/5 p-2 border-b-2 border-[#A5A5A5] border-x-0 border-t-0 outline-none focus-within:border-main transition duration-300 placeholder:font-light placeholder:text-sm"
            placeholder="직접 입력"
          />
        ) : (
          <select
            value={domain}
            onChange={handleDomainChange}
            className="w-2/5 p-2 border-b-2 border-[#A5A5A5] border-x-0 border-t-0 outline-none focus-within:border-main transition duration-300"
          >
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
            <option value="daum.net">daum.net</option>
            <option value="custom">직접 입력</option>
          </select>
        )}
      </div>
    </div>
  );
}

export default EmailInput;
