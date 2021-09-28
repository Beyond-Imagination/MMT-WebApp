import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import * as React from 'react';

interface TabsProps {
  children?: React.ReactNode;
  values: TabProps[];
  handleChange: any;
  current: number;
}

interface TabProps {
  id: number;
  title: string;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ values, handleChange, current }: TabsProps) {
  return (
    <Tabs
      value={current}
      onChange={handleChange}
      aria-label="basic tabs example"
      variant="scrollable"
      scrollButtons="auto"
      centered
      TabIndicatorProps={{
        style: {
          background: '#233E8B',
          height: 4,
          color: '#233E8B',
        },
      }}
    >
      {values.map(tabValue => {
        return <Tab label={tabValue.title} {...a11yProps(tabValue.id)} />;
      })}
    </Tabs>
  );
}
