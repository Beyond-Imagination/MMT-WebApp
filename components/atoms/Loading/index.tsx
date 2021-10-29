import { CircularProgress } from '@mui/material';
import * as React from 'react';

export default function Loading() {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <CircularProgress />
    </div>
  );
}
