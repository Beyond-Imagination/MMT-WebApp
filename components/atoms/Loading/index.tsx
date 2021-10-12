import { CircularProgress } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function Loading() {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
}
