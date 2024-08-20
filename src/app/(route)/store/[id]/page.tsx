/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect } from 'react';
import { DetailHeader } from '@/app/_components/store/DetailHeader';
import { StoreInfo } from '@/app/_components/store/StoreInfo';
import { RegisteredStoreImage } from '@/app/_components/store/RegisteredStoreImage';
import { StoreReview } from '@/app/_components/store/StoreReview';
import { useSelectedStore } from '@/app/store/detailStore';
import { useSelectStore } from '@/app/store/reportStore';
import { getStoreInfo } from '@/app/api/detail';

export default function RegisteredStore() {
  const { status, id } = useSelectStore();
  const { setImages, setReviews, setZeroDrinks, filter } = useSelectedStore();

  const fetchStoreInfo = async () => {
    try {
      const storeInfo = await getStoreInfo(id, filter);
      if (storeInfo) {
        setImages(storeInfo.store.images || []);
        setReviews(storeInfo.reviews || []);
        setZeroDrinks(storeInfo.zeroDrinks || [[]]);
        console.log(storeInfo);
      }
    } catch (error) {
      console.error('판매점 조회 오류', error);
    }
  };

  useEffect(() => {
    if (status && id) {
      fetchStoreInfo();
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#F2F4F6]">
      <DetailHeader />
      <StoreInfo />
      <div>
        <RegisteredStoreImage />
        <StoreReview />
      </div>
    </div>
  );
}
