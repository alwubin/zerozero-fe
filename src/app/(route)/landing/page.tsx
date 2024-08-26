'use client';
import { useEffect, useState, ChangeEvent } from 'react';
import { Navbar } from '@/app/_components/Navbar';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { searchStore } from '@/app/api/landing';
import { useLandingStore } from '@/app/zustand/landingStore';
import { SearchBar } from '@/app/_components/landing/SearchBar';
import { KakaoMap } from '@/app/_components/landing/KakaoMap';
import { StoreCarousel } from '@/app/_components/landing/StoreCarousel';

interface State {
  center: { lat: number; lng: number };
  errMsg: string | null;
  isLoading: boolean;
}

export interface StoreProps {
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

export default function Main() {
  const [clickedIndex, setClickedIndex] = useState<string | null>(null);
  const [storeList, setStoreList] = useState<StoreProps[] | null>(null);
  const { latitude, longitude, query, setLatitude, setLongitude, setQuery } =
    useLandingStore();

  const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const fetchStoreList = async () => {
    const storeList = await searchStore(query, longitude, latitude);
    if (storeList) {
      setStoreList(storeList);
    }
  };

  const [loading] = useKakaoLoader({
    appkey: `${process.env.NEXT_PUBLIC_APP_KEY}`,
    libraries: ['services', 'clusterer', 'drawing'],
  });

  const [state, setState] = useState<State>({
    center: { lat: 33.450701, lng: 126.570667 },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setLatitude(latitude.toString());
          setLongitude(longitude.toString());

          setState((prev) => ({
            ...prev,
            center: {
              lat: latitude,
              lng: longitude,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, [setLatitude, setLongitude]);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute z-10 top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
        <SearchBar
          query={query}
          onChange={handleQuery}
          onSearch={() => fetchStoreList()}
        />
      </div>

      <KakaoMap
        center={state.center}
        storeList={storeList}
        clickedIndex={clickedIndex}
        onMarkerClick={setClickedIndex}
      />

      {storeList && clickedIndex && (
        <StoreCarousel storeList={storeList} clickedIndex={clickedIndex} />
      )}

      <div className="mt-auto">
        <Navbar />
      </div>
    </div>
  );
}
