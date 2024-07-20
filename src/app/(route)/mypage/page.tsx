import { Navbar } from "@/app/_components/Navbar";
import { UserProfile } from "@/app/_components/mypage/UserProfile";
import { UserActivity } from "@/app/_components/mypage/UserActivity";

export default function Mypage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F6] w-full">
      <div className="mt-8 font-bold text-lg ml-7">마이페이지</div>
      <UserProfile />
      <UserActivity />
      <div className="mt-auto">
        <Navbar />
      </div>
    </div>
  );
}
