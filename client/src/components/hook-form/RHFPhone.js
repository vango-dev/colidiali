import PropTypes from 'prop-types';
import {
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';
import 'react-international-phone/style.css';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import {
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
RHFPhone.propTypes = {
  name: PropTypes.string,
};

export default function RHFPhone({ name, placeholder, disabledPhone = false }) {
  const { control } = useFormContext();

  const smUp = useResponsive('up', 'sm');

  const MuiPhone = ({ value, onChange, borderColor }) => {
    const {
      inputValue,
      handlePhoneValueChange,
      inputRef,
      country,
      setCountry,
    } = usePhoneInput({
      defaultCountry: 'fr',
      value,
      countries: defaultCountries,
      onChange: (data) => {
        onChange(data.phone);
      },
    });

    return (
      <TextField
        variant='outlined'
        color='primary'
        value={inputValue}
        onChange={handlePhoneValueChange}
        type='tel'
        inputRef={inputRef}
        disabled={disabledPhone}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: borderColor,
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position='start'
              style={{ marginRight: '2px', marginLeft: '-8px' }}
            >
              <Select
                MenuProps={{
                  style: {
                    height: '300px',
                    width: '360px',
                    top: '10px',
                    left: smUp ? '-34px' : '-18px',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                }}
                sx={{
                  width: 'max-content',
                  fieldset: {
                    display: 'none',
                  },
                  '&.Mui-focused:has(div[aria-expanded="false"])': {
                    fieldset: {
                      display: 'block',
                    },
                  },
                  '.MuiSelect-select': {
                    padding: '8px',
                    paddingRight: '24px !important',
                  },
                  svg: {
                    right: 0,
                  },
                }}
                value={country.iso2}
                onChange={(e) => setCountry(e.target.value)}
                renderValue={(value) => (
                  <FlagImage iso2={value} style={{ display: 'flex' }} />
                )}
              >
                {defaultCountries.map((c) => {
                  const country = parseCountry(c);
                  return (
                    <MenuItem key={country.iso2} value={country.iso2}>
                      <FlagImage
                        iso2={country.iso2}
                        style={{ marginRight: '8px' }}
                      />
                      <Typography marginRight='8px'>{country.name}</Typography>
                      <Typography color='gray'>+{country.dialCode}</Typography>
                    </MenuItem>
                  );
                })}
              </Select>
            </InputAdornment>
          ),
        }}
      />
    );
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Typography
              variant={'subtitle2'}
              style={{
                color: error ? '#D63E3E' : 'inherit',
                marginBottom: -15,
              }}
            >
              {placeholder}
            </Typography>

            <MuiPhone
              value={value}
              onChange={onChange}
              borderColor={error && '#D63E3E'}
            />
            <Typography
              variant='caption'
              style={{
                marginLeft: 2,
                marginTop: -1,
                color: error ? '#D63E3E' : 'inherit',
              }}
            >
              {error?.message}
            </Typography>
          </>
        )}
      />
    </>
  );
}
