import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { List, Collapse, Stack } from '@mui/material';
//
import { NavItemRoot, NavItemSub } from './NavItem';
import { getActive } from '..';
import { ListItemIconStyle } from './style';

// ----------------------------------------------------------------------

NavListRoot.propTypes = {
  isCollapse: PropTypes.bool,
  disabledLink: PropTypes.bool,
  list: PropTypes.object,
};

export function NavListRoot({ list, isCollapse, disabledLink }) {
  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(true);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemRoot
          item={list}
          isCollapse={isCollapse}
          active={active}
          open={open}
          onOpen={() => setOpen(!open)}
        />

        {!isCollapse ? (
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {(list.children || []).map((item) => (
                <NavListSub
                  key={item.title}
                  list={item}
                  disabledLink={disabledLink}
                />
              ))}
            </List>
          </Collapse>
        ) : (
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {(list.children || []).map((item, index) => (
                <Stack key={index} direction={'row'} sx={{ py: 2 }}>
                  <ListItemIconStyle>{item.icon}</ListItemIconStyle>
                </Stack>
              ))}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  return <NavItemRoot item={list} active={active} isCollapse={isCollapse} />;
}

// ----------------------------------------------------------------------

NavListSub.propTypes = {
  list: PropTypes.object,
};

function NavListSub({ list, disabledLink }) {
  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemSub
          item={list}
          onOpen={() => setOpen(!open)}
          open={open}
          active={active}
          disabledLink={disabledLink}
        />

        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding sx={{ pl: 3 }}>
            {(list.children || []).map((item) => (
              <NavItemSub
                key={item.title}
                item={item}
                active={getActive(item.path, pathname)}
                disabledLink={disabledLink}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return <NavItemSub item={list} active={active} disabledLink={disabledLink} />;
}
