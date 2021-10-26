import * as React from 'react';
import { Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
import styled from 'styled-components';
import { height } from '@mui/system';
import ITour from '../../../models/tour/ITour';

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin-right: 13px;
`;

const Container = styled.div`
  width: 100%;
`;
const Panel = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 14px;
`;
const span = styled.span``;
const ContentContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;
export default function TourPanel(props: ITour) {
  const { title, overview, image_url: imageUrl } = props;
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <Panel>
        <div>{loading ? <Skeleton width={100} height={166.67} /> : <Image src={imageUrl} alt="" />}</div>
        <div style={{ width: '70%' }}>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            fontWeight="fontWeightBold"
            style={{ wordWrap: 'break-word' }}
          >
            {title}
          </Typography>
          <ContentContainer>
            <Typography variant="body2" gutterBottom component="div">
              {overview}
            </Typography>
          </ContentContainer>
        </div>
      </Panel>
    </Container>
  );
}
