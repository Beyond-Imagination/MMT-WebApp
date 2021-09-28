import * as React from 'react';
import Box from '@mui/material/Box';
import { TabPanel, Tabs } from '../components/molecules';

const tabs = [
  {
    id: 1,
    title: '관광지',
  },
  {
    id: 2,
    title: '문화시설',
  },
  {
    id: 3,
    title: '축제공연행사',
  },
  {
    id: 4,
    title: '여행코스',
  },
  {
    id: 5,
    title: '레포츠',
  },
];

function tours(props) {
  const [current, setCurrent] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrent(newValue);
  };
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Box>
          <Tabs values={tabs} current={current} handleChange={handleChange} />
        </Box>
        <TabPanel current={current} index={0}>
          관광지
        </TabPanel>
        <TabPanel current={current} index={1}>
          문화시설
        </TabPanel>
        <TabPanel current={current} index={2}>
          축제공연행사
        </TabPanel>
        <TabPanel current={current} index={3}>
          여행코스
        </TabPanel>
        <TabPanel current={current} index={4}>
          레포츠
        </TabPanel>
      </Box>
    </div>
  );
}

export default tours;
