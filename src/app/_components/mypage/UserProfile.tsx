import Image from "next/image";

interface ProfileProps {
  nickname: string;
  profileImageUrl: string;
}

export const UserProfile: React.FC<ProfileProps> = ({
  nickname,
  profileImageUrl,
}) => {
  return (
    <div className="flex flex-col items-center mt-5">
      <Image
        src={
          profileImageUrl === null ? "/images/user-icon.png" : profileImageUrl
        }
        alt="user-icon"
        width={273}
        height={277}
        className="w-20"
      />
      <div className="mt-3 relative">
        <span className="font-bold text-3xl">{nickname}</span>
        <button className="cursor-pointer absolute top-1/2 -translate-y-1/2 ml-2 inline-flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
