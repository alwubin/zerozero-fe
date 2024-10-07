import React from 'react';

const NotFound = () => {
  return (
    <div className="flex bg-white h-screen flex-col items-center justify-center space-y-1">
      <div className="text-gray-500">
        요청하신 페이지를 찾을 수 없어요.
        <br />
        다시 시도해 주세요.
      </div>
    </div>
  );
};

export default NotFound;
