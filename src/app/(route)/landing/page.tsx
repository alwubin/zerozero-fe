'use client';
import { useEffect, useState, ChangeEvent } from 'react';
import { Navbar } from '@/app/_components/Navbar';
import Carousel from '@/app/_components/landing/Carousel';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';
import { SearchIcon } from '@/app/assets';
import { searchStore } from '@/app/api/landing';

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
  const [query, setQuery] = useState('');

  const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const fetchStoreList = async (query: string) => {
    const storeList = await searchStore(query);
    if (storeList) {
      setStoreList(storeList);
    }
  };

  const [loading] = useKakaoLoader({
    appkey: '2144548903f3f35b5a276d8984e61bc0',
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
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
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
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute z-10 top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleQuery}
            placeholder="키워드 또는 장소명 검색"
            className="w-full py-5 pl-4 pr-10 text-sm bg-white rounded-xl focus:outline-none focus:border-gray-400"
          />
          <SearchIcon
            className="absolute right-5 bottom-4 flex items-center"
            onClick={() => fetchStoreList(query)}
          />
        </div>
      </div>
      <Map
        center={state.center}
        style={{
          width: '100%',
          height: '100%',
        }}
        level={3}
      >
        {storeList
          ? storeList.map((store) => (
              <MapMarker
                key={store.id}
                position={{
                  lat: store.latitude ? parseFloat(store.latitude) : 0,
                  lng: store.longitude ? parseFloat(store.longitude) : 0,
                }}
                image={{
                  src:
                    clickedIndex === store.id
                      ? '/images/clicked-no-zero-marker.png'
                      : '/images/no-zero-marker.png',
                  size: {
                    width: 28,
                    height: 36,
                  },
                }}
                title={store.name}
                clickable={true}
                onClick={() => {
                  setClickedIndex(
                    store.id
                      ? store.id === clickedIndex
                        ? null
                        : store.id
                      : null,
                  );
                }}
              />
            ))
          : null}
      </Map>

      {storeList ? (
        <div className="absolute bottom-40 left-0 right-0 z-20">
          <Carousel storeList={storeList} clickedIndex={clickedIndex} />
        </div>
      ) : null}

      <div className="mt-auto">
        <Navbar />
      </div>
    </div>
  );
}
