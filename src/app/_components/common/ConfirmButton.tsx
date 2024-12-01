interface ConfirmButtonProps {
  message?: string;
  handleConfirm: () => void;
}

function ConfirmButton({
  handleConfirm,
  message = '확인',
}: ConfirmButtonProps) {
  return (
    <div className="flex flex-col w-full flex-grow">
      {' '}
      <div className="flex-grow"></div>
      <button
        className="bg-main w-full text-white h-16"
        onClick={handleConfirm}
      >
        {message}
      </button>
    </div>
  );
}

export default ConfirmButton;
