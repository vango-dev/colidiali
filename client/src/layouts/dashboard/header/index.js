import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import Iconify from '../../../components/Iconify';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER, NAVBAR } from '../../../config';
// components
import { IconButtonAnimate } from '../../../components/animate';
//
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import SettingPopover from './SettingPopoover';
import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------
const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'isCollapse' && prop !== 'isOffSet' && prop !== 'verticalLayout',
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  onOpenSidebar: PropTypes.func,
  isCollapse: PropTypes.bool,
  verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
}) {
  const isOffset =
    useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');

  const { pathname } = useLocation();
  const title = pathname.split('/')[2];

  return (
    <RootStyle
      isCollapse={isCollapse}
      isOffset={isOffset}
      verticalLayout={verticalLayout}
    >
      <Toolbar sx={{ minHeight: '100% !important', px: { lg: 5 } }}>
        {isDesktop && verticalLayout && (
          <Stack direction='row' spacing={1} alignItems={'center'}>
            <Iconify
              icon='iconoir:packages'
              height={30}
              width={30}
              style={{ marginRight: 15 }}
            />
            Colidiali
          </Stack>
        )}

        {!isDesktop && (
          <IconButtonAnimate
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: 'text.primary' }}
          >
            <Iconify icon='eva:menu-2-fill' />
          </IconButtonAnimate>
        )}

        <Stack>
          <Typography
            variant='h4'
            color='primary'
            sx={{ textTransform: 'capitalize' }}
          >
            {title}
          </Typography>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction='row'
          alignItems='center'
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <LanguagePopover />
          <NotificationsPopover />
          <SettingPopover />
          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
