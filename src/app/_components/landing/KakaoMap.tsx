import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { StoreProps } from '@/app/(route)/landing/page';

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
