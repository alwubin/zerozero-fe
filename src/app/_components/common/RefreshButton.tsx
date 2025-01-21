import { RefreshIcon } from '@/app/assets';

export const RefreshButton = () => {
  return (
    <button className="cursor-pointer" onClick={() => location.reload()}>
      <RefreshIcon />
    </button>
  );
};
