import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserIcon } from "@/app/assets";
import { EditIcon } from "@/app/assets";

interface ProfileProps {
  nickname: string;
  profileImageUrl: { url: string | null };
  uploadProfile: () => void;
}

export const UserProfile: React.FC<ProfileProps> = ({
  nickname,
  profileImageUrl,
  uploadProfile,
}) => {
  const imageUrl = profileImageUrl.url;
  const router = useRouter();

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
          <button
            className="cursor-pointer absolute top-1/2 -translate-y-1/2 ml-2 inline-flex items-center"
            onClick={uploadProfile}
          >
            <EditIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <button
          className="bg-white mt-4 px-48 py-3 rounded-2xl text-xs font-bold"
          onClick={() => router.push("/mypage/profile")}
        >
          프로필 수정
        </button>
      </div>
    </div>
  );
};
