"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
    <div
      className="justify-start ml-9 mt-9 cursor-pointer"
      onClick={handleBackButton}
    >
      <Image
        src="/images/back-button.png"
        alt="back-button"
        width={24}
        height={24}
      />
    </div>
  );
};

export default BackButton;
