import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';
import {
  FormProvider,
  RHFDateSearch,
  RHFMapMultiSearch,
  RHFMapSearch,
  RHFTextField,
} from '../../../components/hook-form';
import {
  addTransporterDeparture,
  clearPage,
  updateTransporterDeparture,
} from '../../../redux/slices/departure';
import { useDispatch, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { getCoordinates } from '../../../utils/coordinates';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------
export default function DepartureNewEditForm() {
  const { enqueueSnackbar } = useSnackbar();

  const isMountedRef = useIsMountedRef();

  const { futurDepartures, pastDepartures } = useSelector(
    (state) => state.departure
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const departureId = searchParams.get('departure');

  const selectedDeparture = [...futurDepartures, ...pastDepartures]?.find(
    (departure) => departure._id === departureId
  );

  const selectedTransformDeparture = selectedDeparture && {
    ...selectedDeparture,
    checkPoints: selectedDeparture.checkPoints.map((cp) => cp.point),
  };

  const [departureCoordinates, setDepartureCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [destinationCoordinates, setDestinationCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  const DepartureSchema = Yup.object().shape({
    departurePoint: Yup.string().required('Ce champ est obligatoire'),
    departureTime: Yup.date().required('Ce champ est obligatoire'),
    destinationPoint: Yup.string().required('Ce champ est obligatoire'),
    checkPoints: Yup.array(),
    destinationTime: Yup.date()
      .required('Ce champ est obligatoire')
      .test(
        'is-after-departure',
        'La date de destination doit être après la date de départ',
        function (value) {
          const { departureTime } = this.parent;
          return !departureTime || (value && value > departureTime);
        }
      ),
    departureObservation: Yup.string(),
  });

  const defaultValues = {
    departurePoint: selectedDeparture?.departurePoint || '',
    departureTime: selectedDeparture?.departureTime || new Date(),
    checkPoints: selectedDeparture?.checkPoints.map((cp) => cp.point) || [],
    destinationPoint: selectedDeparture?.destinationPoint || '',
    destinationTime:
      selectedDeparture?.destinationTime ||
      new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
    departureObservation: selectedDeparture?.departureObservation || '',
  };

  const methods = useForm({
    resolver: yupResolver(DepartureSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    setError,
  } = methods;

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDeparture]);

  const values = watch();

  useEffect(() => {
    const updateCoordinates = async () => {
      try {
        const [depCoords, destCoords] = await Promise.all([
          getCoordinates(values?.departurePoint),
          getCoordinates(values?.destinationPoint),
        ]);
        setDepartureCoordinates(depCoords);
        setDestinationCoordinates(destCoords);
      } catch (error) {
        setDepartureCoordinates({ latitude: 0, longitude: 0 });
        setDestinationCoordinates({ latitude: 0, longitude: 0 });
      }
    };

    if (values?.departurePoint || values?.destinationPoint) {
      updateCoordinates();
    }
  }, [values?.departurePoint, values?.destinationPoint]);

  const onSubmit = async (data) => {
    try {
      const newCheckPoints = await Promise.all(
        data.checkPoints.map(async (point) => {
          const coordinates = await getCoordinates(point);
          return { point, coordinates };
        })
      );

      const newDeparture = {
        ...data,
        // departureCoordinates: [
        //   departureCoordinates.latitude,
        //   departureCoordinates.longitude,
        // ],
        // destinationCoordinates: [
        //   destinationCoordinates.latitude,
        //   destinationCoordinates.longitude,
        // ],
        // checkPoints: newCheckPoints,
      };

      if (selectedDeparture) {
        dispatch(updateTransporterDeparture(departureId, data));
        reset();
        dispatch(clearPage());
        enqueueSnackbar('Modification effectuée avec succès!', {
          variant: 'success',
        });
        navigate(PATH_DASHBOARD.departues);
      } else {
        dispatch(addTransporterDeparture(data));
        reset();
        dispatch(clearPage());
        enqueueSnackbar('Départ crée  avec succès!', {
          variant: 'success',
        });
        navigate(PATH_DASHBOARD.departues);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (isMountedRef.current) {
        setError('afterSubmit', error);
        enqueueSnackbar(error, { variant: 'error' });
      }
      reset();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack mb={{ md: 2, xs: 2 }} mx={{ md: 0, xs: 3 }}>
        <Typography variant='h5' mb={{ md: 1, xs: 1 }} sx={{ fontWeight: 450 }}>
          Publier un départ
        </Typography>
        <Divider />
      </Stack>
      <Box
        sx={{
          display: 'grid',
          columnGap: 2,
          rowGap: 3,
          px: { md: 0, xs: 2 },
          gridTemplateColumns: {
            xs: 'repeat(1,1fr)',
            sm: 'repeat(1,1fr)',
          },
        }}
      >
        <Stack spacing={1}>
          <RHFMapSearch
            name='departurePoint'
            placeholder={'Lieu de départ'}
            borderWidth={0.5}
          />
        </Stack>

        <Stack spacing={1}>
          <RHFDateSearch name='departureTime' placeholder='Date de départ' />
        </Stack>

        <Stack spacing={1}>
          <RHFMapMultiSearch
            name='checkPoints'
            placeholder={'Point d’arrêt'}
            borderWidth={0.5}
          />
        </Stack>

        <Stack spacing={1}>
          <RHFMapSearch
            name='destinationPoint'
            placeholder={"Lieu d'arrivée"}
            borderWidth={0.5}
          />
        </Stack>

        <Stack spacing={1}>
          <RHFDateSearch
            name='destinationTime'
            placeholder='Date estimée d’arrivée'
            variant={'body2'}
          />
        </Stack>

        <Stack spacing={1}>
          <RHFTextField
            name='departureObservation'
            multiline
            rows={3}
            placeholder='Note'
          />
        </Stack>
      </Box>
      <Stack direction='row' justifyContent='flex-end' mt={2}>
        <LoadingButton
          size='large'
          type='submit'
          variant='contained'
          loading={isSubmitting}
          color='warning'
        >
          {selectedTransformDeparture ? 'Modify Departure' : 'Save changes'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
