import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import * as React from 'react';

interface ITabsProps {
  children?: React.ReactNode;
  values: ITabProps[];
  handleChange: any;
  current: number;
}

interface ITabProps {
  id: number;
  title: string;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ values, handleChange, current }: ITabsProps) {
  return (
    <Tabs
      value={current}
      onChange={handleChange}
      aria-label="basic tabs example"
      variant="scrollable"
      scrollButtons="auto"
      TabIndicatorProps={{
        style: {
          background: '#233E8B',
          height: 4,
          color: '#233E8B',
        },
      }}
    >
      {values.map(tabValue => {
        return <Tab key={tabValue.id} label={tabValue.title} {...a11yProps(tabValue.id)} />;
      })}
    </Tabs>
  );
}
