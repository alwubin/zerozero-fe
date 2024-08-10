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

  useEffect(() => {
    if (clickedIndex && itemRefs.current[clickedIndex]) {
      itemRefs.current[clickedIndex]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
      });
    }
  }, [clickedIndex]);

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
        {storeList.map((store) => (
          <div
            key={store.id}
            ref={(el) => {
              if (store.id) {
                itemRefs.current[store.id] = el;
              }
            }}
            className="min-w-64 px-5 py-4 bg-white rounded-2xl"
          >
            <h3 className="text-xl font-bold">{store.name}</h3>
            <p className="text-[#A5A5A5] font-light">{store.category}</p>
            <p className="text-black font-light">{store.address}</p>
            <button className="mt-8 px-4 py-2 text-xs text-white bg-main rounded-lg">
              더보기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
