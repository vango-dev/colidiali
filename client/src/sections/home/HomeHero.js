import { m } from 'framer-motion';
// form
// hooks
import useResponsive from '../../hooks/useResponsive';
// @mui
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// redux
// components
import { MotionContainer, varFade } from '../../components/animate';
import TransporterSearchForm from '../transporters/TransporterSearchForm.js';

// ----------------------------------------------------------------------
const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'transparent',
  background:
    'linear-gradient(180deg, #033B3A 0%, #033938 0%, #02302F 19.03%, #000000 100%);',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    maxWidth: 800,
    margin: 'auto',
    textAlign: 'left',
    position: 'relative',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up('md')]: {
      margin: 'unset',
    },
  })
);

const HeroOverlayStyle = styled(m.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const HeroPath1Style = styled(m.img)(({ theme }) => ({
  zIndex: 8,
  maxWidth: '100%',
  height: '200%',
  position: 'absolute',
  top: '8%',
  bottom: 0,
  right: '5%',
  content: 'url(./assets/path1_mobile.svg)',
  [theme.breakpoints.up('lg')]: {
    content: 'url(./assets/path1.svg)',
    width: 'auto',
    height: '105vh',
    right: '17%',
    margin: 'auto',
  },
}));

const HeroPath2Style = styled(m.img)(({ theme }) => ({
  top: '8%',
  right: '1%',
  zIndex: 8,
  maxWidth: '100%',
  position: 'absolute',
  content: 'url(./assets/path2_mobile.svg)',
  [theme.breakpoints.up('lg')]: {
    content: 'url(./assets/path2.svg)',
    top: 0,
    maxWidth: 'auto',
    height: '59vh',
    margin: 'auto',
  },
}));

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function HomeHero() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <MotionContainer>
      <RootStyle>
        <HeroOverlayStyle
          alt='overlay'
          src='./mozaic_bg.webp'
          variants={varFade().in}
        />
        <HeroPath1Style alt='overlay' variants={varFade().in} />

        <Container maxWidth={'xl'}>
          <ContentStyle>
            <m.div variants={varFade().inRight}>
              <Typography variant='h2' sx={{ color: 'common.white' }}>
                Plateforme de {!isDesktop && <br />}recherche
                {isDesktop && <br />} de
                {!isDesktop && <br />}
                <Typography
                  component='span'
                  variant='h2'
                  sx={{
                    color: 'common.white',
                    fontStyle: 'italic',
                    fontWeight: 200,
                  }}
                >
                  {isDesktop ? ` transporteurs` : 'transporteurs'}
                </Typography>
              </Typography>
            </m.div>
            <m.div>
              <TransporterSearchForm />
            </m.div>

            {isDesktop && (
              <m.div variants={varFade().inRight}>
                <Stack
                  direction='row'
                  spacing={2}
                  alignItems={'center'}
                  color={'white'}
                >
                  <Typography variant='subtitle1'>Populaires :</Typography>
                  {['Paris', 'Madrid', 'Casablanca', 'Rabat'].map(
                    (city, index) => (
                      <Button
                        size='meduim'
                        variant='outlined'
                        sx={{ borderColor: 'white' }}
                        key={index}
                      >
                        <Typography variant='subtitle2' color='white'>
                          {city}
                        </Typography>
                      </Button>
                    )
                  )}
                </Stack>
              </m.div>
            )}
          </ContentStyle>
        </Container>
        <HeroPath2Style alt='overlay' variants={varFade().in} />
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </MotionContainer>
  );
}
