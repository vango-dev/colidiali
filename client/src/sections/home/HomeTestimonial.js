import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import Slider from 'react-slick';
// @mui
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Divider,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
// components
import { MotionContainer } from '../../components/animate';
import { CarouselArrows, CarouselDots } from '../../components/carousel';

// ----------------------------------------------------------------------

const TESTIMONIALS = [
  {
    title: 'Our Company overview1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Mauris quis quam dolor. Etiam eu enim at dui feugiat tempor quis eu magna.Praesent consectetur ...',
  },
  {
    title: 'Our Company overview2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Mauris quis quam dolor. Etiam eu enim at dui feugiat tempor quis eu magna.Praesent consectetur ...',
  },
  {
    title: 'Our Company overview3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Mauris quis quam dolor. Etiam eu enim at dui feugiat tempor quis eu magna.Praesent consectetur ...',
  },
];

const RootStyle = styled(m.div)(({ theme }) => ({
  backgroundColor: 'transparent',

  [theme.breakpoints.up('md')]: {
    width: '100%',
    height: '65vh',
    // alignItems: 'center',
    // background: 'linear-gradient(to bottom, #033B3A, #000000)',
  },
}));

const ContentStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: '#014242',
  [theme.breakpoints.up('md')]: {
    height: '100%',
    flexDirection: 'row',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '0',
  },
}));

// ----------------------------------------------------------------------

export default function HomeTestimonial() {
  const theme = useTheme();
  const carouselRef = useRef(null);

  const settings = {
    dots: true,
    arrows: false,
    speed: 800,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    adaptiveHeight: true,

    ...CarouselDots({
      zIndex: 9,
      color: 'white',
      top: -22,
      left: -20,
      position: 'absolute',
      marginBottom: 5,
    }),
  };

  return (
    <MotionContainer>
      <RootStyle>
        <Container
          maxWidth={'xl'}
          sx={{ paddingX: { md: '16px', xs: 0 }, color: 'white' }}
        >
          <Typography
            variant='h3'
            mt={2}
            sx={{ textAlign: { md: 'start', xs: 'center' } }}
          >
            Lorem ipsum dolor sit amet
          </Typography>
          <Divider
            sx={{
              borderColor: 'white',
              marginY: { md: 5, xs: 3 },
              marginX: { md: 0, xs: 3 },
            }}
          />

          <ContentStyle
            sx={{
              paddingY: 5,
            }}
          >
            <CardMedia
              component='img'
              sx={{
                width: { md: 'fit-content', xs: '100%' },
                py: 2,
              }}
              src='./assets/loading_map.png'
            />

            <CardContent
              sx={{
                textAlign: 'start',
                width: { xs: '100%', md: '50%' },
              }}
            >
              <Slider ref={carouselRef} {...settings}>
                {TESTIMONIALS.map((testimonial, index) => (
                  <div key={index}>
                    <CarouselItem item={testimonial} />
                  </div>
                ))}
              </Slider>
            </CardContent>
          </ContentStyle>
        </Container>
      </RootStyle>
    </MotionContainer>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string,
  }),
};

function CarouselItem({ item }) {
  const { title, description } = item;

  return (
    <Stack
      spacing={2}
      sx={{ minHeight: 60, position: 'relative', p: 3, color: 'white' }}
    >
      <Stack direction='row' alignItems='center' spacing={2}>
        <div>
          <Typography variant='h6'>{title}</Typography>
        </div>
      </Stack>

      <Typography variant='body1'>{description}</Typography>
    </Stack>
  );
}
