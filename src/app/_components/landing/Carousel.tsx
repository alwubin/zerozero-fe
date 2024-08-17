'use client';
import React, { useRef, useState, useEffect } from 'react';
import { StoreProps } from '@/app/(route)/landing/page';

interface ListProps {
  storeList: StoreProps[];
  clickedIndex: string | null;
}

const Carousel = ({ storeList, clickedIndex }: ListProps) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedIndex, storeList]);

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
          const isAdjacent =
            index === originalIndex || index === originalIndex + 2;

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
                  <button className="mt-9 px-5 py-2 text-[10px] text-white bg-main rounded-xl font-semibold">
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
