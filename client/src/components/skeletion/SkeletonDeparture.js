import { Divider, Grid, Skeleton, Stack } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------
export default function SkeletonDeparture() {
  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={'space-evenly'}
        alignItems={'center'}
        sx={{ position: 'relative', width: '100%' }}
      >
        <div
          style={{
            position: 'absolute',
            left: -25,
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: '#F07C60',
          }}
        />
        <Divider
          orientation='horizontal'
          variant='middle'
          flexItem
          sx={{ width: '92%', borderColor: '#000000' }}
        />
        <div
          style={{
            position: 'absolute',
            right: -25,
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: '#F07C60',
          }}
        />
      </Stack>

      <Grid
        container
        direction='row'
        alignItems={'center'}
        justifyContent={'space-evenly'}
        my={2}
      >
        <Grid item md={10}>
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
        </Grid>
      </Grid>
    </>
  );
}
