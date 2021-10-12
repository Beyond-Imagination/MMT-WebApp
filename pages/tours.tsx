import * as React from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Chip, CircularProgress, Stack } from '@mui/material';
import styled from 'styled-components';
import { TabPanel, Tabs } from '../components/molecules';
import TourPanel from '../components/atoms/TourPanel';
import { RootState } from '../store';
import { getTourList } from '../store/tour';
import Loading from '../components/atoms/Loading';

const tabs = [
  {
    id: 1,
    title: '관광지',
    contentTypeId: 12,
  },
  {
    id: 2,
    title: '문화시설',
    contentTypeId: 14,
  },
  {
    id: 3,
    title: '축제공연행사',
    contentTypeId: 15,
  },
  {
    id: 4,
    title: '여행코스',
    contentTypeId: 25,
  },
  {
    id: 5,
    title: '레포츠',
    contentTypeId: 28,
  },
];

const arrangeType = [
  { id: 1, value: 'O', label: '제목순' },
  { id: 2, value: 'P', label: '조회순' },
  { id: 3, value: 'Q', label: '수정일순' },
  { id: 4, value: 'R', label: '생성일순' },
  { id: 5, value: 'S', label: '거리순' },
];

function tours(props) {
  const [current, setCurrent] = React.useState(0);
  const [arrange, setArrange] = React.useState(arrangeType[0]);
  const { loading, data, error } = useSelector((root: RootState) => root.tour.tours);
  const dispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrent(newValue);
  };

  useEffect(() => {
    dispatch(getTourList());
  }, [dispatch]);

  return (
    <Box className="content-container" style={{ height: '100%' }}>
      <Box height="8%">
        <Tabs values={tabs} current={current} handleChange={handleChange} />
      </Box>
      <Stack height="4%" direction="row" spacing={0.5} sx={{ pl: 1 }}>
        {arrangeType.map(value => {
          if (arrange.id === value.id)
            return <Chip label={value.label} size="small" variant="filled" color="success" />;

          return <Chip label={value.label} size="small" variant="outlined" />;
        })}
      </Stack>
      <Box style={{ overflow: 'scroll', height: '88%' }}>
        <TabPanel current={current} index={current}>
          {loading ? <Loading /> : data.map(value => <TourPanel key={value.content_id} {...value} />)}
        </TabPanel>
      </Box>
    </Box>
  );
}

export default tours;
