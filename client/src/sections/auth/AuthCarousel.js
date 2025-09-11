import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';
// @mui
import { Box, Card, CardContent, Link, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// components
import { MotionContainer, varFade } from '../../components/animate';
import { CarouselDots } from '../../components/carousel';
import Image from '../../components/Image';

// ----------------------------------------------------------------------
const OverlayStyle = styled('div')(({ theme }) => ({
  top: '69%',
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.25),
}));
// ----------------------------------------------------------------------

const AUTH_IMAGES = [
  {
    title: 'Proident dolore',
    description:
      'Qui laborum occaecat officia aliquao et in irure Lorem mollit est cillum.  Deserunt voluptate ipsum adipisicing ex esse dolore. Culpa dolor eiusmod quis elit consequat aute ullamco amet labore nulla proident ipsum pariatur. Aute ex amet ea ipsum.',
    image: '../assets/image 6_tall.png',
  },
  {
    title: 'Consequat adipisicing ',
    description:
      'Aliquip consequat aliqua deserunt irure ve cia ad dolore adipisicing tempor cupidatat ullamco. Velit deserunt labore in ipsum commodo culpa et occaecat. Lorem eiusmod est velit laboris.',
    image: '../assets/image 6_tall.png',
  },
  {
    title: 'Fugiat laboris ',
    description:
      'Dolor eiusmod quis Lorem culpa cillum excepteur. Nostrud elit ut cupidatat enim nisi id aliquip esse incididunt dolor aliquip sint anim. Excepteur amet voluptate do adipisicing officia reprehenderit magna esse ullamco incididunt cillum officia in. Consequat voluptate magna do Lorem amet.',
    image: '../assets/image 6_tall.png',
  },
];

export default function AuthCarousel() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_current, next) => setCurrentIndex(next),
    ...CarouselDots({
      zIndex: 9,
      top: '92%',
      left: 15,
      position: 'absolute',
      color: '#ffffff',
    }),
  };

  return (
    <Card>
      <Slider ref={carouselRef} {...settings}>
        {AUTH_IMAGES.map((image, index) => (
          <CarouselItem
            key={index}
            item={image}
            isActive={index === currentIndex}
          />
        ))}
      </Slider>
    </Card>
  );
}

// ----------------------------------------------------------------------
CarouselItem.propTypes = {
  isActive: PropTypes.bool,
  item: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }),
};

function CarouselItem({ item, isActive }) {
  const { image, title, description } = item;

  return (
    <Box sx={{ position: 'relative', maxHeight: '80vh', objectFit: 'cover' }}>
      <CardContent
        component={MotionContainer}
        animate={isActive}
        action
        sx={{
          bottom: '8%',
          left: '5%',
          width: 1,
          zIndex: 9,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <m.div
          variants={varFade().inRight}
          style={{ width: '80%', fontStyle: 'italic' }}
        >
          <Typography variant='body1' sx={{ fontWeight: '300', fontSize: 20 }}>
            {description}
          </Typography>
        </m.div>
        <m.div variants={varFade().inRight}>
          <Link component={RouterLink} to='#' color='inherit' underline='none'>
            <Typography variant='h5' gutterBottom>
              {title}
            </Typography>
          </Link>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Typography
            variant='body1'
            component='div'
            sx={{ mt: 3, fontWeight: 700 }}
          >
            Colidiali
          </Typography>
        </m.div>
      </CardContent>
      <OverlayStyle />

      <Image alt={title} src={image} />
    </Box>
  );
}
