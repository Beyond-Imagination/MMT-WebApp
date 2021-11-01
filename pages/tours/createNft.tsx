import { TextField, Box, Typography, Skeleton, Icon, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import callAPI from '../../helpers/apiCaller';
import TitleBar from '../../components/molecules/TitleBar';
import { RootState } from '../../store';
import { getTourDetail } from '../../store/tour';

const createNft = () => {
  const router = useRouter();
  const { data } = useSelector((state: RootState) => state.tour.tourDetail);
  const { contentId, contentTypeId } = router.query;
  const [title, setTitle] = useState('');
  const [weather, setWeather] = useState('');
  const [impression, setImpression] = useState('');
  const [emotion, setEmotion] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('router.query: ', router.query);
    console.log(contentId);
    console.log('useEffect');
    if (Number(contentId)) {
      dispatch(getTourDetail({ tourId: Number(contentId), contentTypeId: Number(contentTypeId) }));
    }
  }, [dispatch, contentId]);

  useEffect(() => {}, [router.isReady]);

  const handleReg = () => {
    const req = { contentId, image, title, weather, impression, emotion };
    callAPI('post', '/api/nft', req);
  };
  return (
    <Box
      sx={{
        pl: 3,
        pr: 3,
        pb: 2,
      }}
    >
      <TitleBar title="NFT 제출하기" />
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        {data ? (
          <Typography variant="h6" fontWeight={800}>
            {data?.title}
          </Typography>
        ) : (
          <Skeleton variant="rectangular" width="100%" height={28} sx={{ mb: 1 }} />
        )}
      </Box>

      {image ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={image} alt="" style={{ backgroundSize: 'contain', height: 250 }} />
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            borderStyle: 'dashed',
            borderWidth: 3,
            height: 250,
            mb: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          미리보기
        </Box>
      )}

      <Box sx={{ mb: 2 }}>
        <input
          accept="image/*"
          id="contained-button-file"
          type="file"
          onChange={event => {
            //   const arr = [];
            //   for (let i = 0; i < event.target.files.length; i++) {
            //     const formData = new FormData();
            //     formData.append('image', event.target.files[i]);
            //     callAPI('post', '/api/nft/image', formData).then(value => {
            //       arr.push(value.image);
            //     });
            //     console.log(arr);
            //   }
            //   setImage(arr);
            const formData = new FormData();
            formData.append('image', event.target.files[0]);
            callAPI('post', '/api/nft/image', formData).then(value => {
              setImage(value.image);
            });
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField
          sx={{ mb: 2 }}
          label="타이틀"
          variant="outlined"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
          }}
        />
        <TextField
          sx={{ mb: 2 }}
          label="감정"
          variant="outlined"
          value={emotion}
          onChange={event => {
            setEmotion(event.target.value);
          }}
        />
        <TextField
          sx={{ mb: 2 }}
          label="날씨"
          variant="outlined"
          value={weather}
          onChange={event => {
            setWeather(event.target.value);
          }}
        />
        <TextField
          sx={{ mb: 2 }}
          label="소감"
          variant="outlined"
          value={impression}
          onChange={event => {
            setImpression(event.target.value);
          }}
        />
      </Box>
      <Button
        onClick={() => {
          handleReg();
          alert('제출 성공');
          router.push(`/tours/${contentId}?contentTypeId=${contentTypeId}`);
        }}
        sx={{ width: '100%' }}
      >
        <Typography>제출하기</Typography>
      </Button>
    </Box>
  );
};

export default createNft;
