'use client';
import { useRouter } from 'next/navigation';
import { BackIcon } from '@/app/assets';

const BackButton = () => {
  const router = useRouter();

  const handleBackButton = () => {
    router.push('/');
  };

  return (
    <BackIcon
      className="justify-start ml-9 mt-9 cursor-pointer"
      onClick={handleBackButton}
    />
  );
};

export default BackButton;
