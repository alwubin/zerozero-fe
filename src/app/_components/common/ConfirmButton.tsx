interface ConfirmButtonProps {
  message?: string;
  handleConfirm: () => void;
}

function ConfirmButton({
  handleConfirm,
  message = "확인",
}: ConfirmButtonProps) {
  return (
    <>
      <div className="flex-grow"></div>
      <div className="w-full">
        <button
          className="bg-main w-full text-white h-16"
          onClick={handleConfirm}
        >
          {message}
        </button>
      </div>
    </>
  );
}

export default ConfirmButton;
