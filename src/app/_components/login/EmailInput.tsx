"use client";
import React, { useState, ChangeEvent } from "react";
import { useSignupStore } from "@/app/store/signupStore";

interface EmailInputProps {
  className?: string;
}

function EmailInput({ className = "ml-9 mt-32 w-full" }: EmailInputProps) {
  const { email, setEmail } = useSignupStore();
  const [emailId, domain] = email.split("@");
  const [isCustomDomain, setIsCustomDomain] = React.useState<boolean>(() => {
    if (domain) {
      return !["naver.com", "gmail.com", "daum.net"].includes(domain);
    }
    return false;
  });

  const handleEmailIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(`${e.target.value}@${domain}`);
  };

  const handleDomainChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedDomain = e.target.value;
    if (selectedDomain === "custom") {
      setIsCustomDomain(true);
      setEmail(`${emailId}@`);
    } else {
      setIsCustomDomain(false);
      setEmail(`${emailId}@${selectedDomain}`);
    }
  };

  const handleCustomDomainChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(`${emailId}@${e.target.value}`);
  };

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
            value={domain}
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
