import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(2, 0),
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(6),
  height: theme.spacing(6),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('lg')]: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

// ----------------------------------------------------------------------

DepartureWidget.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
  ]),
  icon: PropTypes.string,
  title: PropTypes.string,
  total: PropTypes.number,
};

export default function DepartureWidget({
  title,
  total,
  icon,
  color = 'primary',
}) {
  return (
    <RootStyle
      sx={{
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
      }}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette[color].dark,
              0
            )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant='h3'>{fShortenNumber(total)}</Typography>
      <Typography variant='subtitle2' sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </RootStyle>
  );
}
