// @mui
import { Box, Typography, Stack } from '@mui/material';
// assets
import { UploadIllustration } from '../../assets';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

export default function BlockContent() {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      direction={'column'}
      sx={{ width: 1, textAlign: { xs: 'center', md: 'center' } }}
    >
      <Box>
        {/* <UploadIllustration sx={{ width: 220 }} /> */}
        <Iconify
          icon='la:cloud-upload-alt'
          height={100}
          width={100}
          color='#F56B3D'
        />
      </Box>

      <Box>
        <Typography gutterBottom variant='h5'>
          Drop your images here, or browse
        </Typography>

        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          Supports .PNG .JPG .JPEG .WEBP
        </Typography>
      </Box>
    </Stack>
  );
}
