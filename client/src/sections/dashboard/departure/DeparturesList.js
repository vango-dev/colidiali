import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Pagination,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Iconify from '../../../components/Iconify';
import { SkeletonDeparture } from '../../../components/skeletion';
import { HEADER } from '../../../config';
import {
  clearPage,
  getTransporterDepartures,
} from '../../../redux/slices/departure';
import { dispatch, useSelector } from '../../../redux/store';
import DepartureItem from './DepartureItem';
import DepartureWidget from './DepartureWidget';

// ----------------------------------------------------------------------
const ContentStyle = styled('div')(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  height: '100vh',
  width: '47vw',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  backgroundColor: '#EF6E4F',
  backgroundImage: 'url(/assets/mozaic_bg2.png)',
  [theme.breakpoints.up('lg')]: {
    position: 'fixed',
    top: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    right: 0,
    width: '47vw',
  },
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '0',
    paddingBottom: 10,
  },
}));
// ----------------------------------------------------------------------

export default function DeparturesList() {
  const {
    currentPage,
    isLoading,
    pastDepartures,
    futurDepartures,
    totalFuturPages,
    totalPastPages,
    AllFuturDepartures,
    AllPastDepartures,
  } = useSelector((state) => state.departure);

  const [currentTab, setCurrentTab] = useState('Prochain départs');

  const handlePageChange = (event, value) => {
    dispatch(getTransporterDepartures(Number(value)));
  };

  const DEPARTURES_TABS = [
    {
      value: 'Prochain départs',
      icon: <Iconify icon={'raphael:future'} width={20} height={20} />,
      component: (
        <TransporterNextDepartures
          futurDepartures={futurDepartures}
          isLoading={isLoading}
        />
      ),
    },
    {
      value: 'Anciens départs',
      icon: <Iconify icon={'jam:task-list'} width={20} height={20} />,
      component: (
        <TransporterOldDepartures
          pastDepartures={pastDepartures}
          isLoading={isLoading}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(clearPage());
    dispatch(getTransporterDepartures());
  }, []);

  return (
    <ContentStyle>
      <Card
        sx={{
          height: '85%',
          width: '90%',
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowY: 'auto',
        }}
      >
        <Box>
          <CardHeader
            title={
              <Typography variant='h3' sx={{ textAlign: 'center' }}>
                Departures
              </Typography>
            }
            sx={{
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: '0 4px 4px -4px rgba(0, 0, 0, 0.5)',
              paddingY: '8px',
            }}
          />
          <CardContent>
            <Grid container justifyContent='center' gap={2}>
              <Grid item md={5}>
                <DepartureWidget
                  title='Prochains départs'
                  total={AllFuturDepartures?.length}
                  icon={'raphael:future'}
                  color='primary'
                />
              </Grid>
              <Grid item md={5}>
                <DepartureWidget
                  title='Anciens départs'
                  total={AllPastDepartures?.length}
                  icon={'jam:task-list'}
                  color='warning'
                />
              </Grid>
            </Grid>

            <Tabs
              scrollButtons='auto'
              allowScrollButtonsMobile
              value={currentTab}
              onChange={(e, value) => {
                setCurrentTab(value);
                dispatch(clearPage());
                dispatch(getTransporterDepartures(1));
              }}
              sx={{
                '& .MuiTabs-indicator': {
                  width: '5vw !important',
                  marginLeft: '18%',
                },
              }}
            >
              {DEPARTURES_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  label={tab.value}
                  value={tab.value}
                  sx={{
                    flexGrow: 1,
                  }}
                  iconPosition='start'
                  icon={tab.icon}
                />
              ))}
            </Tabs>
            <Box sx={{ mb: 2 }} />
            {DEPARTURES_TABS.map((tab) => {
              const isMatched = tab.value === currentTab;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}

            <Divider
              orientation='horizontal'
              variant='middle'
              flexItem
              sx={{
                width: '95%',
                borderColor: '#000000',
                alignSelf: 'center',
              }}
            />
          </CardContent>
          <Stack direction='row' justifyContent={'center'} mb={1}>
            {currentTab === 'Prochain départs'
              ? totalFuturPages > 1 && (
                  <Pagination
                    count={totalFuturPages}
                    page={Number(currentPage)}
                    onChange={handlePageChange}
                    color='primary'
                    disabled={isLoading}
                  />
                )
              : totalPastPages > 1 && (
                  <Pagination
                    count={totalPastPages}
                    page={Number(currentPage)}
                    onChange={handlePageChange}
                    color='primary'
                    disabled={isLoading}
                  />
                )}
          </Stack>
        </Box>
      </Card>
    </ContentStyle>
  );
}

// ----------------------------------------------------------------------
function TransporterNextDepartures({ isLoading, futurDepartures }) {
  if (!isLoading && futurDepartures?.length === 0) {
    return (
      <Stack
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
        mb={2}
      >
        <Iconify icon='ph:empty' width={30} height={30} color='#D75A3A' />
        <Typography variant='h6' sx={{ textAlign: 'center' }}>
          Aucun prochain départ trouvé.
        </Typography>
      </Stack>
    );
  }
  return (isLoading ? [...Array(5)] : futurDepartures).map((departure, index) =>
    departure ? (
      <DepartureItem key={index} departure={departure} />
    ) : (
      <SkeletonDeparture key={index} />
    )
  );
}

// ----------------------------------------------------------------------
function TransporterOldDepartures({ isLoading, pastDepartures }) {
  if (!isLoading && pastDepartures?.length === 0) {
    return (
      <Stack
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
        mb={2}
      >
        <Iconify icon='ph:empty' width={30} height={30} color='#D75A3A' />
        <Typography variant='h6' sx={{ textAlign: 'center' }}>
          Aucun départ effectué.
        </Typography>
      </Stack>
    );
  }
  return (isLoading ? [...Array(5)] : pastDepartures).map((departure, index) =>
    departure ? (
      <DepartureItem key={index} departure={departure} />
    ) : (
      <SkeletonDeparture key={index} />
    )
  );
}
