// @mui
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
// form
// components
import DeactivateAccount from './DeactivateAccount';
import DeleteAccount from './DeleteAccount ';
// ----------------------------------------------------------------------
export default function BlockAccountParameter() {
  return (
    <Card>
      <CardHeader
        sx={{ position: 'absolute', top: 10, zIndex: 10000 }}
        titleTypographyProps={{ fontSize: 120 }}
        title='Paramètre'
      />
      <Grid container alignItems={'center'} py={5} pr={5}>
        <Grid item xs={12} md={9} mx={8}>
          <Stack mb={5}>
            <Typography variant='h5' mb={2} sx={{ fontWeight: 450 }}>
              Block Account
            </Typography>
            <Divider />
          </Stack>
          <Box
            sx={{
              display: 'grid',
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: {
                xs: 'repeat(1,1fr)',
                sm: 'repeat(1,1fr)',
              },
            }}
          >
            <DeactivateAccount />
            <DeleteAccount />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
