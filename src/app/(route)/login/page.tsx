'use client';
import { useLoginStore } from '@/app/zustand/loginStore';
import EmailInput from '../../_components/login/EmailInput';
import PasswordInput from '../../_components/login/PasswordInput';
import BackButton from '@/app/_components/common/BackButton';
import ConfrimButton from '@/app/_components/common/ConfirmButton';
import HeaderMessage from '@/app/_components/common/HeaderMessage';
import { postLogin } from '@/app/api/login';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { email, password, setEmail, setPassword, resetState } =
    useLoginStore();

  const [emailShake, setEmailShake] = useState(false);
  const [passwordShake, setPasswordShake] = useState(false);
  const router = useRouter();

  useEffect(() => {
    resetState();
  }, [resetState]);

  const handleConfirm = async () => {
    const values = {
      email: email,
      password: password,
    };
    try {
      const loginSuccess = await postLogin(values);
      if (loginSuccess) {
        alert('로그인 성공');
        router.push('/landing');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인 실패');
      setEmailShake(true);
      setPasswordShake(true);
      setTimeout(() => {
        setEmailShake(false);
        setPasswordShake(false);
      }, 500);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <BackButton />
      <HeaderMessage message="이메일과 비밀번호로 로그인해주세요" />
      <EmailInput setEmail={setEmail} onShake={emailShake} />
      <PasswordInput
        label="비밀번호"
        value={password}
        onChange={setPassword}
        onShake={passwordShake}
      />
      <ConfrimButton handleConfirm={handleConfirm} message="로그인" />
    </div>
  );
}
