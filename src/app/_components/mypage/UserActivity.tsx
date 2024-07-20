"use client";
import React, { useState } from "react";

interface DetailItem {
  name: string;
  address: string;
  phone: string;
}

interface ActivityItem {
  id: number;
  title: string;
  count: number;
  clickable: boolean;
  details?: DetailItem[];
}

export const UserActivity: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const items: ActivityItem[] = [
    {
      id: 1,
      title: "내 랭킹",
      count: 1,
      clickable: false,
    },
    {
      id: 2,
      title: "제보한 판매점",
      count: 2,
      clickable: true,
      details: [
        {
          name: "명동교자 이태원점",
          address: "서울 용산구 녹사평대로 136",
          phone: "02-790-7300",
        },
        {
          name: "을지로 맛집",
          address: "서울 중구 을지로 45",
          phone: "02-123-4567",
        },
      ],
    },
    {
      id: 3,
      title: "저장한 판매점",
      count: 5,
      clickable: true,
      details: [
        {
          name: "강남 찌개집",
          address: "서울 강남구 테헤란로 152",
          phone: "02-987-6543",
        },
        {
          name: "홍대 파스타",
          address: "서울 마포구 와우산로 29길 15",
          phone: "02-345-6789",
        },
      ],
    },
  ];

  const handleItemClick = (id: number) => {
    if (items.find((item) => item.id === id)?.clickable) {
      setSelectedItem(selectedItem === id ? null : id);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-100 rounded-3xl">
      <div className="flex justify-between mb-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex-1 bg-white rounded-2xl p-2 mx-1 text-center ${
              item.clickable ? "cursor-pointer" : ""
            } shadow-sm`}
            onClick={() => handleItemClick(item.id)}
          >
            <div className="text-2xl font-bold mb-1">{item.count}</div>
            <div className="text-xs">{item.title}</div>
          </div>
        ))}
      </div>

      {selectedItem !== null && (
        <div className="bg-white rounded-2xl p-4 mx-1 mb-4 h-60 overflow-y-auto">
          {items
            .find((item) => item.id === selectedItem)
            ?.details?.map((detail, index) => (
              <div
                key={index}
                className="bg-[#F2F4F6] rounded-2xl px-4 py-2 mb-2"
              >
                <p className="font-bold mb-1 text-xs">{detail.name}</p>
                <p className="text-[10px] text-gray-600 mb-1">
                  {detail.address}
                </p>
                <p className="text-[10px] text-[#235A91]">{detail.phone}</p>
              </div>
            ))}
        </div>
      )}

      <button className="bg-[#CD5C5C] mt-auto font-semibold  text-white text-xs w-full py-3 rounded-xl">
        로그아웃
      </button>
    </div>
  );
};
