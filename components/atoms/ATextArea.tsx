import * as React from 'react';
import { ChangeEvent } from 'react';

interface Props {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent) => void;
}

export default function ATextArea({ label, placeholder, onChange }: Props) {
  return (
    <div className="block text-left w-full">
      {label && <div className="text-gray-700">제목</div>}
      <textarea
        className="mt-1 px-2 rounded-lg shadow-sm resize-none outline-none border-2 focus:border-indigo-200 py-2 block w-full"
        rows={3}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
