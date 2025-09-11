import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Button,
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
import SignUpForm from '../../sections/auth/SignUpForm';
import AuthCarousel from '../../sections/auth/AuthCarousel';
import { PATH_AUTH } from '../../routes/paths';
import useResponsive from '../../hooks/useResponsive';

//----------------------------------------------------------------------
const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  top: 0,
  left: 0,
  backgroundColor: 'transparent',
  width: '100%',
  height: '180vh',
  background:
    'linear-gradient(180deg, #033B3A 0%, #033938 0%, #02302F 19.03%, #000000 100%);',
  [theme.breakpoints.up('md')]: {
    width: '100%',
    height: '158vh',
    display: 'flex',
    // position: 'fixed',
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
  maxHeight: '100%',
  backgroundColor: '#ffffff',
  position: 'absolute',
  top: 80,
  [theme.breakpoints.up('md')]: {
    width: '70%',
    maxHeight: '88%',
    top: 140,
  },
}));

//----------------------------------------------------------------------

export default function SignUpPage() {
  const [user, setUser] = useState('client');

  const smUp = useResponsive('up', 'sm');

  useEffect(() => {
    console.log('User selection changed to:', user);
  }, [user]);

  const handleClick = (selectedUser) => {
    setUser(selectedUser);
  };
  return (
    <Page title='Créer un nouveau compte'>
      <MotionContainer>
        <RootStyle>
          <HeroOverlayStyle
            alt='overlay'
            src='../mozaic_bg.png'
            variants={varFade().in}
          />
          <Container maxWidth={'xl'}>
            <ContentStyle>
              <Grid
                container
                direction={'row'}
                justifyContent={{ md: 'space-around', xs: 'flex-start' }}
              >
                {smUp && (
                  <Grid item md={7} pl={4} py={5}>
                    <AuthCarousel />
                  </Grid>
                )}
                <Grid item md={5} xs={12} mt={{ md: 3, xs: 0 }}>
                  <CardContent>
                    <Stack direction={'row'}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant='h3'
                          sx={{ fontWeight: 500, textAlign: 'start' }}
                        >
                          Créer un nouveau compte
                        </Typography>
                        <Typography
                          variant={'body2'}
                          color='text.secondary'
                          sx={{
                            textAlign: 'start',
                          }}
                        >
                          Vous avez déjà un compte ?{' '}
                          <Link component={RouterLink} to={PATH_AUTH.login}>
                            Se connecter ici
                          </Link>
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack
                      direction={'row'}
                      sx={{
                        width: '100%',
                        backgroundColor: '#EDEEEF',
                        borderRadius: 1.2,
                        my: { md: 5, xs: 3 },
                        justifyContent: 'center',
                        p: 0.5,
                      }}
                      spacing={1}
                    >
                      <Button
                        sx={{
                          px: { md: 12, xs: 8 },
                          py: 2,
                          backgroundColor: user === 'client' ? 'white' : 'none',
                        }}
                        onClick={() => handleClick('client')}
                      >
                        Client
                      </Button>
                      <Button
                        size='large'
                        sx={{
                          px: { md: 12, xs: 8 },
                          backgroundColor:
                            user === 'transporter' ? 'white' : 'none',
                        }}
                        onClick={() => handleClick('transporter')}
                      >
                        Transporteur
                      </Button>
                    </Stack>

                    <SignUpForm user={user} />
                  </CardContent>
                </Grid>
              </Grid>
            </ContentStyle>
          </Container>
        </RootStyle>
        {/* <Box sx={{ height: { md: '20vh' } }} /> */}
      </MotionContainer>
    </Page>
  );
}
