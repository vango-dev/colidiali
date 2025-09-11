import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Stack,
  styled,
  Typography,
} from '@mui/material';
// components
import { MotionContainer, varFade } from '../../components/animate';
import Page from '../../components/Page';
// sections
import useResponsive from '../../hooks/useResponsive';
import { PATH_AUTH } from '../../routes/paths';
import AuthCarousel from '../../sections/auth/AuthCarousel';
import SignInForm from '../../sections/auth/SignInForm';

//----------------------------------------------------------------------
const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'transparent',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  background:
    'linear-gradient(180deg, #033B3A 0%, #033938 0%, #02302F 19.03%, #000000 100%);',
  [theme.breakpoints.up('md')]: {
    width: '100%',
    height: '110vh',
    display: 'flex',
    alignItems: 'center',
  },
}));

const HeroOverlayStyle = styled(m.img)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const ContentStyle = styled(Card)(({ theme }) => ({
  width: '92%',
  maxHeight: '100vh',
  backgroundColor: '#ffffff',
  position: 'absolute',
  top: 80,
  left: '50%',
  transform: 'translateX(-50%)',
  [theme.breakpoints.up('md')]: {
    top: 110,
    width: '92%',
    // maxHeight: '100vh',
  },
}));

//----------------------------------------------------------------------

export default function SignInPage() {
  const smUp = useResponsive('up', 'sm');

  return (
    <Page title="Page d'authentification">
      <MotionContainer>
        <RootStyle>
          <HeroOverlayStyle
            alt='overlay'
            src='../mozaic_bg.webp'
            variants={varFade().in}
          />

          <ContentStyle>
            <Grid
              container
              direction={'row'}
              justifyContent={{ md: 'space-around', xs: 'flex-start' }}
              alignItems={'center'}
            >
              {smUp && (
                <Grid item md={6}>
                  <AuthCarousel />
                </Grid>
              )}
              <Grid item md={5} xs={12} py={1}>
                <CardContent>
                  <Stack direction='row'>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant={'h3'}
                        sx={{
                          fontWeight: 500,
                          textAlign: 'start',
                        }}
                      >
                        Connectez-vous a votre compte
                      </Typography>
                      <Typography
                        variant={'body2'}
                        color='text.secondary'
                        sx={{
                          textAlign: 'start',
                        }}
                      >
                        Vous n'avez pas de compte ?{' '}
                        <Link component={RouterLink} to={PATH_AUTH.register}>
                          Inscrivez-vous ici
                        </Link>
                      </Typography>
                    </Box>
                  </Stack>

                  <SignInForm />
                </CardContent>
              </Grid>
            </Grid>
          </ContentStyle>
        </RootStyle>
      </MotionContainer>
    </Page>
  );
}
