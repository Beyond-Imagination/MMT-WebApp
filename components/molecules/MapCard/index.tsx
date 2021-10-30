import * as React from 'react';
import LazyLoadingImage from '../../atoms/LazyLoadingImage';

export interface IMapCardProps {
  title: string;
  imageUrl: string;
  show: boolean;
  onClick: () => void;
}

export default function MapCard(props: IMapCardProps) {
  const { imageUrl, title, onClick, show } = props;
  return (
    <button
      type="button"
      className={`flex shadow-lg rounded-lg bg-white ${show ? 'fade-in' : 'fade-out'}`}
      style={{ minWidth: '200px', maxWidth: '300px' }}
      onClick={onClick}
    >
      <div className="flex px-2 py-2 w-full">
        <LazyLoadingImage
          src={imageUrl}
          className="rounded-lg shadow-lg object-cover object-center w-20 h-20 shadow-2xl"
        />
        <div className="ml-2 w-full">
          <div className="text-center font-bold" style={{ wordBreak: 'keep-all', whiteSpace: 'normal' }}>
            {title}
          </div>
        </div>
      </div>
    </button>
  );
}
