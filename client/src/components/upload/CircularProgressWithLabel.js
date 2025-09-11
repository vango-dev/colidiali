import { Box, CircularProgress, Typography } from '@mui/material';

export default function CircularProgressWithLabel({ value, isProfileUrl }) {
  return (
    <Box>
      <CircularProgress
        size={isProfileUrl ? 128 : 80}
        thickness={isProfileUrl ? 5 : 4}
        variant='determinate'
        value={value}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: isProfileUrl ? 128 : 80,
          height: isProfileUrl ? 128 : 80,
        }}
      >
        <Typography
          variant='caption'
          component='div'
          color='white'
          fontSize='1rem'
        >
          {Math.round(value) + '%'}
        </Typography>
      </Box>
    </Box>
  );
}
