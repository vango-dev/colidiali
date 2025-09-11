import { m } from 'framer-motion';
// hooks
import useResponsive from '../../hooks/useResponsive';
// @mui
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { MotionContainer } from '../../components/animate';

// ----------------------------------------------------------------------
const RootStyle = styled(m.div)(({ theme }) => ({
  backgroundColor: 'transparent',
  [theme.breakpoints.up('md')]: {
    width: '100%',
    height: '70vh',
    // alignItems: 'center',
    // background: 'linear-gradient(to bottom, #033B3A, #000000)',
  },
}));

const ContentStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '0',
    paddingBottom: 10,
  },
}));

// ----------------------------------------------------------------------

export default function HomeAdvertisement() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <MotionContainer>
      <RootStyle>
        <Container maxWidth={'xl'} sx={{ paddingX: { md: '16px', xs: 0 } }}>
          <ContentStyle
            sx={{
              backgroundColor: '#EF6E4F',
              backgroundImage: 'url(./assets/mozaic_bg2.png)',
            }}
          >
            <CardContent>
              <Stack
                direction='column'
                sx={{ width: { md: '100%', xs: '70%' }, textAlign: 'start' }}
                spacing={5}
              >
                <Typography
                  sx={{
                    typography: { md: 'h3', xs: 'h2' },
                    paddingY: { md: 0, xs: 3 },
                  }}
                  color='white'
                >
                  Vous êtes une agence ou un transporteur ?
                </Typography>
                <Typography variant={{ md: 'body1', xs: 'h6' }} color='white'>
                  Vous pouvez rejoindre la communauté Colidiali dès aujourd’hui
                </Typography>

                <Button
                  variant='contained'
                  size='large'
                  sx={{
                    whiteSpace: 'noWrap',
                    paddingY: 2,
                    width: { md: '40%', xs: '100%' },
                    color: '#000000',
                  }}
                  color='grey'
                >
                  Inscrivez-vous gratuitement
                </Button>
              </Stack>
            </CardContent>

            {isDesktop && (
              <CardMedia
                component='img'
                sx={{
                  width: '40%',
                  position: 'relative',
                  left: 60,
                }}
                src='./assets/delivery_man.png'
                alt='Live from space album cover'
              />
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </MotionContainer>
  );
}
