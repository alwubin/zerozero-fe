"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "@/app/_components/Navbar";
import { UserProfile } from "@/app/_components/mypage/UserProfile";
import { UserActivity } from "@/app/_components/mypage/UserActivity";
import { getUserProfile } from "@/app/api/mypage";

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

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F6] w-full">
      <div className="mt-8 font-bold text-lg ml-7">마이페이지</div>
      <UserProfile
        nickname={userProfile.nickname}
        profileImageUrl={userProfile.profileImage}
      />
      <UserActivity
        rank={userProfile.rank}
        storeReportCount={userProfile.storeReportCount}
      />

      <button className="bg-[#CD5C5C] mt-72 font-semibold text-white text-sm mx-5 py-5 rounded-xl">
        로그아웃
      </button>
      <div className="mt-auto">
        <Navbar />
      </div>
    </div>
  );
}
