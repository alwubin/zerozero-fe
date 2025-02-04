'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import BackButton from '@/app/_components/common/BackButton';
import { UserIcon } from '@/app/assets';
import { Navbar } from '@/app/_components/Navbar';
import { updateProfile, getUserProfile } from '@/app/api/mypage';
import { useImageUpload } from '@/app/hooks/useImageUpload';

export default function Profile() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { images, addImage, isUploading } = useImageUpload('user', 1);

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await getUserProfile();
      if (userProfile) {
        setNickname(userProfile.nickname);
        addImageFromUrl(userProfile.profileImage);
      }
    };

    fetchProfile();
  }, []);

  const addImageFromUrl = (url: string) => {
    if (url) {
      addImage(new File([], url));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateProfile(nickname, images[0] || null);
      if (response) {
        alert('프로필이 성공적으로 업데이트되었습니다.');
        router.push('/mypage');
      }
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await addImage(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F4F6] w-full">
      <div className="flex justify-between items-center w-full">
        <BackButton />
        <div className="font-bold mt-9 text-sm">프로필 편집</div>
        <button
          className="text-sm mt-9 mr-9 font-medium"
          onClick={handleSubmit}
          disabled={isUploading}
        >
          완료
        </button>
      </div>

      <div className="flex flex-col justify-center items-center mt-12 space-y-3">
        {images[0] ? (
          <Image
            src={images[0]}
            alt="프로필 이미지"
            width={70}
            height={70}
            className="rounded-full object-cover w-[70px] h-[70px]"
          />
        ) : (
          <UserIcon />
        )}
        <button
          className="text-xs font-semibold text-main"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? '업로드 중...' : '사진 수정'}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      <div className="flex flex-col mt-12 space-y-3">
        <div className="ml-9 font-semibold text-sm">닉네임</div>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-10/12 px-3 py-4 ml-9 rounded-xl outline-none"
        />
      </div>

      <div className="mt-auto">
        <Navbar />
      </div>
    </div>
  );
}
