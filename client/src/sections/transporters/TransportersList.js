import { m } from 'framer-motion';
import PropTypes from 'prop-types';
// @mui
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Paper,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { useEffect, useState } from 'react';
import Iconify from '../../components/Iconify';
import Image from '../../components/Image';
import SocialsButton from '../../components/SocialsButton';
import { MotionContainer } from '../../components/animate';
import useResponsive from '../../hooks/useResponsive';
import { useSelector } from '../../redux/store';
import { fShortenNumber } from '../../utils/formatNumber';
import { fDate } from '../../utils/formatTime';
import TransporterDetails from './TransporterDetails';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  backgroundColor: 'transparent',
  position: 'absolute',
  left: 0,
  top: '58.5vh',
  zIndex: 3,
  width: '100%',
  height: '100vh',
  [theme.breakpoints.up('md')]: {
    top: 0,
    position: 'relative',
    height: '76vh',
    width: '92%',
    marginLeft: 'auto',

    // alignItems: 'center',
    // background: 'linear-gradient(to bottom, #033B3A, #000000)',
  },
}));

const RootStyle2 = styled(m.div)(({ theme }) => ({
  backgroundColor: 'transparent',
  position: 'absolute',
  top: '7vh',
  left: 0,
  zIndex: 4,
  width: '100%',

  [theme.breakpoints.up('md')]: {
    width: '2%',
    height: '79vh',
    marginLeft: 'auto',
    top: '15%',
    left: '35%',
  },
}));

const ContentStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  height: '40%',
  backgroundColor: '#FFFFFF',
  backgroundImage: 'url(/assets/mozaic_transporters_bg.png)',
  overflow: 'auto',
  [theme.breakpoints.up('md')]: {
    height: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: 20,
    paddingBottom: 10,
  },
}));

// ----------------------------------------------------------------------

export default function TransportersList({
  onSelectTransporter,
  selectedTransporterFromMap,
  onIconClick,
}) {
  const isDesktop = useResponsive('up', 'md');

  const { futurDepartures } = useSelector((state) => state.departure);

  const [selectedTransporter, setSelectedTransporter] = useState('');
  const [selectedDeparture, setSelectedDeparture] = useState('');

  const [openCard, setOpenCard] = useState(false);

  const openCardHandler = (departure) => {
    if (selectedDeparture && departure._id === selectedDeparture._id) {
      setOpenCard(!openCard);
    } else {
      setSelectedDeparture(departure);
      setOpenCard(true);
      // dispatch(setTransporter(transporter));
      if (departure) {
        onSelectTransporter(departure);
      }
    }
  };

  useEffect(() => {
    setSelectedTransporter(selectedTransporterFromMap);
    if (selectedTransporterFromMap) {
      openCardHandler(selectedTransporterFromMap);
    }
  }, [selectedTransporterFromMap]);

  const [openCardStates, setOpenCardStates] = useState({});

  const handleToggleOpenCard = (index) => {
    setOpenCardStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <MotionContainer>
      <RootStyle>
        <ContentStyle>
          <CardHeader
            title={
              <>
                {!isDesktop && (
                  <IconButton
                    onClick={onIconClick}
                    sx={{
                      textAlign: 'center',
                      width: '100%',
                      p: 0,
                      m: 0,
                    }}
                  >
                    <Iconify icon='pepicons-pop:line-x' width={50} />
                  </IconButton>
                )}

                <Grid container justifyContent={'space-between'} mt={1} px={2}>
                  <Grid item>Nombre de transporteurs trouvés :</Grid>
                  <Grid item>{futurDepartures?.length}</Grid>
                </Grid>
              </>
            }
            sx={{ textAlign: 'start', p: { xs: 0 }, margin: 0 }}
          />
          <CardContent>
            <Stack
              direction='column'
              sx={{
                width: '100%',
                textAlign: 'start',
              }}
              spacing={2}
            >
              {futurDepartures?.map((departure, index) => (
                <DepartureItem
                  key={index}
                  departure={departure}
                  onClick={() => {
                    openCardHandler(departure);
                    handleToggleOpenCard(index);
                  }}
                  selected={selectedTransporter === departure}
                  openCard={openCardStates[index] || false}
                />
              ))}
            </Stack>
          </CardContent>
        </ContentStyle>
      </RootStyle>
      <RootStyle2>
        {openCard && (
          <Stack sx={{ width: { md: '21vw', xs: '100vw' } }}>
            <TransporterDetails
              transporter={selectedDeparture.transporterId}
              nextDeparture={selectedDeparture}
            />
          </Stack>
        )}
      </RootStyle2>
    </MotionContainer>
  );
}

// ----------------------------------------------------------------------
DepartureItem.propTypes = {
  departure: PropTypes.object,
};

function DepartureItem({ departure, onClick, selected, openCard }) {
  const {
    fName,
    lName,
    transporterPhoto,
    companyActivity,
    totalRating,
    images,
  } = departure.transporterId;

  const { departurePoint, destinationPoint, departureTime } = departure;
  return (
    <Paper
      sx={{
        mx: 1.5,
        borderRadius: 1,
        border: selected ? '2px solid' : 'none',
        my: 1,
      }}
    >
      <Grid container justifyContent={'space-between'}>
        <Grid
          item
          md={8}
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              right: 0,
              height: '80%',
              borderRight: 'solid 1px #B0B0B0',
            },
          }}
        >
          <Stack
            spacing={2.5}
            sx={{
              p: 3,
              pb: 2.5,
              width: '100%',
            }}
          >
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

            <Stack
              direction='row'
              alignItems='center'
              spacing={1}
              sx={{ color: '#000000' }}
            >
              <Stack direction='row' alignItems='center' spacing={1}>
                <Typography variant='caption'>{departurePoint}</Typography>
                <Iconify
                  icon={'uil:arrow-right'}
                  sx={{ width: '10%' }}
                  width={18}
                  height={18}
                />
              </Stack>

              <Stack direction='row' alignItems='center'>
                <Typography variant='caption'> {destinationPoint}</Typography>
              </Stack>
            </Stack>

            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography variant='caption' sx={{ color: '#F56B3D' }}>
                Prochain départ :
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
                  {fDate(departureTime)}
                </Typography>{' '}
                <Iconify icon='iconoir:calendar' width={18} height={18} />
              </Stack>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={1}>
              <SocialsButton initialColor />
            </Stack>
          </Stack>
        </Grid>

        <Grid item md={4}>
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
              ({fShortenNumber(0)})
            </Typography>
          </Stack>

          <Stack
            direction='row'
            sx={{
              p: 2.5,
              display: 'flex',
            }}
          >
            <Image src={images[0]} ratio='1/1' sx={{ borderRadius: 1.5 }} />
          </Stack>

          <Stack
            direction='row'
            alignItems='center'
            justifyContent={'flex-end'}
            mr={2}
          >
            <IconButton size='small' onClick={onClick}>
              <Iconify
                icon={
                  openCard ? 'ri:arrow-right-s-line' : 'ri:arrow-left-s-line'
                }
                width={20}
                height={20}
                sx={{
                  border: '1px solid #E5E8EB',
                  borderRadius: '5px',
                }}
              />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
