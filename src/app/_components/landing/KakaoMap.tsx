import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { StoreProps } from '@/app/(route)/landing/page';
import { parseCookies } from 'nookies'; // 쿠키에서 토큰을 가져오기 위해 추가

interface KakaoMapProps {
  center: { lat: number; lng: number };
  storeList: StoreProps[] | null;
  clickedIndex: string | null;
  onMarkerClick: (id: string | null) => void;
}

export function KakaoMap({
  center,
  storeList,
  clickedIndex,
  onMarkerClick,
}: KakaoMapProps) {
  const [updatedStoreList, setUpdatedStoreList] = useState<StoreProps[] | null>(
    storeList,
  );

  useEffect(() => {
    const cookies = parseCookies();
    const accessToken = cookies.accessToken;

    const socket = new WebSocket('ws://3.37.245.108:8080/ws/store');

    socket.onopen = () => {
      console.log('WebSocket 연결됨');

      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const message = {
          longitude: longitude,
          latitude: latitude,
          accessToken: accessToken,
        };

        socket.send(JSON.stringify(message));
      });
    };

    socket.onmessage = (event) => {
      try {
        const updatedStores: StoreProps[] = JSON.parse(event.data);
        console.log(updatedStores);
        setUpdatedStoreList(updatedStores);
      } catch (err) {
        console.error('웹소켓 메시지 처리 중 오류:', err);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket 오류:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket 연결이 종료되었습니다.');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <Map
      center={center}
      style={{
        width: '100%',
        height: '100%',
      }}
      level={5}
    >
      {storeList
        ? storeList.map((store) => {
            const kakaoId = store.kakaoId || null;

            return (
              <MapMarker
                key={kakaoId}
                position={{
                  lat: store.latitude ? parseFloat(store.latitude) : 0,
                  lng: store.longitude ? parseFloat(store.longitude) : 0,
                }}
                image={{
                  src:
                    clickedIndex === kakaoId
                      ? store.status
                        ? '/images/clicked-yes-zero-marker.png'
                        : '/images/clicked-no-zero-marker.png'
                      : store.status
                      ? '/images/yes-zero-marker.png'
                      : '/images/no-zero-marker.png',
                  size: {
                    width: 28,
                    height: 36,
                  },
                }}
                title={store.name}
                clickable={true}
                onClick={() => onMarkerClick(kakaoId)}
              />
            );
          })
        : null}
    </Map>
  );
}
