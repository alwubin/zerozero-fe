"use client";
import { useSignupStore } from "@/app/store/signupStore";

function ConfirmButton() {
  const { step, setStep } = useSignupStore();

  const handleConfirm = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      alert("회원가입 완료");
    }
  };

  return (
    <>
      <div className="flex-grow"></div>
      <div className="w-full">
        <button
          className="bg-main w-full text-white h-16"
          onClick={handleConfirm}
        >
          확인
        </button>
      </div>
    </>
  );
}

export default ConfirmButton;
