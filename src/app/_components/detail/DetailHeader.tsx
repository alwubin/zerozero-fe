import BackButton from "../common/BackButton";
import BookmarkButton from "../common/BookmarkButton";

export const DetailHeader = () => {
  return (
    <div className="flex justify-between items-center w-full">
      <BackButton />
      <BookmarkButton />
    </div>
  );
};
