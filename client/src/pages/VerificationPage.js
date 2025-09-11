import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import Iconify from '../components/Iconify';
import Page from '../components/Page';

const VerificationPage = () => {
  return (
    <Page title='Écran de vérification'>
      <Container maxWidth='xl'>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          my={10}
        >
          <Grid md={12} sx={{ textAlign: 'center' }}>
            <Typography variant='h3'>
              Your account is under verification
            </Typography>
          </Grid>
          <Grid item md={12} sx={{ textAlign: 'center' }}>
            <Iconify
              icon='line-md:downloading-loop'
              height={150}
              width={150}
              color={'#000000'}
            />
          </Grid>
          <Grid item md={12} sx={{ textAlign: 'center' }}>
            <Typography variant='subtitle1'>
              a message will be sent to inform you about the activation of your
              account
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default VerificationPage;
