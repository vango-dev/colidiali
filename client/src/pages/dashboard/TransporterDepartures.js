import { Card, Container, Grid, IconButton } from '@mui/material';
import { m } from 'framer-motion';
import React, { useState } from 'react';
import { MotionContainer, varFade, varSlide } from '../../components/animate';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import { HEADER } from '../../config';
import useResponsive from '../../hooks/useResponsive';
import {
  DepartureNewEditForm,
  DeparturesList,
} from '../../sections/dashboard/departure';

// ----------------------------------------------------------------------

/**
 *
 * TODO : Move the position of the title Departures depend on the size of the screen;
 * TODO : Adjust the Departure Item
 * TODO : Responsive Form and Departure Card
 * TODO : For the navbar change the form depend on the form
 */

export default function TransporterDepartures() {
  const lgUp = useResponsive('up', 'lg');

  const [selectedGrid, setSelectedGrid] = useState(true);

  return (
    <Page title='Transporteur: Departures'>
      <Grid
        container
        alignItems={'center'}
        justifyContent={'flex-start'}
        sx={{
          top: -10,
          position: 'relative',
        }}
      >
        {lgUp ? (
          <>
            <Grid item xs={12} lg={6}>
              <Card
                sx={{
                  backgroundColor: '#F4F6F8',
                  border: 'none',
                  zIndex: 99999,
                }}
                variant='outlined'
              >
                <Container maxWidth='sm'>
                  <DepartureNewEditForm />
                </Container>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <DeparturesList />
            </Grid>
          </>
        ) : selectedGrid ? (
          <MotionContainer
            sx={{
              width: '100%',
              height: '100%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <m.div variants={varSlide().inUp}>
              <Grid item xs={12} md={12} lg={7}>
                <DeparturesList />
              </Grid>
            </m.div>
          </MotionContainer>
        ) : (
          <MotionContainer sx={{ width: '100%' }}>
            <m.div variants={varSlide().inDown}>
              <Grid item xs={12} lg={7}>
                <Card
                  sx={{
                    backgroundColor: '#F4F6F8',
                    border: 'none',
                    zIndex: 99999,
                  }}
                >
                  <Container maxWidth='sm'>
                    <DepartureNewEditForm />
                  </Container>
                </Card>
              </Grid>
            </m.div>
          </MotionContainer>
        )}

        {!lgUp && (
          <IconButton
            size={'small'}
            sx={{
              position: 'fixed',
              backgroundColor: 'white',
              bottom: selectedGrid && 0,
              top: !selectedGrid && HEADER.MOBILE_HEIGHT,
              right: '42.5vw',
              zIndex: 100,
              borderRadius: '2px 2px 0px 0px',
              height: '2.5vh',
              width: '20vw',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add bottom shadow
              '&:hover': {
                backgroundColor: '#f0f0f0',
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => setSelectedGrid(!selectedGrid)}
          >
            <Iconify
              icon={
                selectedGrid
                  ? 'iconamoon:arrow-up-2-bold'
                  : 'iconamoon:arrow-down-2-bold'
              }
              height={20}
              width={20}
            />
          </IconButton>
        )}
      </Grid>
    </Page>
  );
}
