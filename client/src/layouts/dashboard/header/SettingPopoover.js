import { useState } from 'react';
// @mui
import { Badge, Box } from '@mui/material';
// components
import { IconButtonAnimate } from '../../../components/animate';
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';

// ----------------------------------------------------------------------
export default function SettingPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
      >
        <Iconify
          icon='material-symbols:settings-outline'
          width={23}
          height={23}
        />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          Paramètres
        </Box>
      </MenuPopover>
    </>
  );
}
