"use client";
import { useState } from "react";
import { BookmarkIcon, BookmarkIconActive } from "@/app/assets";

const BookmarkButton = () => {
  const [bookmark, setBookmark] = useState<boolean>(false);

  const handleBookmark = () => {
    setBookmark(!bookmark);
  };

  return (
    <>
      {bookmark ? (
        <BookmarkIconActive
          className="cursor-pointer mt-9 mr-9"
          onClick={handleBookmark}
        />
      ) : (
        <BookmarkIcon
          className="cursor-pointer mt-9 mr-9"
          onClick={handleBookmark}
        />
      )}
    </>
  );
};

export default BookmarkButton;
