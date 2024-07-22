"use client";
import { useState } from "react";
import { DetailHeader } from "@/app/_components/detail/DetailHeader";
import { StoreInfo } from "@/app/_components/detail/StoreInfo";
import { RegisteredStoreImage } from "@/app/_components/detail/RegisteredStoreImage";
import { StoreImage } from "@/app/_components/report/StoreImages";
import { StoreReview } from "@/app/_components/detail/StoreReview";
import { ReportButton } from "@/app/_components/report/ReportButton";

export default function Detail() {
  const [isRegistered, setIsRegistered] = useState(true);
  return (
    <div className="flex min-h-screen flex-col bg-[#F2F4F6]">
      <DetailHeader />
      <StoreInfo />
      {isRegistered ? (
        <div>
          <RegisteredStoreImage />
          <StoreReview />
        </div>
      ) : (
        <div className="w-10/12 mt-4 ml-10">
          <StoreImage />
          <ReportButton />
        </div>
      )}
    </div>
  );
}
