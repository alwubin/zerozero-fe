/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect } from 'react';
import { DetailHeader } from '@/app/_components/store/DetailHeader';
import { StoreInfo } from '@/app/_components/store/StoreInfo';
import { RegisteredStoreImage } from '@/app/_components/store/RegisteredStoreImage';
import { StoreReview } from '@/app/_components/store/StoreReview';
import { useSelectedStore } from '@/app/zustand/detailStore';
import { useSelectStore } from '@/app/zustand/reportStore';
import { getStoreInfo } from '@/app/api/detail';

export default function RegisteredStore() {
  const { status, id } = useSelectStore();
  const {
    setStoreId,
    setImages,
    setReviews,
    setZeroDrinks,
    setFilter,
    storeId,
    filter,
  } = useSelectedStore();

  const fetchStoreInfo = async (value: string) => {
    try {
      const storeInfo = await getStoreInfo(value, filter);
      if (storeInfo) {
        setStoreId(storeInfo.store.id || '');
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
    console.log('Status:', status);
    console.log('ID:', id);
    console.log('Store ID:', storeId);
    console.log('Filter:', filter);
    if (status !== null && id !== null) {
      fetchStoreInfo(id);
    } else {
      fetchStoreInfo(storeId);
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
