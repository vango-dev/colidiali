import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import SocialsButton from '../../components/SocialsButton';

// ----------------------------------------------------------------------
const LINKS = [
  {
    headline: 'A propos',
    color: '#EF6E4F',
    children: [
      { name: 'Nos services', href: '/' },
      { name: 'Politique de confidentialité', href: '/' },
      { name: "Conditions d'utilisation", href: '/' },
    ],
  },
  {
    headline: 'Transportation',
    color: '#4BA69D',
    children: [
      { name: 'Pour les transporteurs', href: '/' },
      { name: 'Pour les utilisateurs', href: '/' },
    ],
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  background: '#000000',
  color: 'white',
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  const theme = useTheme();
  return (
    <RootStyle>
      <Divider />
      <Container maxWidth={'xl'} sx={{ py: 10 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={12} md={2}>
            <Stack direction='row' spacing={1} alignItems={'center'} mb={3}>
              <Iconify icon='iconoir:packages' height={30} width={30} />
              <Typography variant='h4'>Colidiali</Typography>
            </Stack>
            <Stack
              direction='row'
              justifyContent={'flex-start'}
              sx={{ mt: 1, mb: { xs: 5, md: 0 } }}
            >
              <Iconify icon='ic:outline-email' width={25} height={25} m={1} />
              <Typography
                variant='body2'
                sx={{ pr: { md: 5 }, textAlign: 'start' }}
              >
                Email <br />
                contact@colidiali.com
              </Typography>
            </Stack>
            <Stack
              direction='row'
              justifyContent={'flex-start'}
              sx={{ mt: 1, mb: { xs: 5, md: 0 } }}
            >
              <Iconify icon='ic:outline-phone' width={25} height={25} m={1} />
              <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                Contactez-nous <br />
                (00) 123 456 789
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent='space-evenly'
            >
              {LINKS.map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  sx={{ marginBottom: 5, paddingLeft: { xs: 3, md: 0 } }}
                >
                  <Stack direction='row' spacing={1} alignItems={'center'}>
                    <Typography variant='h4' color={list.color}>
                      {list.headline}
                    </Typography>
                  </Stack>

                  {list.children.map((link) => (
                    <Link
                      to={link.href}
                      key={link.name}
                      color='inherit'
                      variant='body2'
                      component={RouterLink}
                      sx={{
                        display: 'block',
                        textAlign: 'start',
                        textDecoration: 'none',
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={2} sx={{ paddingX: { xs: 3, md: 0 } }}>
            <Stack direction='row' spacing={1} alignItems={'center'}>
              <Typography variant='h4'>Subscribe</Typography>
            </Stack>
            <Stack
              direction='row'
              justifyContent={'flex-start'}
              sx={{ mt: 1, mb: { xs: 5, md: 0 } }}
            >
              <TextField name='email' placeholder='Email' color='warning' />
            </Stack>
            <Stack
              direction='row'
              justifyContent={'flex-start'}
              sx={{ mt: 1, mb: { xs: 5, md: 0 } }}
              spacing={2}
            >
              <Button
                variant='contained'
                size='small'
                sx={{
                  whiteSpace: 'nowrap',
                  paddingX: { xs: 3, md: 1 },
                  borderRadius: 0.5,
                }}
                color='warning'
              >
                Send now
              </Button>
              <SocialsButton sx={{ color: 'white' }} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
