"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import BackButton from "@/app/_components/common/BackButton";
import { UserIcon } from "@/app/assets";
import { Navbar } from "@/app/_components/Navbar";
import { updateProfile, getUserProfile } from "@/app/api/mypage";

export default function Profile() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await getUserProfile();
      if (userProfile) {
        setNickname(userProfile.nickname);
        setProfileImageUrl(userProfile.profileImage.url);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageFile: File | null | undefined = null;
      if (fileInputRef.current?.files?.length) {
        imageFile = fileInputRef.current.files[0];
      }

      const response = await updateProfile(nickname, imageFile);

      if (response) {
        alert("프로필이 성공적으로 업데이트되었습니다.");
        router.push("/mypage");
      }
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
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
        >
          완료
        </button>
      </div>

      <div className="flex flex-col justify-center items-center mt-12 space-y-3">
        {profileImageUrl ? (
          <Image
            src={profileImageUrl}
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
        >
          사진 수정
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
