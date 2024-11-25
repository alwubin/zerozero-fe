'use client';
import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';

interface EmailInputProps {
  className?: string;
  setEmail: (email: string) => void;
  onShake: boolean;
}

function EmailInput({
  className = 'ml-9 mt-32 w-full',
  setEmail,
  onShake,
}: EmailInputProps) {
  const [emailId, setEmailId] = useState('');
  const [domain, setDomain] = useState('naver.com');
  const [isCustomDomain, setIsCustomDomain] = useState(false);

  React.useEffect(() => {
    setEmail(`${emailId}@${domain}`);
  }, [emailId, domain, setEmail]);

  const handleEmailIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailId(e.target.value);
  };

  const handleDomainChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedDomain = e.target.value;
    if (selectedDomain === 'custom') {
      setIsCustomDomain(true);
      setDomain('');
    } else {
      setIsCustomDomain(false);
      setDomain(selectedDomain);
    }
  };

  const handleCustomDomainChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="text-[#A5A5A5] w-full font-light text-sm">이메일</div>
      <motion.div
        className="flex items-center w-full"
        animate={onShake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          value={emailId}
          onChange={handleEmailIdChange}
          className="w-[135px] pixel:w-[160px] p-2 border-b-2 border-[#A5A5A5] border-x-0 border-t-0 outline-none focus-within:border-main transition duration-300 placeholder:font-light placeholder:text-sm"
          placeholder="zerozero"
        />
        <span className="px-2">@</span>
        {isCustomDomain ? (
          <input
            type="text"
            value={domain}
            onChange={handleCustomDomainChange}
            className="w-[135px] pixel:w-[160px] p-2 border-b-2 border-[#A5A5A5] border-x-0 border-t-0 outline-none focus-within:border-main transition duration-300 placeholder:font-light placeholder:text-sm"
            placeholder="직접 입력"
          />
        ) : (
          <select
            value={domain}
            onChange={handleDomainChange}
            className="w-[135px] pixel:w-[160px] p-2 border-b-2 border-[#A5A5A5] border-x-0 border-t-0 outline-none focus-within:border-main transition duration-300"
          >
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
            <option value="daum.net">daum.net</option>
            <option value="custom">직접 입력</option>
          </select>
        )}
      </motion.div>
    </motion.div>
  );
}

export default EmailInput;
