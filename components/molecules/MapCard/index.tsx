import { Card, CardMedia } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export interface IMapCardProps {
  title: string;
  imageUrl: string;
  distance: string;
  onClick: () => void;
}

export default function MapCard(props: IMapCardProps) {
  const { imageUrl, title, distance, onClick } = props;
  return (
    <Card onClick={onClick} sx={{ display: 'flex', borderRadius: '1em', minWidth: '200px' }}>
      <Box sx={{ display: 'flex', padding: 1 }}>
        <CardMedia
          className="map-image"
          component="img"
          sx={{ width: 80, height: 80, borderRadius: '1em' }}
          image={imageUrl}
          alt=""
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: '1 0 auto', padding: 1 }}>
            <Typography component="div" variant="h6">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {distance}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
