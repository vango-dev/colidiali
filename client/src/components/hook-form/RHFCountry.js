import PropTypes from 'prop-types';
import {
  defaultCountries,
  FlagImage,
  parseCountry,
} from 'react-international-phone';
import 'react-international-phone/style.css';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';

RHFCountry.propTypes = {
  name: PropTypes.string.isRequired,
  setCountryIso: PropTypes.func,
};

export default function RHFCountry({ name, placeholder, setCountryIso }) {
  const { control } = useFormContext();
  const smUp = useResponsive('up', 'sm');

  const MuiCountry = ({ value, onChange, borderColor }) => {
    const handleCountryChange = (event) => {
      const selectedIso2 = event.target.value;

      const country = defaultCountries.find(
        (c) => parseCountry(c).iso2 === selectedIso2
      );
      onChange(parseCountry(country).name);
    };

    const selectedCountry = defaultCountries.find(
      (c) => parseCountry(c).name === value
    );
    if (selectedCountry) {
      setCountryIso(selectedCountry[1]);
    }

    return (
      <TextField
        variant='outlined'
        color='primary'
        placeholder='Select Country'
        value={value || ''}
        select
        onChange={handleCountryChange}
        InputProps={{
          startAdornment: selectedCountry && (
            <InputAdornment
              position='start'
              style={{ marginRight: '2px', marginLeft: '-8px' }}
            >
              <FlagImage
                iso2={parseCountry(selectedCountry).iso2}
                style={{ marginRight: '8px' }}
              />
            </InputAdornment>
          ),
        }}
        SelectProps={{
          renderValue: () => value || 'Select Country',
        }}
        sx={{
          backgroundColor: 'white',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: borderColor,
            },
          },
        }}
      >
        {defaultCountries.map((c) => {
          const country = parseCountry(c);
          return (
            <MenuItem key={country.iso2} value={country.iso2}>
              <FlagImage iso2={country.iso2} style={{ marginRight: '8px' }} />
              <Typography marginRight='8px'>{country.name}</Typography>
            </MenuItem>
          );
        })}
      </TextField>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
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
          <MuiCountry
            value={value}
            onChange={onChange}
            borderColor={error && '#D63E3E'}
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
