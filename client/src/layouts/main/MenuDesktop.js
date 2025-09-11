import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Grid, Link, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
// ----------------------------------------------------------------------
const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(5),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    opacity: 0.48,
    textDecoration: 'none',
  },
}));

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
MenuDesktop.propTypes = {
  isOffset: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function MenuDesktop({ isOffset, navConfig }) {
  return (
    <Stack direction='row'>
      {navConfig.map((link) => (
        <MenuDesktopItem key={link.title} item={link} isOffset={isOffset} />
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

MenuDesktopItem.propTypes = {
  item: PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};

function MenuDesktopItem({ isOffset, item }) {
  const linkStyles = {
    ...(isOffset && { color: 'text.primary' }),
    '&.active': { color: 'white' },
    alignSelf: 'center',
    whiteSpace: 'nowrap',
    color: 'white',
  };

  const isDesktop = useResponsive('up', 'md');

  const { title, path, icon } = item;
  if (title === "S'inscrire") {
    return (
      <LinkStyle
        to={path}
        component={RouterLink}
        end={path === '/'}
        sx={{
          ...linkStyles,
          border: '1px solid',
          borderRadius: '8px',
          padding: '6px 25px',
          color: 'white',
        }}
      >
        {title}
      </LinkStyle>
    );
  }

  if (title === 'Français') {
    return (
      <LinkStyle
        to={path}
        component={RouterLink}
        end={path === '/'}
        sx={{
          ...(isOffset && { color: 'text.primary' }),
          '&.active': { color: 'white' },
          alignSelf: 'center',
        }}
      >
        <Grid container spacing={1}>
          <Grid item>{icon}</Grid>
          <Grid item>{title}</Grid>
        </Grid>
      </LinkStyle>
    );
  }

  return (
    <LinkStyle
      to={path}
      component={RouterLink}
      end={path === '/'}
      sx={{
        ...(isOffset && { color: 'text.primary' }),
        '&.active': { color: 'white' },
        alignSelf: 'center',
        whiteSpace: 'nowrap',
        color: 'white',
      }}
    >
      <Grid container spacing={1}>
        {!isDesktop && <Grid item>{icon}</Grid>}
        <Grid item>{title}</Grid>
      </Grid>
    </LinkStyle>
  );
}
