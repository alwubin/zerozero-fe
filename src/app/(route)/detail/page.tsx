/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect } from 'react';
import { DetailHeader } from '@/app/_components/store/DetailHeader';
import { StoreInfo } from '@/app/_components/store/StoreInfo';
import { RegisteredStoreImage } from '@/app/_components/store/RegisteredStoreImage';
import StoreImage from '@/app/_components/report/StoreImages';
import { StoreReview } from '@/app/_components/store/StoreReview';
import { ReportButton } from '@/app/_components/report/ReportButton';
import { useSelectedStore } from '@/app/store/detailStore';
import { useSelectStore } from '@/app/store/reportStore';
import { getStoreInfo } from '@/app/api/detail';

export default function Detail() {
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
  }, [status, id, filter]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F2F4F6]">
      <DetailHeader />
      <StoreInfo />
      {status ? (
        <div>
          <RegisteredStoreImage />
          <StoreReview />
        </div>
      ) : (
        <div className="w-10/12 mt-3 ml-10 space-y-7">
          <StoreImage />
          <ReportButton />
        </div>
      )}
    </div>
  );
}
