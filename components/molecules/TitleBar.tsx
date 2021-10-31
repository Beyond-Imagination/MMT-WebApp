import { Typography } from '@mui/material';
import * as React from 'react';
import { useRouter } from 'next/router';
import Icon from '@mdi/react';
import { mdiChevronLeft } from '@mdi/js';

interface Props {
  title: string;
  useBackBtn?: boolean;
}

export default function TitleBar({ title, useBackBtn = true }: Props) {
  const router = useRouter();

  return (
    <div className="w-full relative h-15 text-center font-bold text-4xl px-3 py-3">
      {useBackBtn !== false && (
        <button className="absolute w-8 h-8 left-4" type="button" onClick={() => router.back()}>
          <Icon path={mdiChevronLeft} />
        </button>
      )}
      <Typography variant="h5" fontWeight={800}>
        {title}
      </Typography>
    </div>
  );
}
