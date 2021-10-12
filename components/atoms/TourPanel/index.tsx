import * as React from 'react';
import { Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
import styled from 'styled-components';
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
  const {
    title,
    content_id,
    content_type_id,
    total_count,
    page_no,
    img_name,
    num_of_rows,
    overview,
    image_url,
  } = props;
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <Panel>
        <div>{loading ? <Skeleton width={100} height={166.67} /> : <Image src={image_url} alt="" />}</div>
        <div>
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