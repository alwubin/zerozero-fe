/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import { DetailHeader } from '@/app/_components/store/DetailHeader';
import { StoreInfo } from '@/app/_components/store/StoreInfo';
import { StoreReview } from '@/app/_components/store/StoreReview';
import { useSelectedStore } from '@/app/zustand/detailStore';
import { getStoreInfo } from '@/app/api/detail';
import { useParams } from 'next/navigation';
import Loading from '@/app/loading';

import Image from 'next/image';
import RegisteredStoreImage from '@/app/_components/store/RegisteredStoreImage';
import Modal from '@/app/_components/common/Modal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fetchStoreInfo = async (value: string) => {
    try {
      const storeInfo = await getStoreInfo(value, filter);
      console.log(storeInfo.store);
      if (storeInfo) {
        setStoreInfo(storeInfo.store);
      }
    } catch (error) {
      console.error('판매점 조회 오류', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (params?.id) {
      fetchStoreInfo(params.id);
      setStoreId(params.id);
    }
  }, [params?.id]);

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
      <div className="flex flex-col space-y-3 my-3">
        <RegisteredStoreImage
          images={storeInfo?.images}
          onImageClick={openImageModal}
        />
        <StoreReview storeId={storeId} />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedImage && (
          <div className="relative">
            <Image
              src={selectedImage}
              alt={`store-image`}
              width={800}
              height={600}
              className="object-cover"
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
