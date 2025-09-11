import { useMemo, useState } from 'react';
import * as Yup from 'yup';
// @mui
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
// form
import { useForm } from 'react-hook-form';
// components
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router-dom';
import {
  FormProvider,
  RHFEditor,
  RHFMapSearch,
  RHFTextField,
} from '../../components/hook-form';
import RHFCountry from '../../components/hook-form/RHFCountry';
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
import { onNextStep } from '../../redux/slices/transporter';
import { useDispatch } from '../../redux/store';

// ----------------------------------------------------------------------
export default function CompanyInformation() {
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('dashboard');

  const smUp = useResponsive('up', 'sm');

  const [countryIso, setCountryIso] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const { user, companyInfo, addCompanyInfo, updateUser } = useAuth();

  const TransporterCompanySchema = Yup.object().shape({
    transportType: Yup.string(),
    companyName: Yup.string(),
    companyEmail: Yup.string().email('Adresse e-mail incorrecte'),
    companyActivity: Yup.string(),
    companyAddress: Yup.string(),
    companyCountry: Yup.string(),
    companyObservation: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      transportType: user?.transportType || companyInfo?.transportType || '',
      companyName: user?.companyName || companyInfo?.companyName || '',
      companyEmail: user?.companyEmail || companyInfo?.companyEmail || '',
      companyActivity:
        user?.companyActivity || companyInfo?.companyActivity || '',
      companyAddress: user?.companyAddress || companyInfo?.companyAddress || '',
      companyCountry: user?.companyCountry || companyInfo?.companyCountry || '',
      companyObservation:
        user?.companyObservation || companyInfo?.companyObservation || '',
    }),
    [companyInfo, user]
  );

  const methods = useForm({
    resolver: yupResolver(TransporterCompanySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const saveCompanyInfoHandler = async (data) => {
    try {
      if (isDashboard) {
        await updateUser(data);
        enqueueSnackbar('Modification effectuée avec succès!', {
          variant: 'success',
        });
      } else {
        await addCompanyInfo(data);
        dispatch(onNextStep());
      }
    } catch (error) {
      console.log('🚀 ~ saveCompanyInfoHandler ~ error:', error);
    }
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(saveCompanyInfoHandler)}
    >
      <Card>
        <CardHeader
          sx={{ position: 'absolute', top: smUp ? 10 : 160, zIndex: 10000 }}
          titleTypographyProps={{ fontSize: smUp ? 120 : 18 }}
          title='Profile'
        />
        <Grid
          container
          alignItems={'center'}
          justifyContent={'center'}
          py={smUp ? 5 : 2}
          pr={{ md: 5, xs: 0 }}
        >
          <Grid item xs={12} md={10}>
            <Stack mb={{ md: 5, xs: 2 }} mx={{ md: 0, xs: 3 }}>
              <Typography
                variant='h5'
                mb={{ md: 2, xs: 1 }}
                sx={{ fontWeight: 450 }}
              >
                Company Information
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
                  sm: 'repeat(2,1fr)',
                },
              }}
            >
              <Stack spacing={1}>
                <RHFTextField
                  name='transportType'
                  placeholder={'Type de transport'}
                />
              </Stack>
              <Stack spacing={1}>
                <RHFTextField name='companyName' placeholder={'Company Name'} />
              </Stack>

              <Stack spacing={1}>
                <RHFTextField
                  name='companyEmail'
                  placeholder={'Corporate Email'}
                />
              </Stack>

              <Stack spacing={1}>
                <RHFTextField
                  name='companyActivity'
                  placeholder={"Activités de l'entreprise"}
                />
              </Stack>

              <Stack spacing={1}>
                <RHFCountry
                  name='companyCountry'
                  setCountryIso={setCountryIso}
                  placeholder={'Country'}
                />
              </Stack>

              <Stack spacing={1}>
                <RHFMapSearch
                  name='companyAddress'
                  borderWidth={1}
                  placeholder={'Address'}
                  country={countryIso}
                  disabled={countryIso ? false : true}
                />
              </Stack>
            </Box>
            <Stack spacing={1} mt={2} px={{ md: 0, xs: 2 }}>
              <Typography variant='subtitle1'>Observation</Typography>
              <RHFEditor simple name='companyObservation' />
            </Stack>
            <Stack spacing={1} sx={{ mt: 3 }}>
              <LoadingButton
                type='submit'
                loading={isSubmitting}
                variant='contained'
                color='warning'
                sx={{
                  width: { md: 0.25, xs: 0.93 },
                  alignSelf: { md: 'end', xs: 'center' },
                  paddingY: { md: 1, xs: 1 },
                }}
              >
                {isDashboard ? 'Save Modifications' : 'Continue'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </FormProvider>
  );
}
