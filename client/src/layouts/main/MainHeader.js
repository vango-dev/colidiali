import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { AppBar, Box, Container, Link, Stack, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
// config
import { HEADER } from '../../config';
//
import Iconify from '../../components/Iconify';
import { PATH_AUTH } from '../../routes/paths';
import navConfig from './MenuConfig';
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';

// ----------------------------------------------------------------------
const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100%-48px)`,
  // boxShadow: theme.customShadows.z8,
}));
// ----------------------------------------------------------------------
export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const isDesktop = useResponsive('up', 'lg');

  return (
    <AppBar sx={{ boxShadow: 0 }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          maxWidth={'xl'}
        >
          <Link
            underline='none'
            variant='h4'
            to={'/'}
            component={RouterLink}
            end={'/'}
            sx={{
              ...(isOffset && { color: 'text.primary' }),
              color: 'white',
              mx: 2,
            }}
          >
            <Stack direction='row' spacing={1} alignItems={'center'}>
              <Iconify
                icon='iconoir:packages'
                height={30}
                width={30}
                style={{ marginRight: 15 }}
              />
              Colidiali
            </Stack>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <MenuDesktop navConfig={navConfig} />}

          {!isDesktop && (
            <Link
              underline='none'
              to={PATH_AUTH.register}
              component={RouterLink}
              end={'/'}
              sx={{
                ...(isOffset && { color: 'text.primary' }),
                color: 'white',
                mx: 2,
              }}
            >
              S'inscrire
            </Link>
          )}

          {!isDesktop && (
            <MenuMobile isOffset={isOffset} navConfig={navConfig} />
          )}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
