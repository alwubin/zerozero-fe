interface ConfirmButtonProps {
  handleConfirm: () => void;
}

function ConfirmButton({ handleConfirm }: ConfirmButtonProps) {
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
