import { m } from 'framer-motion';
// @mui
import { Box, Button, Container, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import {
  MotionContainer,
  MotionInView,
  varFade,
} from '../../components/animate';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  // paddingTop: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    //    paddingBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    background:
      'linear-gradient(180deg, #033B3A 0%, #033938 0%, #02302F 19.03%, #000000 100%);',
  },
}));

const RootStyle2 = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: '#EF6E4F',
  width: '100%',
  height: 230,
  padding: theme.spacing(1, 0),
  [theme.breakpoints.up('md')]: {
    height: 281,
    padding: 0,
    width: '50%',
  },
}));

const RootStyle3 = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: '#000000',
  width: '100%',
  padding: theme.spacing(1, 0),
  height: 230,
  [theme.breakpoints.up('md')]: {
    height: 281,
    padding: 0,
    width: '50%',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'start',
  // [theme.breakpoints.up('md')]: {
  //   textAlign: 'center',
  //   position: 'absolute',
  //   bottom: theme.spacing(10),
  // },
}));
// ----------------------------------------------------------------------
export default function HomeAuth() {
  return (
    <RootStyle>
      <RootStyle2>
        <Container
          component={MotionContainer}
          sx={{
            position: 'relative',
            height: '100%',
          }}
        >
          <ContentStyle>
            <Container maxWidth='sm'>
              <Typography
                variant={'h2'}
                sx={{
                  mt: 5,
                  color: 'common.white',
                  fontWeight: 'fontWeightBold',
                  whiteSpace: 'nowrap',
                  fontSize: { xs: 28, md: '44px' },
                }}
              >
                Pour les utilisateurs
              </Typography>

              <Typography
                variant='h6'
                sx={{
                  color: 'common.white',
                  fontWeight: 'fontWeightMedium',
                }}
              >
                Lorem ipsum dolor sit amet
              </Typography>
              <Divider sx={{ my: 1, width: '90%', borderColor: 'white' }} />
              <Box sx={{ display: 'inline-flex', color: 'common.white' }}></Box>
              <m.div variants={varFade().inRight}>
                <Button
                  sx={{
                    color: 'common.white',
                    borderColor: 'white',
                    padding: '10px 20px',
                  }}
                  variant={'outlined'}
                  size={'large'}
                >
                  Trouver un transporteur
                </Button>
              </m.div>
            </Container>
          </ContentStyle>
        </Container>
      </RootStyle2>
      <RootStyle3>
        <Container
          component={MotionContainer}
          sx={{
            position: 'relative',
            height: '100%',
          }}
        >
          <ContentStyle>
            <Container maxWidth='sm'>
              <Typography
                variant='h2'
                sx={{
                  mt: 5,
                  color: 'common.white',
                  fontWeight: 'fontWeightBold',
                  whiteSpace: 'nowrap',
                  fontSize: { xs: 28, md: '44px' },
                }}
              >
                Pour les transporteurs
              </Typography>

              <Typography
                variant='h6'
                sx={{
                  color: 'common.white',
                  fontWeight: 'fontWeightMedium',
                }}
              >
                Lorem ipsum dolor sit amet
              </Typography>
              <Divider sx={{ my: 1, width: '90%', borderColor: 'white' }} />
              <Box sx={{ display: 'inline-flex', color: 'common.white' }}></Box>
              <m.div variants={varFade().inRight}>
                <Button
                  sx={{
                    color: 'common.white',
                    borderColor: 'white',
                    padding: '10px 20px',
                  }}
                  variant={'outlined'}
                  size={'large'}
                >
                  Inscrivez-vous
                </Button>
              </m.div>
            </Container>
          </ContentStyle>
        </Container>
      </RootStyle3>
    </RootStyle>
  );
}
