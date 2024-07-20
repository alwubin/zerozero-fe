import Image from "next/image";

export const UserProfile = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <Image
        src="/images/user-icon.png"
        alt="user-icon"
        width={273}
        height={277}
        className="w-14"
      />
      <div className="flex flex-row mt-2">
        <div className="font-bold text-xl">서호빵</div>
        <button className="cursor-pointer ml-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-3"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
