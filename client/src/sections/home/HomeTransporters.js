// ----------------------------------------------------------------------
// @mui
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
// routes
// redux
import { useDispatch, useSelector } from '../../redux/store.js';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: 'transparent',
  [theme.breakpoints.up('md')]: {
    width: '100%',
    height: '130vh',
    // background: 'linear-gradient(to bottom, #033B3A, #000000)',
  },
}));


// ----------------------------------------------------------------------

export default function HomeTransporters() {
  const dispatch = useDispatch();

  const { transporters } = useSelector((state) => state.transporter);

  // useEffect(() => {
  //   dispatch(getTransporters());
  // }, [dispatch]);

  return (
    <RootStyle>
      <Container maxWidth={'xl'}>
        <Typography
          variant='h2'
          color='white'
          sx={{ whiteSpace: 'nowrap', fontSize: { xs: 23, md: '44px' } }}
        >
          Les transporteurs de Colidiali
        </Typography>
        <Divider sx={{ borderColor: 'white', marginY: 2 }} />
        <Stack
          direction='row'
          alignItems={'center'}
          spacing={1}
          my={{ xs: 5, md: 3 }}
        >
          <Typography variant='h6' color='white' my={2}>
            Départs vers le Maroc{' '}
          </Typography>
          <Iconify icon={'twemoji:flag-morocco'} width={20} height={20} />
        </Stack>
        <Box
          sx={{
            display: 'grid',
            gap: 8,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
          }}
        >
          {transporters?.map((transporter, index) => (
            <TransporterItem transporter={transporter} key={index} />
          ))}
        </Box>

        <Stack
          direction='row'
          alignItems={'center'}
          spacing={1}
          my={{ xs: 5, md: 3 }}
        >
          <Typography variant='h6' color='white' my={2}>
            Départs du Maroc{' '}
          </Typography>
          <Iconify icon={'twemoji:flag-morocco'} width={20} height={20} />
        </Stack>
        <Box
          sx={{
            display: 'grid',
            gap: 8,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
          }}
        >
          {transporters?.map((transporter, index) => (
            <TransporterItem transporter={transporter} key={index} />
          ))}
        </Box>

        <Stack direction='row' justifyContent={'center'} my={5}>
          <Button
            variant='contained'
            size='large'
            sx={{ p: '15px 50px' }}
            color='warning'
          >
            Afficher la carte
          </Button>
        </Stack>
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------
TransporterItem.propTypes = {};

function TransporterItem({ transporter }) {
  const theme = useTheme();

  const {
    fName,
    lName,
    businessName,
    email,
    phone,
    photoUrl,
    departure,
    destination,
    city,
  } = transporter;

  return (
    <Card>
      <Stack spacing={3} sx={{ pt: 3, px: 3 }}>
        <Stack direction='row' alignItems='center'>
          <Avatar src={photoUrl} sx={{ width: 48, height: 48 }} />
          <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
            <Typography variant='subtitle2' sx={{ mb: 0.5 }} nowrap>
              {fName} {lName}
            </Typography>
            <Typography variant='body' sx={{ color: 'text.secondary' }} nowrap>
              {businessName}
            </Typography>
          </Box>

          <Tooltip title={phone}>
            <IconButton
              size='small'
              bgcolor='#E6E6E6'
              m={1}
              sx={{ backgroundColor: '#E6E6E6' }}
            >
              <Iconify icon='mingcute:phone-call-line' width={30} height={30} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <CardContent sx={{ paddingY: 0 }}>
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 2,
            },
          }}
        >
          <TimelineItem>
            <TimelineSeparator sx={{ height: 100 }}>
              <TimelineDot variant='outlined' color='primary'>
                <Iconify icon={'ph:map-pin-fill'} color='primary' />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: 'common.primary' }} />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant='subtitle2'>Point de départ</Typography>
              <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                {departure}
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot variant='outlined' color='primary'>
                <Iconify icon={'ph:map-pin-fill'} color='primary' />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant='subtitle2'>Destination</Typography>
              <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                {destination}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
      <Stack spacing={3} sx={{ px: 3, pb: 3 }}>
        <Stack direction='row' alignItems='center'>
          <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
            <Typography variant='subtitle2' sx={{ mb: 0.5 }} nowrap>
              <Iconify icon={'eva:flash-fill'} width={22} height={22} />
              {city}
            </Typography>
          </Box>

          <Button variant={'contained'} size='small' color={'warning'}>
            View Profile
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
