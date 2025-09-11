import {
  Box,
  Chip,
  Collapse,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { noCase } from 'change-case';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { IconButtonAnimate } from '../../../components/animate';
import Iconify from '../../../components/Iconify';
import {
  clearPage,
  deleteTransporterDeparture,
} from '../../../redux/slices/departure';
import { useDispatch } from '../../../redux/store';
import { fDate, fIsBefore, fSameDay } from '../../../utils/formatTime';
import TransporterItinerary from '../../transporters/TransporterItinerary';
import DepartureDuplicate from './DepartureDuplicate';
import DepartureMoreMenu from './DepartureMoreMenu';

// ----------------------------------------------------------------------
export default function DepartureItem({ departure }) {
  const [openDuplicate, setOpenDuplicate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const { _id, departureCoordinates, destinationCoordinates, departureTime } =
    departure;

  const departureCountry = departureCoordinates?.country;
  const destinationCountry = destinationCoordinates?.country;

  const handleDeleteDeparture = async (_id) => {
    try {
      dispatch(deleteTransporterDeparture(_id));
      dispatch(clearPage());
      enqueueSnackbar('Départ supprimé avec succés', { variant: 'warning' });
    } catch (error) {
      console.log('🚀 ~ handleDeleteDeparture ~ error:', error);
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={'space-evenly'}
        alignItems={'center'}
        sx={{ position: 'relative', width: '100%' }}
      >
        <div
          style={{
            position: 'absolute',
            left: -25,
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: '#F07C60',
          }}
        />
        <Divider
          orientation='horizontal'
          variant='middle'
          flexItem
          sx={{ width: '92%', borderColor: '#000000' }}
        />
        <div
          style={{
            position: 'absolute',
            right: -25,
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: '#F07C60',
          }}
        />
      </Stack>

      <Grid
        container
        direction='row'
        alignItems={'center'}
        justifyContent={'space-evenly'}
        my={2}
      >
        <Grid item md={0.5}>
          <IconButtonAnimate size='small' onClick={() => setIsOpen(!isOpen)}>
            <Iconify
              icon={
                isOpen
                  ? 'iconamoon:arrow-down-2-bold'
                  : 'iconamoon:arrow-right-2-bold'
              }
              style={{ color: 'black' }}
            />
          </IconButtonAnimate>
        </Grid>

        <Grid item md={2}>
          <Stack
            direction='row'
            alignItems={'center'}
            justifyContent={'center'}
            spacing={1}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify
                icon={`twemoji:flag-${noCase(departureCountry)}`}
                width='100%'
                height='100%'
                sx={{ objectFit: 'cover' }}
              />
            </Box>
            <Typography variant='subtitle2'>{departureCountry}</Typography>
          </Stack>
        </Grid>
        <Grid item md={0.5}>
          <Iconify icon='maki:arrow' style={{ color: 'black' }} />
        </Grid>
        <Grid item md={2}>
          <Stack
            direction='row'
            alignItems={'center'}
            justifyContent={'center'}
            spacing={1}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify
                icon={`twemoji:flag-${noCase(destinationCountry)}`}
                width='100%'
                height='100%'
                sx={{ objectFit: 'cover' }}
              />
            </Box>
            <Typography variant='subtitle2'>{destinationCountry}</Typography>
          </Stack>
        </Grid>

        <Divider
          orientation='vertical'
          variant='middle'
          flexItem
          sx={{ borderColor: '#000000' }}
        />

        <Grid item md={2.5} m={0}>
          <Stack
            direction='row'
            alignItems={'center'}
            justifyContent={'center'}
            spacing={1.5}
          >
            <Iconify icon='mdi:calendar-outline' height={15} width={15} />
            {fIsBefore(departureTime) ? (
              <Chip size='small' label={fDate(departureTime)} color={'error'} />
            ) : fSameDay(departureTime) ? (
              <Chip size='small' label={fDate(departureTime)} color={'info'} />
            ) : (
              <Chip size='small' label={fDate(departureTime)} />
            )}
          </Stack>
        </Grid>
        <Grid item md={1}>
          <DepartureMoreMenu
            onDelete={() => handleDeleteDeparture(_id)}
            onDuplicate={() => setOpenDuplicate(true)}
            departureId={_id}
          />
        </Grid>

        <Collapse in={isOpen} sx={{ width: '85%' }}>
          <Grid container direction='row' justifyContent={'flex-start'} mb={0}>
            <Grid item xs={12} justifySelf={'start'}>
              <TransporterItinerary trajectory={departure} />
            </Grid>
          </Grid>
        </Collapse>

        <DepartureDuplicate
          openDuplicate={openDuplicate}
          openDuplicateHandler={() => setOpenDuplicate(false)}
          departure={departure}
        />
      </Grid>
    </>
  );
}
