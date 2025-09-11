import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { Drawer, Link, Stack } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
// hooks
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER, NAVBAR } from '../../../config';
// components
import Iconify from '../../../components/Iconify';
import { MotionContainer } from '../../../components/animate';
import { NavSectionVertical } from '../../../components/nav-section';
//
import CollapseButton from './CollapseButton';
import navConfig from './NavConfig';
import NavbarStatus from './NavbarStatus';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

// ----------------------------------------------------------------------

NavbarVertical.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }) {
  const theme = useTheme();

  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const { pathname } = useLocation();

  const isAuth = pathname.includes('auth') || pathname.includes('verification');

  const disabledLink = isAuth ? true : false;

  const isDesktop = useResponsive('up', 'lg');

  const {
    isCollapse,
    collapseClick,
    collapseHover,
    onToggleCollapse,
    onHoverEnter,
    onHoverLeave,
  } = useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <MotionContainer>
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: 'center' }),
        }}
      >
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Link
            underline='none'
            variant='h4'
            to='/'
            component={RouterLink}
            sx={{
              ...(isOffset && { color: 'text.primary' }),
              color: 'white',
              mx: 2,
              zIndex: 2,
            }}
          >
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              sx={{ color: 'white', zIndex: 2, fontWeight: 700 }}
            >
              <Iconify
                icon='iconoir:packages'
                height={30}
                width={30}
                style={{ marginRight: 15 }}
              />
              {!isCollapse && 'Colidiali'}
            </Stack>
          </Link>

          {isDesktop && !isCollapse && (
            <CollapseButton
              onToggleCollapse={onToggleCollapse}
              collapseClick={collapseClick}
            />
          )}
        </Stack>
      </Stack>

      <NavSectionVertical
        navConfig={navConfig}
        isCollapse={isCollapse}
        disabledLink={disabledLink}
      />

      {!isCollapse && <NavbarStatus />}
    </MotionContainer>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse
            ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
            : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              overflow: 'auto', // Enable scroll functionality
              scrollbarWidth: 'none', // For Firefox
              '&::-webkit-scrollbar': {
                display: 'none', // For WebKit browsers
              },
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant='persistent'
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          sx={{ color: 'black' }}
          PaperProps={{
            sx: {
              width: isCollapse
                ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
                : NAVBAR.DASHBOARD_WIDTH,
              borderRightStyle: 'dashed',
              backgroundColor: '#000000',
              background: `
              url(/mozaic_bg.png),
              linear-gradient(180deg, #033B3A 0%, #033938 0%, #02302F 19.03%, #000000 100%)
            `,
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.standard,
                }),
              ...(collapseHover && {
                ...cssStyles(theme).bgBlur(),
                boxShadow: (theme) => theme.customShadows.z24,
                width: NAVBAR.DASHBOARD_WIDTH, // Expand width on hover
              }),
              overflow: 'auto', // Enable scroll functionality
              scrollbarWidth: 'none', // For Firefox
              '&::-webkit-scrollbar': {
                display: 'none', // For WebKit browsers
              },
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
