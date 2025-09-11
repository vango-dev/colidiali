import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { useState } from 'react';
// @mui
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Pagination,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fDate, fToNow } from '../../utils/formatTime';
import { fShortenNumber } from '../../utils/formatNumber';
// components
import TransporterSort from './TransporterSort';
import { MotionContainer } from '../../components/animate';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------
const RootStyle = styled(m.div)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: '98%',
    height: '80%',
    position: 'absolute',
    top: '10vh',
    left: '1%',
    zIndex: 110,
  },
}));

const ContentStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',

  [theme.breakpoints.up('md')]: {
    height: '100%',

    // display: 'flex',
    // textAlign: 'left',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '0',
    paddingBottom: 10,
  },
}));

// ----------------------------------------------------------------------

export default function TransporterReviews({ transporter, reviewHandler }) {
  return (
    <MotionContainer>
      <RootStyle>
        <ContentStyle>
          <CardHeader
            title='Avis'
            action={
              <IconButton onClick={reviewHandler}>
                <Iconify icon='mdi:close' width={20} height={20} />
              </IconButton>
            }
            sx={{ textAlign: 'start', py: 1 }}
          />
          <CardContent sx={{ pt: 0 }}>
            {transporter?.reviews > 0 ? (
              <>
                <Stack
                  direction='row'
                  spacing={1}
                  flexShrink={0}
                  justifyContent={'flex-end'}
                >
                  <TransporterSort />
                </Stack>
                <Stack
                  direction='row'
                  spacing={1}
                  flexShrink={0}
                  justifyContent={'flex-start'}
                  mb={2}
                >
                  <Button variant='outlined' color='primary'>
                    All
                  </Button>
                  <Button variant='outlined' color='primary'>
                    Service
                  </Button>
                </Stack>

                <Box>
                  <List disablePadding>
                    {transporter?.reviews?.map((review, index) => (
                      <ReviewItem key={index} review={review} />
                    ))}
                  </List>
                </Box>
                {/* <Box
            sx={{
              position: 'absolute',
              top: '95%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Pagination count={8} color='primary' />
          </Box> */}
              </>
            ) : (
              <Stack direction='row' sx={{ mt: 2 }}>
                <Typography variant='subtitle1'>Aucun commentaire</Typography>
              </Stack>
            )}
          </CardContent>
        </ContentStyle>
      </RootStyle>
    </MotionContainer>
  );
}

// ----------------------------------------------------------------------

ReviewItem.propTypes = {
  review: PropTypes.object,
};

function ReviewItem({ review }) {
  const [isHelpful, setHelpfuls] = useState(false);

  const { fName, lName, rating, comment, helpful, postedAt, avatarUrl } =
    review;

  const handleClickHelpful = () => {
    setHelpfuls((prev) => !prev);
  };

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          mb: 2,
          alignItems: 'flex-start',
          flexDirection: { xs: 'column', sm: 'row', md: 'column' },
          borderBottom: 'solid 1px #DADCE0',
        }}
      >
        <Grid container justifyContent={'flex-start'} alignItems={'center'}>
          <Grid container justifyContent={'flex-start'} alignItems={'center'}>
            <Grid item md={3}>
              <Avatar
                src={avatarUrl}
                sx={{
                  mr: { xs: 2, sm: 0 },
                  mb: { sm: 2 },
                  width: { md: 64 },
                  height: { md: 64 },
                }}
              />
            </Grid>
            <Grid item md={8}>
              <div>
                <Typography variant='subtitle2' noWrap>
                  {fName} {lName}
                </Typography>
                <Typography
                  variant='caption'
                  sx={{ color: 'text.secondary' }}
                  noWrap
                >
                  ' {fDate(postedAt)}'
                </Typography>
              </div>
            </Grid>
          </Grid>

          <Grid container alignItems={'center'} spacing={5}>
            <Grid item md={3}>
              <Rating
                size='small'
                value={rating}
                precision={0.1}
                readOnly
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: '#000000', // Change this to the desired color
                  },
                  '& .MuiRating-iconEmpty': {
                    color: '#000000', // Change this to the desired color for empty stars
                  },
                }}
              />
            </Grid>
            <Grid item md={9}>
              <Typography
                variant='subtitle2'
                sx={{ color: 'text.secondary' }}
                noWrap
              >
                {fToNow(postedAt)}
              </Typography>
            </Grid>
          </Grid>

          <Grid container my={2}>
            <Grid md={12}>
              <Typography variant='body2'>{comment}</Typography>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <Divider
              orientation='vertical'
              variant='middle'
              flexItem
              sx={{ backgroundColor: '#DADCE0', mx: 2 }}
            />

            {!isHelpful && (
              <Typography variant='body2' sx={{ mr: 1 }}>
                Was this review helpful to you?
              </Typography>
            )}

            <Button
              size='small'
              color='inherit'
              startIcon={
                <Iconify
                  icon={!isHelpful ? 'ic:round-thumb-up' : 'eva:checkmark-fill'}
                />
              }
              onClick={handleClickHelpful}
            >
              {isHelpful ? 'Helpful' : 'Thank'}(
              {fShortenNumber(!isHelpful ? helpful : helpful + 1)})
            </Button>
          </Box>
        </Grid>
      </ListItem>
    </>
  );
}
