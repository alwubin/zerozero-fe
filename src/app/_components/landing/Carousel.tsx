import React, { useRef, useState, useEffect } from 'react';

interface StoreProps {
  id?: string;
  kakaoId?: string;
  name?: string;
  category?: string;
  phone?: string;
  address?: string;
  roadAddress?: string;
  longitude?: string;
  latitude?: string;
  status?: boolean;
  images?: string[];
  placeUrl?: string;
}

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
    id: 'start',
    name: ' ',
    category: 'dummydata',
    address: 'dummy',
  };
  const dummyEnd = {
    id: 'end',
    name: ' ',
    category: 'dummydata',
    address: 'dummy',
  };

  const extendedStoreList = [dummyStart, ...storeList, dummyEnd];

  useEffect(() => {
    if (clickedIndex) {
      const originalIndex = storeList.findIndex(
        (store) => store.id === clickedIndex,
      );

      if (originalIndex === -1) return;

      const adjustedIndex = originalIndex + 1;

      const targetId = extendedStoreList[adjustedIndex]?.id;

      if (targetId && itemRefs.current[targetId]) {
        itemRefs.current[targetId]?.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
        });
      }
    }
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
            (s) => s.id === clickedIndex,
          );
          const isCurrent = index === originalIndex + 1;
          const isAdjacent =
            index === originalIndex || index === originalIndex + 2;

          return (
            <div
              key={store.id || `store-${index}`}
              ref={(el) => {
                if (store.id) {
                  itemRefs.current[store.id] = el;
                }
              }}
              className={`min-w-64 px-5 py-4 bg-white rounded-2xl ${
                store.id === 'dummy-start' || store.id === 'dummy-end'
                  ? 'hidden'
                  : ''
              }`}
            >
              {isCurrent ? (
                <>
                  <h3 className="text-xl font-bold">{store.name}</h3>
                  <p className="text-[#A5A5A5] font-light">{store.category}</p>
                  <p className="text-black font-light">{store.address}</p>
                  <button className="mt-8 px-4 py-2 text-xs text-white bg-main rounded-lg">
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
