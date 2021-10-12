import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  current: number;
}

export default function TabPanel(props: TabPanelProps) {
  const { children, current, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={current !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {current === index && (
        <Box sx={{ pl: 2, pr: 2, mt: 2 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}
