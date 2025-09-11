import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Rating,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Iconify from '../../components/Iconify';
import SocialsButton from '../../components/SocialsButton';
import TransporterGallery from '../../sections/transporters/TransporterGallery';
import TransporterItinerary from '../../sections/transporters/TransporterItinerary';
import TransporterReviewOverview from '../../sections/transporters/TransporterReviewOverview';
import TransporterReviews from '../../sections/transporters/TransporterReviews';
import { fShortenNumber } from '../../utils/formatNumber';
import { fDate } from '../../utils/formatTime';
import TransporterAbout from './TransporterAbout';

// ----------------------------------------------------------------------
export default function TransporterDetails({ transporter, nextDeparture }) {
  const {
    fName,
    lName,
    transporterPhoto,
    companyActivity,
    totalRating,
    images,
    companyAddress,
  } = transporter;

  const [currentTab, setCurrentTab] = useState('Itinéraire');

  const TRANSPORTER_TABS = [
    {
      value: 'Itinéraire',
      component: (
        <TransporterItinerary
          trajectory={nextDeparture}
          companyAddress={companyAddress}
        />
      ),
    },
    {
      value: 'Avis',
      component: (
        <TransporterReviews
          transporter={transporter}
          reviewHandler={() => setCurrentTab('Itinéraire')}
        />
      ),
    },
    {
      value: 'A propos',
      component: <TransporterAbout transporter={transporter} />,
    },
  ];

  const links = {
    whatsApp: transporter?.transporterWhatsApp,
    facebook: transporter?.transporterFacebook,
    instagram: transporter?.transporterInstagram,
  };

  return (
    <Card
      sx={{
        //  maxWidth: { md: 404, xs: '100%' },
        border: '2px solid',
        borderRadius: 1.5,
      }}
    >
      <TransporterGallery images={images} />

      <CardContent
        sx={{
          //  maxHeight: { md: 'calc(100vh - 400px)', xs: 'calc(91vh - 300px)' },
          overflow: 'auto', // Enable scroll functionality
          scrollbarWidth: 'none', // For Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // For WebKit browsers
          },
        }}
      >
        <Grid
          container
          justifyContent={{ md: 'space-evenly', xs: 'space-between' }}
        >
          <Grid item md={7}>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Avatar alt={'name'} src={transporterPhoto} />
              <div>
                <Typography variant='subtitle2'>
                  {fName} {lName}
                </Typography>
                <Stack
                  direction='row'
                  display='flex'
                  alignItems={'center'}
                  mt={0.5}
                  spacing={1}
                >
                  <Iconify icon='mdi:truck' width={16} height={16} />
                  <Typography
                    variant='caption'
                    sx={{
                      color: 'text.disabled',
                      display: 'block',
                    }}
                  >
                    {companyActivity}
                  </Typography>
                </Stack>
              </div>
            </Stack>
          </Grid>
          <Grid item md={5}>
            <Stack
              direction='row'
              justifyContent={'center'}
              alignItems={'center'}
              spacing={1}
              paddingTop={1}
            >
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {totalRating}
              </Typography>
              <Rating
                value={totalRating}
                size='small'
                readOnly
                precision={0.5}
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: '#000000', // Change this to the desired color
                  },
                  '& .MuiRating-iconEmpty': {
                    color: '#000000', // Change this to the desired color for empty stars
                  },
                }}
              />

              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {totalRating && fShortenNumber(totalRating)}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Grid container my={2} ml={2}>
          <Grid item>
            {nextDeparture?.departureTime ? (
              <Stack direction='row' alignItems='center' spacing={2}>
                <Typography variant='caption' sx={{ color: '#F56B3D' }}>
                  Date de depart :
                </Typography>

                <Stack
                  direction='row'
                  alignItems='center'
                  spacing={1}
                  sx={{
                    borderStyle: 'solid',
                    borderWidth: '2px',
                    borderRadius: 1,
                    borderColor: 'text.disabled',
                    p: '3px',
                  }}
                >
                  <Typography variant='caption'>
                    {nextDeparture.departureTime &&
                      fDate(nextDeparture?.departureTime)}
                  </Typography>
                  <Iconify icon='iconoir:calendar' width={18} height={18} />
                </Stack>
              </Stack>
            ) : (
              <Stack
                direction='row'
                alignItems='center'
                sx={{
                  borderStyle: 'solid',
                  borderWidth: '2px',
                  borderRadius: 1,
                  borderColor: '#F56B3D',
                  p: '3px',
                }}
                spacing={2}
              >
                <Typography variant='caption' sx={{ color: '#F56B3D' }}>
                  Aucun départ est programmé
                </Typography>
              </Stack>
            )}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={12}>
            <Tabs
              value={currentTab}
              scrollButtons='auto'
              allowScrollButtonsMobile
              onChange={(e, value) => setCurrentTab(value)}
              centered
            >
              {TRANSPORTER_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  label={tab.value}
                  value={tab.value}
                />
              ))}
            </Tabs>

            <Box />

            {TRANSPORTER_TABS.map((tab) => {
              const isMatched = tab.value === currentTab;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
          </Grid>
        </Grid>

        <Divider />

        <Grid container my={1}>
          <Grid item md={12}>
            <Typography variant='subtitle1'>Socials</Typography>
          </Grid>
          <Grid
            item
            md={12}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <SocialsButton initialColor links={links} />
          </Grid>
        </Grid>

        <Divider />

        <Grid container>
          <Grid item md={12}>
            <TransporterReviewOverview transporter={transporter} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
