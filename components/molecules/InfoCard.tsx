import { nanoid } from 'nanoid';
import * as React from 'react';

interface Item {
  title: string;
  content: string;
}

interface Props {
  title: string;
  items: Item[];
}

export default function InfoCard({ title, items }: Props) {
  if (!items) {
    return <></>;
  }

  const targetItems = items.filter(x => x.title && x.title.length !== 0 && x.content && x.content.length !== 0);

  return (
    <>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="w-full px-4 py-4 rounded-lg shadow-lg">
        {targetItems.length > 0 &&
          targetItems.map((x, index, arr) => (
            <div key={nanoid()}>
              <h3 className="text-xl font-bold mb-2">{x.title}</h3>
              <div className={index !== arr.length - 1 ? 'mb-4' : ''} dangerouslySetInnerHTML={{ __html: x.content }} />
            </div>
          ))}

        {targetItems.length === 0 && <div className="text-lg text-center">항목이 없습니다.</div>}
      </div>
    </>
  );
}
