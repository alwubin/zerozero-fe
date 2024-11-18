'use client';
import React, { useState } from 'react';
import { getReportItemList } from '@/app/api/mypage';

interface ActivityItem {
  rank: number | null;
  storeReportCount: number;
}

interface Store {
  id?: string;
  kakaoId?: string;
  name?: string;
  category?: string;
  phone?: string;
  address?: string;
  roadAddress?: string;
  longitude?: number;
  latitude?: number;
  status?: boolean;
  images?: { url: string }[];
  placeUrl?: string;
}

export const UserActivity = ({ rank, storeReportCount }: ActivityItem) => {
  const [selectedItem, setSelectedItem] = useState<
    'storeReport' | 'storeSave' | null
  >(null);
  const [reportItemList, setReportItemList] = useState<Store[]>([]);

  const fetchReportData = async () => {
    const reportData = await getReportItemList();
    if (reportData) {
      setReportItemList(reportData);
    }
  };

  const handleSelectedItem = () => {
    setSelectedItem('storeReport');
    fetchReportData();
  };

  return (
    <div className="mt-2 mx-5 py-5 bg-gray-100 rounded-3xl">
      <div className="flex justify-between mb-4">
        <div className="flex-1 bg-white rounded-2xl py-3 ml-1 mr-2 text-center cursor-pointer">
          <div
            className={
              rank === null
                ? 'text-sm font-bold my-2 text-gray-300'
                : 'text-2xl font-bold mb-1'
            }
          >
            {rank === null ? 'Unranked' : rank}
          </div>
          <div className="text-xs">내 랭킹</div>
        </div>

        <div
          className="flex-1 bg-white rounded-2xl py-3 ml-1 mr-2 text-center cursor-pointer"
          onClick={handleSelectedItem}
        >
          <div className="text-2xl font-bold mb-1">{storeReportCount}</div>
          <div className="text-xs">제보한 판매점</div>
        </div>

        {/* <div className="flex-1 bg-white rounded-2xl py-3 mx-1 text-center cursor-pointer">
          <div className="text-2xl font-bold mb-1">0</div>
          <div className="text-xs">저장한 판매점</div>
        </div> */}
      </div>

      {selectedItem !== null && reportItemList ? (
        <div className="bg-white rounded-2xl p-4 mx-1 mb-4 h-60 overflow-y-auto">
          {reportItemList.map((item) => (
            <div key={item.id} className="bg-point rounded-2xl px-4 py-2 mb-2">
              <p className="font-bold mb-1 text-xs">{item.name}</p>
              <p className="text-[10px] text-gray-600 mb-1">{item.address}</p>
              <p className="text-[10px] text-[#235A91]">{item.phone}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
