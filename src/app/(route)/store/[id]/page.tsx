'use client';
import React, { useEffect, useState } from 'react';
import { DetailHeader } from '@/app/_components/store/DetailHeader';
import { StoreInfo } from '@/app/_components/store/StoreInfo';
import { RegisteredStoreImage } from '@/app/_components/store/RegisteredStoreImage';
import { StoreReview } from '@/app/_components/store/StoreReview';
import { useSelectedStore } from '@/app/zustand/detailStore';
import { getStoreInfo } from '@/app/api/detail';
import { useParams } from 'next/navigation';
import Loading from '@/app/loading';

export interface Store {
  id: string;
  kakaoId: string;
  name: string;
  category: string;
  phone: string;
  address: string;
  roadAddress: string;
  longitude: string;
  latitude: string;
  status: boolean;
  images: Image[];
  placeUrl: string;
}

export interface Image {
  url: string;
}

export default function RegisteredStore() {
  const params = useParams<{ id: string }>();
  const { filter } = useSelectedStore();
  const [isLoading, setIsLoading] = useState(true);
  const [storeInfo, setStoreInfo] = useState<Store>();
  const [storeId, setStoreId] = useState<string>('');

  const fetchStoreInfo = async (value: string) => {
    try {
      const storeInfo = await getStoreInfo(value, filter);
      console.log(storeInfo.store);
      if (storeInfo) {
        setStoreInfo(storeInfo.store);
        // setStoreId(storeInfo.store.id || '');
        // setImages(storeInfo.store.images || []);
        // setReviews(storeInfo.reviews || []);
        // setZeroDrinks(storeInfo.zeroDrinks || [[]]);
      }
    } catch (error) {
      console.error('판매점 조회 오류', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchStoreInfo(params.id);
      setStoreId(params.id);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F2F4F6]">
      <DetailHeader />
      <StoreInfo
        placeName={storeInfo?.name}
        phone={storeInfo?.phone}
        address={storeInfo?.address}
        category={storeInfo?.category}
      />
      <div>
        <RegisteredStoreImage images={storeInfo?.images} />
        <StoreReview storeId={storeId} />
      </div>
    </div>
  );
}
