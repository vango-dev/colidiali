import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// config
import { NAVBAR } from '../../config';
// components
// import Logo from '../../components/Logo';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { IconButtonAnimate } from '../../components/animate';

// ----------------------------------------------------------------------

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

MenuMobile.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function MenuMobile({ isOffset, isHome, navConfig }) {
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          color: 'common.white',
          ...(isOffset && { color: 'text.primary' }),
        }}
      >
        <Iconify icon={'eva:menu-2-fill'} color='white' />
      </IconButtonAnimate>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Stack
            direction='row'
            spacing={5}
            alignItems={'center'}
            sx={{ margin: 2 }}
          >
            <Iconify icon='iconoir:packages' height={30} width={30} />
            <Typography variant='h4'>Colidiali</Typography>
          </Stack>

          <List disablePadding>
            {navConfig.map((link) => (
              <MenuMobileItem
                key={link.title}
                item={link}
                isOpen={open}
                onOpen={handleOpen}
              />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

MenuMobileItem.propTypes = {
  isOpen: PropTypes.bool,
  item: PropTypes.shape({
    children: PropTypes.array,
    icon: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
  onOpen: PropTypes.func,
};

function MenuMobileItem({ item, isOpen, onOpen }) {
  const { title, path, icon } = item;

  return (
    <ListItemStyle
      to={path}
      component={RouterLink}
      end={path === '/'}
      sx={{
        '&.active': {
          color: 'primary.main',
          fontWeight: 'fontWeightMedium',
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity
            ),
        },
        paddingY: 5,
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText disableTypography primary={title} />
    </ListItemStyle>
  );
}
