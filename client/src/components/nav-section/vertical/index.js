import PropTypes from 'prop-types';
// @mui
import { Box, List, ListSubheader } from '@mui/material';
import { styled } from '@mui/material/styles';
//
import { NavListRoot } from './NavList';

// ----------------------------------------------------------------------

export const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function NavSectionVertical({
  navConfig,
  isCollapse,
  disabledLink,
  ...other
}) {
  return (
    <Box {...other}>
      {navConfig.map((group, index) => (
        <List key={index} disablePadding sx={{ px: 2 }}>
          {/* <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            <Stack direction='row' justifyContent='space-between'>
              {group.subheader}
            </Stack>
          </ListSubheaderStyle> */}

          {group.items.map((list, index) => (
            <NavListRoot
              key={index}
              list={list}
              isCollapse={isCollapse}
              disabledLink={disabledLink}
            />
          ))}
        </List>
      ))}
    </Box>
  );
}

// ----------------------------------------------------------------------
