import PropTypes from 'prop-types';
// @mui
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { Grid, Typography } from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function TransporterItinerary({ trajectory, companyAddress }) {
  return (
    <Grid
      container
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none',
        },
      }}
    >
      <Grid item md={12}>
        <Timeline>
          <TrajectoryItem
            trajectory={trajectory || {}}
            companyAddress={companyAddress}
          />
        </Timeline>
      </Grid>
    </Grid>
  );
}

// ----------------------------------------------------------------------

TrajectoryItem.propTypes = {
  address: PropTypes.shape({
    time: PropTypes.instanceOf(Date),
    city: PropTypes.string,
  }),
};

function TrajectoryItem({ trajectory, companyAddress }) {
  const {
    departureCoordinates,
    departureTime,
    destinationCoordinates,
    destinationTime,
    checkPoints,
  } = trajectory;

  return (
    <>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color={'warning'} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          {departureCoordinates ? (
            <Typography
              variant='subtitle2'
              sx={{
                color: 'text.secondary',
                fontWeight: 550,
                fontSize: '0.8rem',
              }}
            >
              {departureCoordinates.formattedAddress},
              {departureTime && fDate(departureTime)}
            </Typography>
          ) : (
            <Typography
              variant='subtitle2'
              sx={{
                color: 'text.secondary',
                fontWeight: 550,
                fontSize: '0.8rem',
              }}
            >
              {companyAddress}
            </Typography>
          )}

          <Typography variant='caption'>Point de départ</Typography>
        </TimelineContent>
      </TimelineItem>

      {checkPoints?.map((checkPoint, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot color={'success'} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              variant='subtitle2'
              sx={{
                color: 'text.secondary',
                fontWeight: 550,
                fontSize: '0.8rem',
              }}
            >
              {checkPoint.point}
            </Typography>
            <Typography variant='caption'>Point d’arrêt {index + 1}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}

      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot>
            <Iconify icon='ion:location-sharp' color='#000000' />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          {destinationCoordinates ? (
            <Typography
              variant='subtitle2'
              sx={{ color: 'text.secondary', fontWeight: 550 }}
            >
              {destinationCoordinates.formattedAddress}{' '}
              {destinationTime && fDate(destinationTime)}
            </Typography>
          ) : (
            <Typography
              variant='subtitle2'
              sx={{ color: 'text.secondary', fontSize: '0.8rem' }}
            >
              Aucun depart est programmé
            </Typography>
          )}

          <Typography variant='caption'>Destination</Typography>
        </TimelineContent>
      </TimelineItem>
    </>
  );
}
