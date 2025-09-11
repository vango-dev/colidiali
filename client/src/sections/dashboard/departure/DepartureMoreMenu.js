import { MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButtonAnimate } from '../../../components/animate';
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';
import { PATH_DASHBOARD } from '../../../routes/paths';

export default function DepartureMoreMenu({
  onDuplicate,
  onDelete,
  departureId,
}) {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  const onUpdateHandler = () => {
    navigate(`${PATH_DASHBOARD.departures}?departure=${departureId}`);
    handleClose();
  };

  const onDuplicateHandler = () => {
    onDuplicate();
    handleClose();
  };

  const onDeleteHandler = () => {
    onDelete();
    handleClose();
  };

  return (
    <>
      <IconButtonAnimate onClick={handleOpen}>
        <Iconify icon='tabler:dots' width={20} height={20} />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow='right-top'
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <MenuItem onClick={onUpdateHandler}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          Modifier
        </MenuItem>
        <MenuItem onClick={onDuplicateHandler}>
          <Iconify icon={'carbon:renew'} sx={{ ...ICON }} />
          Dupliquer
        </MenuItem>
        <MenuItem onClick={onDeleteHandler} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}
