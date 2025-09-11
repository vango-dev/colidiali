import parse from 'autosuggest-highlight/parse';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
// @mui
import {
  Autocomplete,
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
  debounce,
} from '@mui/material';
// form
import { Controller, useFormContext } from 'react-hook-form';
// component
import Iconify from '../Iconify';

// ----------------------------------------------------------------------
const GOOGLE_MAPS_API_KEY = 'AIzaSyDxiJ1eVVzae5q4L6BIqGujvHcmqdQBuVw';

function loadScript(src, position, id) {
  if (!position) {
    return;
  }
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

// ----------------------------------------------------------------------

RHFMapSearch.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  country: PropTypes.string, // Prop to pass the country restriction
};

export default function RHFMapSearch({
  name,
  label,
  variant,
  country,
  width = 20,
  height = 20,
  borderWidth = 0,
  disable,
  placeholder,
  onFocus,
  ...other
}) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const { control } = useFormContext();
  const [focused, setFocused] = useState(false);

  const loaded = useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      );
    }
    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        if (country) {
          const requestWithCountry = {
            ...request,
            region: 'fr',
            componentRestrictions: {
              country,
            },
          };

          autocompleteService.current.getPlacePredictions(
            requestWithCountry,
            callback
          );
        } else {
          autocompleteService.current.getPlacePredictions(request, callback);
        }
      }, 400),
    [country]
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          {...other}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.description
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          disable={disable}
          fullWidth
          noOptionsText='Aucun résultat'
          onFocus={onFocus}
          onChange={(event, newValue) => {
            field.onChange(newValue?.description);
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          error={!!error}
          helperText={error?.message}
          renderInput={(params) => (
            <Stack spacing={1}>
              <Typography variant='caption' color={error && '#D63E3E'}>
                {placeholder}
              </Typography>
              <TextField
                {...params}
                label={
                  <Box sx={{ display: 'flex' }}>
                    <Iconify
                      icon={'zondicons:location'}
                      width={width}
                      height={height}
                      color={focused ? 'red' : '#000'}
                      sx={{ marginX: 1 }}
                    />
                    <Typography variant={variant}>{label}</Typography>
                  </Box>
                }
                placeholder={placeholder}
                fullWidth
                onFocus={handleFocus}
                onBlur={handleBlur}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderWidth: 1,
                      borderColor: 'rgba(145, 158, 171, 0.24)',
                    },
                  },
                  '& .MuiAutocomplete-endAdornment': {
                    display: 'none',
                  },
                }}
                error={!!error}
                helperText={error?.message}
              />
            </Stack>
          )}
          renderOption={(props, option) => {
            const matches =
              option.structured_formatting.main_text.matched_substrings || [];

            const parts = parse(
              option.structured_formatting.main_text,
              matches.map((match) => [
                match.offset,
                match.offset + match.length,
              ])
            );

            return (
              <li key={option} {...props}>
                <Grid container>
                  <Grid item sx={{ display: 'flex', width: 44 }}>
                    <Iconify icon={'ph:map-pin-fill'} color='red' />
                  </Grid>
                  <Grid
                    item
                    sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
                  >
                    {parts.map((part, index) => (
                      <Box
                        key={index}
                        component='span'
                        sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                      >
                        {part.text} {/* Correct rendering of parsed text */}
                      </Box>
                    ))}
                    <Typography variant='caption' color='text.secondary'>
                      {option.description}
                    </Typography>
                  </Grid>
                </Grid>
              </li>
            );
          }}
        />
      )}
    />
  );
}
