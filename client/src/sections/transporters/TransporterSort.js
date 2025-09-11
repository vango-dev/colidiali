import { useState } from 'react';
// @mui
import { Button, MenuItem, Typography } from '@mui/material';
// redux
// components
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------
const SORT_BY_OPTIONS = [
  {
    value: 'newest',
    label: 'Récent',
  },
  {
    value: 'commentDesc',
    label: 'Décroissant',
  },
  { value: 'commentAsc', label: 'Croissant' },
];

function renderLabel(label) {
  if (label === 'newest') {
    return 'Récent';
  }
  if (label === 'commentDesc') {
    return 'Décroissant';
  }
  return 'Croissant';
}

// ----------------------------------------------------------------------

export default function TransporterSort() {
  const [open, setOpen] = useState(null);

  const sortBy = null;

  const handleOpen = (currentTarget) => {
    setOpen(currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleSortBy = (value) => {
    handleClose();
    // dispatch(sortByProducts(value));
  };

  return (
    <>
      <Button
        color='inherit'
        disableRipple
        onClick={(event) => handleOpen(event.currentTarget)}
        endIcon={
          <Iconify
            icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'}
          />
        }
      >
        Sort By: &nbsp;
        <Typography
          component='span'
          variant='subtitle2'
          sx={{ color: 'text.secondary' }}
        >
          {renderLabel(sortBy)}
        </Typography>
      </Button>

      <MenuPopover
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        sx={{
          width: 'auto',
          '& .MuiMenuItem-root': { typography: 'body2', borderRadius: 0.75 },
        }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sortBy}
            onClick={() => handleSortBy(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuPopover>
    </>
  );
}
