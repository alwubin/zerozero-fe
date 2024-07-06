import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="">
        <Image
          src="/images/iconLogo.png"
          alt="icon-logo"
          className="max-w-full h-auto"
          width={120}
          height={120}
        />
      </div>
      <div className="w-2/6 mt-9">
        <Image
          src="/images/nameLogo.png"
          alt="name-logo"
          className="max-w-full h-auto"
          width={412}
          height={268}
        />
      </div>
    </div>
  );
}
