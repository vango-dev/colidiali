import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import parse from 'autosuggest-highlight/parse';
import {
  Autocomplete,
  Box,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
  debounce,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import Iconify from '../Iconify';

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

RHFMapMultiSearch.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

export default function RHFMapMultiSearch({
  name,
  label,
  variant,
  width = 20,
  height = 20,
  borderWidth = 0,
  placeholder,
  ...other
}) {
  const [value, setValue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const { control } = useFormContext();

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
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
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

        if (value.length > 0) {
          newOptions = [...value];
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

  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          {...other}
          multiple
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.description
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          fullWidth
          noOptionsText='Aucun résultat'
          onChange={(event, newValue) => {
            const descriptions = newValue.map((option) =>
              typeof option === 'string' ? option : option.description
            );
            field.onChange(descriptions);
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={index}
                size='small'
                label={typeof option === 'string' ? option : option.description}
              />
            ))
          }
          renderInput={(params) => (
            <Stack spacing={1}>
              <Typography variant='subtitle2' color={error && '#D63E3E'}>
                {placeholder}
              </Typography>
              <TextField
                {...params}
                label={
                  <Box
                    sx={{
                      display: 'flex',
                    }}
                  >
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
                  backgroundColor: 'white',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderWidth: borderWidth,
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
              option?.structured_formatting?.main_text?.matched_substrings ||
              [];

            const parts = parse(
              option?.structured_formatting?.main_text,
              matches.map((match) => [
                match.offset,
                match.offset + match.length,
              ])
            );

            return (
              <li {...props}>
                <Grid container>
                  <Grid item sx={{ display: 'flex', width: 44 }}>
                    <Iconify icon={'ph:map-pin-fill'} color='red' />
                  </Grid>
                  <Grid
                    item
                    sx={{
                      width: 'calc(100% - 44px)',
                      wordWrap: 'break-word',
                    }}
                  >
                    {parts.map((part, index) => (
                      <Box
                        key={index}
                        component='span'
                        sx={{
                          fontWeight: part.highlight ? 'bold' : 'regular',
                        }}
                      >
                        {part.text}
                      </Box>
                    ))}
                    <Typography variant='subtitle2' color='text.secondary'>
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
