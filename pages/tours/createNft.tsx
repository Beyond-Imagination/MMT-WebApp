import { TextField, Box, Typography, Skeleton, Icon, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import callAPI from '../../helpers/apiCaller';
import TitleBar from '../../components/molecules/TitleBar';
import { RootState } from '../../store';
import { getTourDetail } from '../../store/tour';
import useKlip from '../../hooks/useKlip';

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
  useKlip();

  useEffect(() => {
    if (Number(contentId)) {
      dispatch(getTourDetail({ tourId: Number(contentId), contentTypeId: Number(contentTypeId) }));
    }
  }, [dispatch, contentId]);

  const handleReg = () => {
    const req = { contentId, image, title, weather, impression, emotion };
    callAPI('post', '/api/nft', req);
  };
  return (
    <div>
      <TitleBar title="NFT 제출하기" />
      <div className="px-4">
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
          <label
            className="
              w-full
              flex flex-col
              items-center
              px-4
              py-2
              leading-4
              bg-white
              rounded-md
              shadow-md
              tracking-wide
              uppercase
              border border-blue
              cursor-pointer
              hover:bg-indigo-600 hover:text-white
              text-indigo-600
              ease-linear
              transition-all
              duration-150
            "
          >
            <span className="mt-2 text-base leading-normal">이미지를 선택해주세요</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              id="contained-button-file"
              onChange={event => {
                const formData = new FormData();
                formData.append('image', event.target.files[0]);
                callAPI('post', '/api/nft/image', formData).then(value => {
                  setImage(value.image);
                });
              }}
            />
          </label>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            sx={{ mb: 2 }}
            label="제목"
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
            router.push(`/tours/${contentId}?contentTypeId=${contentTypeId}`);
          }}
          sx={{ width: '100%' }}
        >
          <Typography>제출하기</Typography>
        </Button>
        <div className="pb-20" />
      </div>
    </div>
  );
};

export default createNft;
