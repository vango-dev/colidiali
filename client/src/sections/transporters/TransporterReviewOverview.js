import PropTypes from 'prop-types';
import sumBy from 'lodash/sumBy';
// @mui
import { styled } from '@mui/material/styles';
import {
  Grid,
  Rating,
  Button,
  Typography,
  LinearProgress,
  Stack,
  Link,
} from '@mui/material';
// utils
import { fShortenNumber } from '../../utils/formatNumber';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const RatingStyle = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1),

  '& .MuiRating-iconFilled': {
    color: '#000000', // Change this to the desired color
  },
  '& .MuiRating-iconEmpty': {
    color: '#000000', // Change this to the desired color for empty stars
  },
}));

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  // '&:nth-of-type(2)': {
  //   [theme.breakpoints.up('md')]: {
  //     borderLeft: `solid 1px ${theme.palette.divider}`,
  //     borderRight: `solid 1px ${theme.palette.divider}`,
  //   },
  // },
}));

// ----------------------------------------------------------------------

TransporterReviewOverview.propTypes = {
  transporter: PropTypes.object,
  onOpen: PropTypes.func,
};

export default function TransporterReviewOverview({ transporter, onOpen }) {
  const { totalRating, totalReview, ratings } = transporter;

  const total = sumBy(ratings, (star) => star.starCount);

  return (
    <Grid container>
      <GridStyle item xs={12} md={8}>
        <Typography variant='subtitle1' gutterBottom>
          Evaluation globale
        </Typography>
        <Stack spacing={1.5} sx={{ width: 1 }}>
          {ratings &&
            ratings
              .slice(0)
              .reverse()
              .map((rating) => (
                <ProgressItem key={rating.name} star={rating} total={total} />
              ))}
        </Stack>
      </GridStyle>

      <GridStyle item xs={12} md={4}>
        <Typography variant='h4' gutterBottom sx={{ color: 'error.main' }}>
          {totalRating}/5
        </Typography>
        <RatingStyle
          readOnly
          value={totalRating}
          precision={0.1}
          size='small'
        />
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          ({fShortenNumber(totalReview)}
          &nbsp;reviews)
        </Typography>
      </GridStyle>

      {/* <GridStyle item xs={12} md={4}>
        <Link href='#move_add_review' underline='none'>
          <Button
            size='large'
            onClick={onOpen}
            variant='outlined'
            startIcon={<Iconify icon={'eva:edit-2-fill'} />}
          >
            Write your review
          </Button>
        </Link>
      </GridStyle> */}
    </Grid>
  );
}

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  star: PropTypes.object,
  total: PropTypes.number,
};

function ProgressItem({ star, total }) {
  const { name, starCount, reviewCount } = star;
  return (
    <Stack direction='row' alignItems='center' spacing={1.5}>
      <Typography variant='subtitle2'>{name.split(' ')[0]}</Typography>
      <LinearProgress
        variant='determinate'
        value={(starCount / total) * 100}
        sx={{
          mx: 2,
          flexGrow: 1,
          bgcolor: 'divider',
        }}
      />
      <Typography
        variant='body2'
        sx={{ color: 'text.secondary', minWidth: 64, textAlign: 'left' }}
      >
        {fShortenNumber(reviewCount)}
      </Typography>
    </Stack>
  );
}
