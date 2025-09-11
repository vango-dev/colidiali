import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { IconButton, Stack, TextField, Typography } from '@mui/material';
import Iconify from '../Iconify';
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextField({
  name,
  placeholder,
  isPassword = false,
  showPassword,
  showPasswordHandler,
  ...other
}) {
  const { control } = useFormContext();

  const smUp = useResponsive('up', 'sm');

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems={'center'}
              spacing={1}
            >
              {isPassword ? (
                <>
                  <Typography
                    variant={'subtitle2'}
                    style={{
                      color: error ? '#D63E3E' : 'inherit',
                    }}
                  >
                    {placeholder}
                  </Typography>
                  <IconButton
                    sx={{ p: 0.2 }}
                    onClick={showPasswordHandler}
                    edge='end'
                  >
                    <Iconify
                      icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                      color={error && '#D63E3E'}
                      height={22}
                      width={22}
                    />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography
                    variant={'subtitle2'}
                    style={{
                      color: error ? '#D63E3E' : 'inherit',
                    }}
                  >
                    {placeholder}
                  </Typography>
                </>
              )}
            </Stack>

            <TextField
              {...field}
              fullWidth
              sx={{ backgroundColor: 'white' }}
              error={!!error}
              helpertext={error?.message}
              FormHelperTextProps={{
                style: {
                  marginTop: smUp ? 0 : -1,
                  marginLeft: 2,
                },
              }}
              {...other}
            />
          </>
        )}
      />
    </>
  );
}
