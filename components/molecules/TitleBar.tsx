import { Typography } from '@mui/material';
import * as React from 'react';
import { useRouter } from 'next/router';

interface IProps {
  title: string;
}

export default function TitleBar(props: IProps) {
  const router = useRouter();
  const { title } = props;

  return (
    <div className="w-full relative h-15 text-center font-bold text-4xl px-3 py-3">
      <button className="absolute w-8 h-8 left-4" type="button" onClick={() => router.back()}>
        <img className="w-3 h-5 mx-auto" src="../../static/back-btn-4.png" alt="back button" />
      </button>
      <Typography variant="h5" fontWeight={800}>
        {title}
      </Typography>
    </div>
  );
}
