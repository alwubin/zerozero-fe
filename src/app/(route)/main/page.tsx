"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/app/_components/Navbar";
import {
  Map,
  MapMarker,
  useKakaoLoader,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";

interface State {
  center: { lat: number; lng: number };
  errMsg: string | null;
  isLoading: boolean;
}
export default function Main() {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const positions = [
    {
      title: "카카오",
      latlng: { lat: 33.450705, lng: 126.570677 },
    },
    {
      title: "생태연못",
      latlng: { lat: 33.450936, lng: 126.569477 },
    },
    {
      title: "텃밭",
      latlng: { lat: 33.450879, lng: 126.56994 },
    },
    {
      title: "근린공원",
      latlng: { lat: 33.451393, lng: 126.570738 },
    },
  ];

  const [loading] = useKakaoLoader({
    appkey: "2144548903f3f35b5a276d8984e61bc0",
    libraries: ["services", "clusterer", "drawing"],
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
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <div className="relative w-full h-screen">
      {" "}
      <div className="absolute z-10 top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="키워드 또는 장소명 검색"
            className="w-full py-5 pl-4 pr-10 text-sm bg-white rounded-xl focus:outline-none focus:border-gray-400"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="#434343"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <Map
        center={state.center}
        style={{
          width: "100%",
          height: "calc(100vh - 64px)",
        }}
        level={3}
      >
        {positions.map((position, index) => (
          <MapMarker
            key={`${position.title}-${position.latlng}`}
            position={position.latlng}
            image={{
              src:
                clickedIndex === index
                  ? "/images/clicked-no-zero-marker.png"
                  : "/images/no-zero-marker.png",
              size: {
                width: 28,
                height: 36,
              },
            }}
            title={position.title}
            clickable={true}
            onClick={() => {
              setClickedIndex(index === clickedIndex ? null : index);
            }}
          />
        ))}
      </Map>
      <div className="absolute bottom-0 left-0 right-0">
        <Navbar />
      </div>
    </div>
  );
}
