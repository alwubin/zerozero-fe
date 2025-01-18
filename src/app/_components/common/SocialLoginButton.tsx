interface SocialLoginButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  variant?: 'kakao';
}

export function SocialLoginButton({
  icon,
  text,
  onClick,
  variant = 'kakao',
}: SocialLoginButtonProps) {
  const bgColor = variant === 'kakao' ? 'bg-kakao' : 'bg-main';
  const textColor = variant === 'kakao' ? 'text-black' : 'text-white';
  return (
    <button
      className={`flex items-center cursor-pointer justify-center rounded-md ${bgColor} p-4 space-x-7 w-[90%] ${textColor} font-semibold`}
      onClick={onClick}
    >
      {icon}
      <span className="text-base">{text}</span>
    </button>
  );
}
