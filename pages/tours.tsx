import * as React from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from "react";
import { Chip, Link, Stack } from '@mui/material';
import { TabPanel, Tabs } from '../components/molecules';
import TourPanel from '../components/atoms/TourPanel';
import { RootState } from '../store';
import { getTourList } from '../store/tour';
import Loading from '../components/atoms/Loading';
import useAuthenticated from '../hooks/useAuthenticated';
import useLocation from '../hooks/useLocation';
import delay from '../core/utils/delay';

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

interface IArrangeType {
  id: number;
  value: 'A' | 'B' | 'C' | 'D' | 'E' | 'O' | 'P' | 'Q' | 'R' | 'S';
  label: string;
}

const arrangeType: IArrangeType[] = [
  { id: 1, value: 'O', label: '제목순' },
  { id: 2, value: 'P', label: '조회순' },
  { id: 3, value: 'Q', label: '수정일순' },
  { id: 4, value: 'R', label: '생성일순' },
  { id: 5, value: 'S', label: '거리순' },
];

function tours() {
  const [current, setCurrent] = React.useState(0);
  const [arrange, setArrange] = React.useState(arrangeType[0]);
  const { mapCenter, updatedLocation, fetchLocation } = useLocation();
  const { loading, data } = useSelector((state: RootState) => state.tour.tours);
  const dispatch = useDispatch();

  useAuthenticated();
  const updateTourList = useCallback(
    async (mapX: number, mapY: number) => {
      if (!loading && updatedLocation) {
        const req = {
          mapX,
          mapY,
          numOfRows: 10,
          pageNo: 1,
          arrange: arrange.value,
          contentTypeId: tabs[current].contentTypeId,
          radius: 2000,
          overview: true,
        };
        dispatch(getTourList(req));
      }
    },
    [current, arrange.value, updatedLocation],
  );

  useEffect(() => {
    fetchLocation().then(() => {
      const { lng: mapX, lat: mapY } = mapCenter;
      updateTourList(mapX, mapY);
    });
  }, [updateTourList]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrent(newValue);
  };

  return (
    <Box className="content-container" style={{ height: '100%', backgroundColor: 'white' }}>
      <Box sx={{ mb: 1 }}>
        <Tabs values={tabs} current={current} handleChange={handleChange} />
      </Box>
      <Stack direction="row" spacing={0.5} sx={{ pl: 1, mb: 1 }}>
        {arrangeType.map(value => {
          if (arrange.id === value.id)
            return <Chip key={value.id} label={value.label} size="small" variant="filled" color="success" />;

          return (
            <Chip
              key={value.id}
              label={value.label}
              size="small"
              variant="outlined"
              onClick={event => {
                setArrange(value);
              }}
            />
          );
        })}
      </Stack>
      <Box style={{ overflow: 'scroll', height: '88%', paddingTop: 0 }}>
        <TabPanel current={current} index={current}>
          {loading ? (
            <Loading />
          ) : (
            data.map(value => (
              <Link
                key={value.content_id}
                href={`/tours/${value.content_id}?contentTypeId=${value.content_type_id}`}
                underline="none"
                color="black"
              >
                <TourPanel key={value.content_id} {...value} />
              </Link>
            ))
          )}
        </TabPanel>
      </Box>
    </Box>
  );
}

export default tours;
