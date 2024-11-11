import { StoreProps } from '@/app/(route)/landing/page';
import Carousel from '@/app/_components/landing/Carousel';
import { RefreshButton } from '@/app/assets';

interface StoreCarouselProps {
  storeList: StoreProps[];
  clickedIndex: string | null;
}

export function StoreCarousel({ storeList, clickedIndex }: StoreCarouselProps) {
  return (
    <div className="absolute bottom-40 space-y-2 left-0 right-0 z-20 flex flex-col">
      <button className="ml-1" onClick={() => location.reload()}>
        <RefreshButton />
      </button>
      <Carousel storeList={storeList} clickedIndex={clickedIndex} />
    </div>
  );
}
