import { TextField, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import callAPI from '../../helpers/apiCaller';

const createNft = () => {
  const router = useRouter();

  const { contentId } = router.query;

  const [title, setTitle] = useState('');
  const [weather, setWeather] = useState('');
  const [impression, setImpression] = useState('');
  const [emotion, setEmotion] = useState('');
  const [image, setImage] = useState('');

  const handleUploadClick = event => {
    setImage(event.target.files);

    // reader.onloadend = function (e) {
    //   this.setState({
    //     selectedFile: [reader.result],
    //   });
    // }.bind(this);
    //
    // this.setState({
    //   mainState: 'uploaded',
    //   selectedFile: event.target.files[0],
    //   imageUploaded: 1,
    // });
  };

  const handleReg = () => {
    const req = { contentId, image, title, weather, impression, emotion };

    callAPI('post', '/api/nft', req);
  };
  return (
    <Box
      sx={{
        pl: 3,
        pr: 3,
        pt: 2,
        pb: 2,
      }}
    >
      <Box>
        <Typography>NFT 제출하기</Typography>
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
        <div>
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
        </div>
      </Box>
      <Box
        onClick={() => {
          handleReg();
        }}
      >
        <Typography>제출하기</Typography>
      </Box>
    </Box>
  );
};

export default createNft;
