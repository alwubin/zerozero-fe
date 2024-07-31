"use client";
import React, { useState } from "react";

interface ActivityItem {
  rank: number | null;
  storeReportCount: number;
}

export const UserActivity = ({ rank, storeReportCount }: ActivityItem) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  return (
    <div className="mt-7 w-full max-w-4xl mx-auto p-4 bg-gray-100 rounded-3xl">
      <div className="flex justify-between mb-4">
        <div className="flex-1 bg-white rounded-2xl py-3 mx-2 text-center cursor-pointer shadow-sm">
          <div
            className={
              rank === null
                ? "text-sm font-bold my-2 text-gray-300"
                : "text-2xl font-bold mb-1"
            }
          >
            {rank === null ? "Unranked" : rank}
          </div>
          <div className="text-xs">내 랭킹</div>
        </div>

        <div className="flex-1 bg-white rounded-2xl py-3 mx-2 text-center cursor-pointer shadow-sm">
          <div className="text-2xl font-bold mb-1">{storeReportCount}</div>
          <div className="text-xs">제보한 판매점</div>
        </div>

        <div className="flex-1 bg-white rounded-2xl py-3 mx-2 text-center cursor-pointer shadow-sm">
          <div className="text-2xl font-bold mb-1">0</div>
          <div className="text-xs">저장한 판매점</div>
        </div>
      </div>
    </div>
  );
};
