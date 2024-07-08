import React from "react";

interface HeaderMessageProps {
  message: string;
}

const HeaderMessage: React.FC<HeaderMessageProps> = ({ message }) => {
  return <div className="font-bold text-2xl ml-9 mt-14">{message}</div>;
};

export default HeaderMessage;
