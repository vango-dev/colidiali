import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useResponsive from '../../hooks/useResponsive';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Grid, IconButton, Paper, Stack } from '@mui/material';
// redux
import { getDepartures } from '../../redux/slices/departure';
import { useDispatch } from '../../redux/store.js';
// components
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Iconify from '../../components/Iconify';
import {
  FormProvider,
  RHFDateSearch,
  RHFMapSearch,
} from '../../components/hook-form';

export default function TransporterSearchForm({
  withPaper = true,
  searchParams,
}) {
  console.log('🚀 ~ searchParams:', searchParams);
  const isDesktop = useResponsive('up', 'md');
  const isMountedRef = useIsMountedRef();
  const { pathname } = useLocation();

  const [openSearchFields, setOpenSearchFields] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isHome = pathname === '/';

  const TripSchema = Yup.object().shape({
    departure: Yup.string().required('* Ce champ est obligatoire'),
    destination: Yup.string().nullable(),
    date: Yup.date().nullable(),
  });

  const defaultValues = useMemo(
    () => ({
      departure: searchParams?.get('departure'),
      destination: searchParams?.get('destination') || undefined,
      date: searchParams && Date(searchParams.get('date')),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams]
  );

  const methods = useForm({ resolver: yupResolver(TripSchema), defaultValues });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    if (searchParams) {
      reset(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const onSubmit = async (data, activePage) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    try {
      dispatch(getDepartures(data));

      navigate(
        `/transporters/map?departure=${data?.departure}&${
          data && data.destination && 'destination=' + data.destination
        }&${data && data.date && 'date=' + data.date}`
      );
      setOpenSearchFields(!openSearchFields);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
        console.log('🚀 ~ onSubmit ~ error:', error);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && (
        <Alert severity='error'>{errors.afterSubmit.message}</Alert>
      )}

      {withPaper ? (
        isHome ? (
          <Stack
            direction={{ sm: 'column', md: 'row' }}
            sx={{
              backgroundColor: { md: 'white', sm: 'none' },
              p: 1,
              borderRadius: 2,
            }}
          >
            <Paper
              sx={{
                p: '2px 4px',
                display: 'flex',
                marginBottom: { xs: 5, md: 0 },
                width: { md: 400, xs: '90%' },
              }}
            >
              <RHFMapSearch
                borderWidth={2}
                name='departure'
                label='Point de départ'
              />
            </Paper>
            {isDesktop && (
              <IconButton sx={{ p: '10px' }}>
                <Iconify icon='heroicons:arrows-right-left-20-solid' />
              </IconButton>
            )}
            <Paper
              sx={{
                p: '2px 4px',
                display: 'flex',
                marginBottom: { xs: 5, md: 0 },
                width: { md: 400, xs: '90%' },
              }}
            >
              <RHFMapSearch name='destination' label='Destination' />
            </Paper>

            <Paper
              sx={{
                p: '2px 4px',
                display: 'flex',
                mx: { sm: 0, md: 1 },
                marginBottom: { xs: 5, md: 0 },
                width: { md: 400, xs: '90%' },
              }}
            >
              <RHFDateSearch
                name='date'
                label='Date de départ'
                variant={'body2'}
              />

              <LoadingButton
                type='submit'
                loading={isSubmitting}
                sx={{
                  background: 'black',
                  borderRadius: 0.5,
                  width: { md: '25%' },
                  height: { md: '90%', xs: '50%' },
                  alignSelf: 'center',
                }}
              >
                <Iconify
                  icon='fontisto:search'
                  color={'white'}
                  width={25}
                  height={25}
                />
              </LoadingButton>
            </Paper>
          </Stack>
        ) : (
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{
              backgroundColor: { md: 'white', xs: 'primary.main' },
              p: { md: 1, xs: 3 },
              borderRadius: { md: 2, xs: 0 },
              mt: { md: 0, xs: '5.5vh' },
              width: { md: '42vw', xs: '100vw' },
            }}
            gap={2}
          >
            <Paper
              sx={{
                p: { md: '2px 4px', xs: 0 },
                display: 'flex',
                width: { md: 400, xs: '100%' },
              }}
            >
              <RHFMapSearch name='departure' label='Point de départ' />
            </Paper>
            {isDesktop && (
              <IconButton sx={{ p: '10px' }}>
                <Iconify icon='heroicons:arrows-right-left-20-solid' />
              </IconButton>
            )}
            <Paper
              sx={{
                p: { md: '2px 4px', xs: 0 },
                display: 'flex',
                width: { md: 400, xs: '100%' },
              }}
            >
              <RHFMapSearch name='destination' label='Destination' />
            </Paper>

            <Paper
              sx={{
                p: { md: '2px 4px', xs: 0 },
                display: 'flex',
                mx: { sm: 0, md: 1 },
                width: { md: 400, xs: '100%' },
                mb: 0,
              }}
            >
              <RHFDateSearch
                name='date'
                label='Date de départ'
                variant={'body2'}
              />

              <LoadingButton
                type='submit'
                loading={isSubmitting}
                sx={{
                  background: 'black',
                  borderRadius: 0.5,
                  width: { md: '25%' },
                  height: { md: '90%', xs: '50%' },
                  alignSelf: 'center',
                }}
              >
                <Iconify
                  icon='fontisto:search'
                  color={'white'}
                  width={25}
                  height={25}
                />
              </LoadingButton>
            </Paper>
          </Stack>
        )
      ) : (
        <Stack
          direction={'column'}
          sx={{
            backgroundColor: { md: 'white', sm: 'none' },
            p: 1.1,
            borderRadius: 1,
            marginTop: 12,
            marginBottom: 2,
            marginLeft: 'auto',
            width: '92%',
            position: 'relative',
          }}
        >
          <Grid container spacing={2}>
            {!openSearchFields ? (
              <>
                <Grid item md={11}>
                  <Grid container>
                    <Grid item md={12}>
                      <RHFMapSearch
                        name='departure'
                        label='Point de départ'
                        variant='caption'
                        height={17}
                        width={17}
                        onFocus={() => setOpenSearchFields(true)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid item md={11}>
                  <Grid container>
                    <Grid item md={12}>
                      <RHFMapSearch
                        name='departure'
                        label='Point de départ'
                        variant='caption'
                        height={17}
                        width={17}
                      />
                    </Grid>
                    <Grid item md={12}>
                      <RHFMapSearch
                        name='destination'
                        label='Destination'
                        variant='caption'
                        height={17}
                        width={17}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={1} sx={{ alignSelf: 'center' }}>
                  <IconButton sx={{ p: '2px', color: 'black' }}>
                    <Iconify
                      icon='humbleicons:arrows-up-down'
                      height={25}
                      width={25}
                      sx={{ color: 'black' }}
                    />
                  </IconButton>
                </Grid>
                <Grid item md={11}>
                  <RHFDateSearch
                    name='date'
                    label='Date de départ'
                    variant='caption'
                    height={17}
                    width={17}
                  />
                </Grid>
                <Grid
                  md={1}
                  container
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    mt: 2,
                  }}
                >
                  <IconButton
                    type='submit'
                    sx={{
                      background: 'black',
                      borderRadius: 0.5,
                      ml: 1,
                    }}
                  >
                    <Iconify
                      icon='fontisto:search'
                      color={'white'}
                      width={20}
                      height={20}
                    />
                  </IconButton>
                </Grid>
              </>
            )}
          </Grid>
        </Stack>
      )}
    </FormProvider>
  );
}
