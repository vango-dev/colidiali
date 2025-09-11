import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
// @mui
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
//
import { CarouselArrowIndex, CarouselArrows } from '../../components/carousel';
import Image from '../../components/Image';
import LightboxModal from '../../components/LightboxModal';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '& .slick-slide': {
    float: theme.direction === 'rtl' ? 'right' : 'left',
    '&:focus': { outline: 'none' },
  },
}));

// ----------------------------------------------------------------------

TransporterGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default function TransporterGallery({ images }) {
  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [nav1, setNav1] = useState();

  const [nav2, setNav2] = useState();

  const slider1 = useRef(null);

  // const allImages = transporter.images.concat(images);

  const imagesLightbox = images?.map((_image) => _image) || [];

  const handleOpenLightbox = (url) => {
    const selectedImage = imagesLightbox?.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  const settings1 = {
    dots: true,
    arrows: true,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    fade: true,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  useEffect(() => {
    if (slider1.current) {
      setNav1(slider1.current);
    }
  }, []);

  const handlePrevious = () => {
    slider1.current?.slickPrev();
  };

  const handleNext = () => {
    slider1.current?.slickNext();
  };

  return (
    <RootStyle>
      <Box>
        <Box
          sx={{
            zIndex: 0,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <CarouselArrows
            filled
            onPrevious={handlePrevious}
            onNext={handleNext}
            customIcon={'eva:arrow-ios-forward-fill'}
            sx={{
              '& .arrow': {
                mt: '-14px',
                '& button': {
                  width: 35,
                  height: 35,
                  borderRadius: '50%',
                  p: 0.75,
                  backgroundColor: 'transparent',
                  color: 'white',
                },
              },
            }}
          >
            <Slider {...settings1} asNavFor={nav2} ref={slider1}>
              {images
                ? images.map((img) => (
                    <>
                      <Image
                        key={img}
                        alt='large image'
                        src={img}
                        ratio='16/9'
                        onClick={() => handleOpenLightbox(img)}
                        sx={{
                          cursor: 'zoom-in',
                          height: '240px',
                          width: { md: '404px', xs: '100%' },
                        }}
                      />
                    </>
                  ))
                : ['/assets/delivery_man.png'].map((img) => (
                    <>
                      <Image
                        key={img}
                        alt='large image'
                        src={img}
                        ratio='16/9'
                        onClick={() => handleOpenLightbox(img)}
                        sx={{
                          cursor: 'zoom-in',
                          height: '240px',
                          width: { md: '404px', xs: '100%' },
                        }}
                      />
                    </>
                  ))}
            </Slider>
          </CarouselArrows>

          <CarouselArrowIndex
            index={currentIndex}
            total={images?.length}
            customLeftIcon={'ion:images-outline'}
          />
        </Box>
      </Box>

      <LightboxModal
        images={imagesLightbox}
        mainSrc={imagesLightbox[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onCloseRequest={() => setOpenLightbox(false)}
      />
    </RootStyle>
  );
}
