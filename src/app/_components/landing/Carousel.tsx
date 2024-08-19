/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useRef, useState, useEffect } from 'react';
import { StoreProps } from '@/app/(route)/landing/page';
import { useSelectStore } from '@/app/store/reportStore';
import { useSelectedStore } from '@/app/store/detailStore';
import { useRouter } from 'next/navigation';

interface ListProps {
  storeList: StoreProps[];
  clickedIndex: string | null;
}

const Carousel = ({ storeList, clickedIndex }: ListProps) => {
  const router = useRouter();
  const {
    id,
    setId,
    setPlaceName,
    setPhone,
    setCategory,
    setAddress,
    setLongitude,
    setLatitude,
    setStatus,
  } = useSelectStore();
  const { setImages, setReviews, setZeroDrinks, filter } = useSelectedStore();
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [currentStore, setCurrentStore] = useState<StoreProps | null>(null);

  const dummyStart = {
    kakaoId: 'start',
    name: ' ',
    category: 'dummydata',
    address: 'dummy',
  };
  const dummyEnd = {
    kakaoId: 'end',
    name: ' ',
    category: 'dummydata',
    address: 'dummy',
  };

  const extendedStoreList = [dummyStart, ...storeList, dummyEnd];

  useEffect(() => {
    if (clickedIndex) {
      const originalIndex = storeList.findIndex(
        (store) => store.kakaoId === clickedIndex,
      );

      if (originalIndex === -1) return;

      const adjustedIndex = originalIndex + 1;

      const targetId = extendedStoreList[adjustedIndex]?.kakaoId;

      if (targetId && itemRefs.current[targetId]) {
        itemRefs.current[targetId]?.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
        });
      }
    }
  }, [clickedIndex, storeList]);

  useEffect(() => {
    if (currentStore) {
      setId(currentStore.id ?? '');
      setPlaceName(currentStore.name ?? '');
      setPhone(currentStore.phone ?? '');
      setCategory(currentStore.category ?? '');
      setAddress(currentStore.address ?? '');
      setLongitude(currentStore.longitude ?? '');
      setLatitude(currentStore.latitude ?? '');
      setStatus(currentStore.status ?? false);
      console.log(id);
    }
  }, [
    currentStore,
    setPlaceName,
    setPhone,
    setCategory,
    setAddress,
    setLongitude,
    setLatitude,
    setStatus,
  ]);

  const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (carouselRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - carouselRef.current.offsetLeft);
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  const dragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className="z-50 relative w-full overflow-hidden"
      ref={carouselRef}
      onMouseDown={startDrag}
      onMouseLeave={endDrag}
      onMouseUp={endDrag}
      onMouseMove={dragMove}
    >
      <div className="flex space-x-6 overflow-x-scroll scrollbar-hide cursor-pointer select-none">
        {extendedStoreList.map((store, index) => {
          const originalIndex = storeList.findIndex(
            (s) => s.kakaoId === clickedIndex,
          );
          const isCurrent = index === originalIndex + 1;

          if (isCurrent && currentStore !== store) {
            setCurrentStore(store);
          }

          return (
            <div
              key={store.kakaoId || `store-${index}`}
              ref={(el) => {
                if (store.kakaoId) {
                  itemRefs.current[store.kakaoId] = el;
                }
              }}
              className={`min-w-64 px-4 py-4 bg-white rounded-2xl ${
                store.kakaoId === 'dummy-start' || store.kakaoId === 'dummy-end'
                  ? 'hidden'
                  : ''
              }`}
            >
              {isCurrent ? (
                <>
                  <h3 className="text-lg font-bold">{store.name}</h3>
                  <p className="text-[#A5A5A5] font-light text-xs">
                    {store.category}
                  </p>
                  <p className="text-black font-light text-sm">
                    {store.address}
                  </p>
                  <button
                    onClick={() => router.push('/detail')}
                    className="mt-9 px-5 py-2 text-[10px] text-white bg-main rounded-xl font-semibold"
                  >
                    더보기
                  </button>
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
