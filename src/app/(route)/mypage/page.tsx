"use client";
import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/app/_components/Navbar";
import { UserProfile } from "@/app/_components/mypage/UserProfile";
import { UserActivity } from "@/app/_components/mypage/UserActivity";
import { getUserProfile, uploadImage } from "@/app/api/mypage";
import { logout } from "@/app/api/login";

interface UserProfileState {
  nickname: string;
  profileImage: { url: string | null };
  rank: number | null;
  storeReportCount: number;
}

export default function Mypage() {
  const [userProfile, setUserProfile] = useState<UserProfileState>({
    nickname: "",
    profileImage: { url: null },
    rank: null,
    storeReportCount: 0,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserProfile();
      if (profile) {
        setUserProfile({
          ...profile,
          profileImage: profile.profileImage || { url: null },
        });
      }
    };

    fetchUserProfile();
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      try {
        const file = event.target.files[0];
        const response = await uploadImage(file);
        if (response && response.imageUrl) {
          setUserProfile((prevProfile) => ({
            ...prevProfile,
            profileImage: { url: response.imageUrl },
          }));
        }
      } catch (error) {
        console.error("프로필 이미지 업로드 중 오류 발생:", error);
      }
    }
  };

  const uploadProfile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F6] w-full">
      <div className="mt-8 font-bold text-lg ml-7">마이페이지</div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*"
      />
      <UserProfile
        nickname={userProfile.nickname}
        profileImageUrl={userProfile.profileImage}
        uploadProfile={uploadProfile}
      />
      <UserActivity
        rank={userProfile.rank}
        storeReportCount={userProfile.storeReportCount}
      />

      <button
        className="bg-[#CD5C5C] mt-80 font-semibold text-white text-sm mx-5 py-4 rounded-3xl"
        onClick={() => logout()}
      >
        로그아웃
      </button>
      <div className="mt-auto">
        <Navbar />
      </div>
    </div>
  );
}
