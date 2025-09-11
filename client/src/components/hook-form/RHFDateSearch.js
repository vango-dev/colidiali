import PropTypes from 'prop-types';
// @mui
import { Box, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// form
import { Controller, useFormContext } from 'react-hook-form';
// component
import Iconify from '../Iconify';
// hooks
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------

RHFDateSearch.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  variant: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  placeholder: PropTypes.string,
};

export default function RHFDateSearch({
  name,
  label,
  variant = 'body1',
  width = 20,
  height = 20,
  placeholder,
  ...other
}) {
  const isDesktop = useResponsive('up', 'md');
  const smUp = useResponsive('up', 'sm');

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Typography
            variant={smUp ? 'subtitle1' : 'subtitle2'}
            style={{
              marginBottom: smUp ? 0 : -15,
              color: error ? '#D63E3E' : 'inherit',
            }}
          >
            {placeholder}
          </Typography>
          <DatePicker
            {...field}
            {...other}
            label={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                gap={1}
              >
                {!isDesktop && (
                  <Iconify
                    icon={'eva:calendar-fill'}
                    width={width}
                    height={height}
                    color='#000'
                  />
                )}
                <Typography variant={variant}>{label}</Typography>
              </Box>
            }
            inputFormat='dd/MM/yyyy'
            sx={{
              backgroundColor: 'white',
              borderColor: 'rgba(145, 158, 171, 0.24)',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 0.5,
                  borderColor: error ? '#D63E3E' : 'rgba(145, 158, 171, 0.24)',
                },
              },
              mr: { md: 1 },
              width: '98%',
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  startAdornment: (
                    <Typography variant='h1'>Custom Text</Typography>
                  ),
                }}
              />
            )}
          />
          <Typography
            variant='caption'
            style={{
              marginLeft: 2,
              marginTop: smUp ? 0 : -1,
              color: error ? '#D63E3E' : 'inherit',
            }}
          >
            {error?.message}
          </Typography>
        </>
      )}
    />
  );
}
