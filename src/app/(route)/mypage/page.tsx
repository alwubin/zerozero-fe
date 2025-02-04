'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/app/_components/Navbar';
import { UserProfile } from '@/app/_components/mypage/UserProfile';
import { UserActivity } from '@/app/_components/mypage/UserActivity';
import { getUserProfile } from '@/app/api/mypage';
import { logout } from '@/app/api/login';

interface UserProfileState {
  nickname: string;
  profileImage: string;
  rank: number | null;
  storeReportCount: number;
}

export default function Mypage() {
  const [userProfile, setUserProfile] = useState<UserProfileState>({
    nickname: '',
    profileImage: '',
    rank: null,
    storeReportCount: 0,
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserProfile();
      if (profile) {
        setUserProfile({
          ...profile,
          profileImage: profile.profileImage || '',
        });
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-point w-full">
      <div className="mt-8 font-bold text-lg ml-7">마이페이지</div>
      <UserProfile
        nickname={userProfile.nickname}
        profileImageUrl={userProfile.profileImage}
      />
      <UserActivity
        rank={userProfile.rank}
        storeReportCount={userProfile.storeReportCount}
      />

      <button
        className="bg-main w-11/12 mb-24 font-semibold text-white text-sm mx-5 py-4 rounded-2xl"
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
