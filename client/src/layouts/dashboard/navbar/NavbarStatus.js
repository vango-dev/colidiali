// @mui
import { Stack, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// components
import Label from '../../../components/Label';

// ----------------------------------------------------------------------
export default function NavbarStatus() {
  const { user } = useAuth();

  return (
    <Stack
      direction='row'
      justifyContent='space-around'
      alignItems='center'
      sx={{
        mt: { md: 5, sm: 5 },
        width: 1,
        color: 'white',
        zIndex: 999,
      }}
    >
      <Typography gutterBottom variant='subtitle1'>
        Status:
      </Typography>
      <Label color={user?.isActivated ? 'primary' : 'warning'}>
        {user?.isActivated ? 'Activé' : 'Désactivé'}
      </Label>
    </Stack>
  );
}
