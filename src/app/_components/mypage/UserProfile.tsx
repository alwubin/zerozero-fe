import Image from "next/image";
import { UserIcon } from "@/app/assets";
import { EditIcon } from "@/app/assets";

interface ProfileProps {
  nickname: string;
  profileImageUrl: { url: string | null };
}

export const UserProfile: React.FC<ProfileProps> = ({
  nickname,
  profileImageUrl,
}) => {
  const imageUrl = profileImageUrl.url;

  return (
    <div className="flex flex-col items-center mt-5">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="user-icon"
          width={273}
          height={277}
          className="w-20"
        />
      ) : (
        <UserIcon />
      )}
      <div className="mt-3 relative">
        <span className="font-bold text-3xl">{nickname}</span>
        <button className="cursor-pointer absolute top-1/2 -translate-y-1/2 ml-2 inline-flex items-center">
          <EditIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
