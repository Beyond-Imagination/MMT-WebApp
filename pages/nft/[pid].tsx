import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { nftActions } from '../../store/nft';
import { RootState } from '../../store';
import { Loading } from '../../components/atoms';

const ContentContainer = styled('div')`
  display: flex;
  padding: 5px 25px;
`;
const ContentTitle = styled('div')`
  width: 85px;
`;
const NftDetail = () => {
  const router = useRouter();
  const { pid } = router.query;
  const dispatch = useDispatch();
  const nft = useSelector((state: RootState) => nftActions.nftSelector(state));

  useEffect(() => {
    // dispatch(newsActions.setSelected(parseQuery(location.search).id));
    dispatch(nftActions.setSelected(pid));
  }, [dispatch, router]);

  if (nft === undefined) {
    return <Loading />;
  }
  return (
    <div style={{ width: '100%' }}>
      <Box style={{ height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight={800}>
          {nft.title}
        </Typography>
      </Box>
      <div style={{ width: '100%' }}>
        <img style={{ width: '100%' }} src={nft.image} alt="" />
      </div>
      <ContentContainer>
        <ContentTitle>
          <Typography variant="subtitle1" fontWeight={800}>
            소감
          </Typography>
        </ContentTitle>
        <div>{nft.impression}</div>
      </ContentContainer>
      <ContentContainer>
        <ContentTitle>
          <Typography variant="subtitle1" fontWeight={800}>
            기분
          </Typography>
        </ContentTitle>
        <div>{nft.emotion}</div>
      </ContentContainer>
      <ContentContainer>
        <ContentTitle>
          <Typography variant="subtitle1" fontWeight={800}>
            날씨
          </Typography>
        </ContentTitle>
        <div>{nft.weather}</div>
      </ContentContainer>
    </div>
  );
};

export default NftDetail;
