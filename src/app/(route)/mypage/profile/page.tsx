import BackButton from "@/app/_components/common/BackButton";
import { UserIcon } from "@/app/assets";
import { Navbar } from "@/app/_components/Navbar";
import Image from "next/image";

interface ProfileProps {
  profileImageUrl: { url: string | null };
}

export default function Profile({ profileImageUrl }: ProfileProps) {
  //   const imageUrl = profileImageUrl.url;
  return (
    <div className="min-h-screen bg-[#F2F4F6] w-full">
      <div className="flex justify-between items-center w-full">
        <BackButton />
        <div className="font-bold mt-9 text-sm">프로필 편집</div>
        <button className="text-sm mt-9 mr-9 font-medium">완료</button>
      </div>

      <div className="flex flex-col justify-center items-center mt-12 space-y-3">
        <UserIcon />
        <button className="text-xs font-semibold text-main">사진 수정</button>
      </div>

      <div className="flex flex-col mt-12 space-y-3">
        <div className="ml-9 font-semibold text-sm">닉네임</div>
        <input
          type="text"
          className="w-10/12 px-3 py-4 ml-9 rounded-xl outline-none"
        />
      </div>

      <div className="mt-auto">
        <Navbar />
      </div>
    </div>
  );
}
