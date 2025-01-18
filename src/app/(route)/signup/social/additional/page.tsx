'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderMessage from '@/app/_components/common/HeaderMessage';
import NicknameInput from '@/app/_components/login/NicknameInput';
import ConfirmButton from '@/app/_components/common/ConfirmButton';

export default function SocialSignupAdditional() {
  const [nickname, setNickname] = useState('');
  const [nicknameShake, setNicknameShake] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,10}$/;
    if (!regex.test(nickname)) {
      setNicknameShake(true);
      setTimeout(() => setNicknameShake(false), 200);
      return;
    }

    try {
      alert('추가 정보 입력이 완료되었습니다!');
      router.push('/landing');
    } catch (error) {
      console.error('닉네임 업데이트 오류:', error);
      setNicknameShake(true);
      setTimeout(() => setNicknameShake(false), 500);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-white overflow-hidden">
      <HeaderMessage message="닉네임을 알려주세요" />
      <NicknameInput onShake={nicknameShake} />
      <ConfirmButton handleConfirm={handleConfirm} />
    </div>
  );
}
