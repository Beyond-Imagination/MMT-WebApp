import * as React from 'react';
import LazyLoadingImage from '../../atoms/LazyLoadingImage';

export interface IMapCardProps {
  title: string;
  imageUrl: string;
  distance: string;
  show: boolean;
  onClick: () => void;
}

export default function MapCard(props: IMapCardProps) {
  const { imageUrl, title, onClick, show, distance } = props;
  return (
    <button
      type="button"
      className={`flex shadow-lg rounded-lg bg-white ${show ? 'fade-in' : 'fade-out'}`}
      style={{ width: '250px', height: '100px' }}
      onClick={onClick}
    >
      <div className="flex px-2 py-2 w-full h-full relative">
        <LazyLoadingImage
          src={imageUrl}
          className="rounded-lg shadow-lg object-cover object-center w-20 h-20 shadow-2xl"
        />
        <div
          className="ml-2 flex w-full h-full justify-center items-center font-bold leading-4"
          style={{ wordBreak: 'keep-all', whiteSpace: 'normal' }}
        >
          {title}
        </div>
        <div className="absolute bottom-2 right-2 text-xs font-thin text-gray-600">{distance}</div>
      </div>
    </button>
  );
}
