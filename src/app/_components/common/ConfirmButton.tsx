"use client";

function ConfirmButton() {
  const handleClick = () => {
    alert("확인");
  };

  return (
    <>
      <div className="flex-grow"></div>
      <div className="w-full">
        <button
          className="bg-main w-full text-white h-16"
          onClick={handleClick}
        >
          확인
        </button>
      </div>
    </>
  );
}

export default ConfirmButton;
