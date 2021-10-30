import { CircularProgress } from '@mui/material';
import * as React from 'react';

export default function Loading() {
  return (
    <div className="fixed left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
      <CircularProgress />
    </div>
  );
}
