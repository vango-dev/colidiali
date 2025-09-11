import { Outlet } from 'react-router-dom';
// @mui
import { Box, Stack } from '@mui/material';
//
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <Stack
      sx={{
        minHeight: 1,
      }}
    >
      <MainHeader />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  );
}
