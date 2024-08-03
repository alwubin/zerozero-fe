import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserIcon } from "@/app/assets";

interface ProfileProps {
  nickname: string;
  profileImageUrl: { url: string | null };
}

export const UserProfile: React.FC<ProfileProps> = ({
  nickname,
  profileImageUrl,
}) => {
  const imageUrl = profileImageUrl.url;
  const router = useRouter();

  const handleProfileEdit = () => {
    router.push("/mypage/profile");
  };

  return (
    <div className="items-center justify-center">
      <div className="ml-7 flex flex-row items-center mt-5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="user-icon"
            width={70}
            height={70}
            className="rounded-full object-cover w-[70px] h-[70px]"
          />
        ) : (
          <UserIcon />
        )}
        <div className="mt-3 relative ml-7">
          <span className="font-bold text-xl">{nickname}</span>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <button
          className="bg-white mt-4 px-48 py-3 rounded-2xl text-xs font-bold"
          onClick={handleProfileEdit}
        >
          프로필 수정
        </button>
      </div>
    </div>
  );
};
