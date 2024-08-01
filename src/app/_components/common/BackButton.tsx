"use client";
import { useRouter } from "next/navigation";
import { BackIcon } from "@/app/assets";

const BackButton = () => {
  const router = useRouter();

  const handleBackButton = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <BackIcon
      className="justify-start ml-9 mt-9 cursor-pointer"
      onClick={handleBackButton}
    />
  );
};

export default BackButton;
