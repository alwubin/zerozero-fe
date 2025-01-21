'use client';
import { useEffect, useState, ChangeEvent } from 'react';
import { Navbar } from '@/app/_components/Navbar';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { searchStore } from '@/app/api/landing';
import { useLandingStore } from '@/app/zustand/landingStore';
import { SearchBar } from '@/app/_components/landing/SearchBar';
import { KakaoMap } from '@/app/_components/landing/KakaoMap';
import { StoreCarousel } from '@/app/_components/landing/StoreCarousel';
import { RefreshButton } from '@/app/_components/common/RefreshButton';

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
  const [searchStoreList, setSearchStoreList] = useState<StoreProps[] | null>(
    null,
  );
  const [nearbyStoreList, setNearbyStoreList] = useState<StoreProps[] | null>(
    [],
  );
  const { latitude, longitude, query, setLatitude, setLongitude, setQuery } =
    useLandingStore();

  const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const fetchStoreList = async () => {
    const storeList = await searchStore(query, longitude, latitude);
    if (storeList) {
      setSearchStoreList(storeList);
    }
  };

  const [loading] = useKakaoLoader({
    appkey: `${process.env.NEXT_PUBLIC_APP_KEY}`,
    libraries: ['services', 'clusterer', 'drawing'],
  });

  const [state, setState] = useState<State>({
    center: {
      lat: 37.5666805,
      lng: 126.9784147,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLat = localStorage.getItem('latitude');
      const savedLng = localStorage.getItem('longitude');

      setState((prev) => ({
        ...prev,
        center: {
          lat: savedLat ? Number(savedLat) : prev.center.lat,
          lng: savedLng ? Number(savedLng) : prev.center.lng,
        },
      }));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
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
        searchStoreList={searchStoreList}
        clickedIndex={clickedIndex}
        onMarkerClick={setClickedIndex}
        nearbyStoreList={nearbyStoreList}
        setNearbyStoreList={setNearbyStoreList}
      />

      {clickedIndex && (
        <StoreCarousel
          storeList={
            searchStoreList &&
            searchStoreList.find((store) => store.kakaoId === clickedIndex)
              ? searchStoreList
              : nearbyStoreList || []
          }
          clickedIndex={clickedIndex}
        />
      )}

      <div className="mt-auto w-full max-w-[430px]">
        <div
          className={`${
            isMobile ? 'left-4' : 'left-[37%]'
          } fixed bottom-20 z-20`}
        >
          <RefreshButton />
        </div>
        <Navbar />
      </div>
    </div>
  );
}
