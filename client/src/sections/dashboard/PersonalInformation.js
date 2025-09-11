import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// components
import { LoadingButton } from '@mui/lab';
import {
  FormProvider,
  RHFMapSearch,
  RHFPhone,
  RHFTextField,
} from '../../components/hook-form';
import RHFCountry from '../../components/hook-form/RHFCountry';
import { RHFUploadAvatar } from '../../components/hook-form/RHFUpload';
import useAuth from '../../hooks/useAuth';
import { onNextStep } from '../../redux/slices/transporter';
import { useDispatch } from '../../redux/store';
import { fData } from '../../utils/formatNumber';
import { useLocation } from 'react-router-dom';
import { ProgressItem } from '../../components/upload';
import parsePhoneNumberFromString from 'libphonenumber-js';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------
Yup.addMethod(Yup.string, 'phone', function (message) {
  return this.test('phone', message, function (value) {
    const { path, createError } = this;
    const phoneNumber = parsePhoneNumberFromString(value);
    return (
      (phoneNumber && phoneNumber.isValid()) ||
      createError({ path, message: message || 'Numéro de téléphone invalide' })
    );
  });
});

// ----------------------------------------------------------------------
export default function PersonalInformation() {
  const { pathname } = useLocation();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const smUp = useResponsive('up', 'sm');

  const [countryIso, setCountryIso] = useState('');

  const isDashboard = pathname.includes('dashboard');

  const dispatch = useDispatch();

  const [file, setFile] = useState('');

  const { user, addUserInfo, updateUser, transporterPhoto } = useAuth();

  const NewUserSchema = Yup.object().shape({
    fName: Yup.string().required('Ce champs est obligatoire'),
    lName: Yup.string().required('Ce champs est obligatoire'),
    phone: Yup.string()
      .phone('Numéro de téléphone invalide')
      .required('Ce champs est obligatoire'),
    email: Yup.string()
      .email('Adresse e-mail incorrecte')
      .required('Ce champs est obligatoire'),
    country: Yup.string().required('Ce champs est obligatoire'),
    transporterPhoto: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      fName: user?.fName || '',
      lName: user?.lName || '',
      phone: user?.phone || '',
      email: user?.email || '',
      country: user?.country || '',
      address: user?.address || '',
      transporterPhoto: user?.transporterPhoto || '',
    }),
    [user]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    setError,
    watch,
  } = methods;
  console.log('🚀 ~ PersonalInformation ~ watch:', watch('country'));

  useEffect(() => {
    if (transporterPhoto) {
      setValue('transporterPhoto', transporterPhoto);
      setFile('');
    }
  }, [transporterPhoto, setValue]);

  const saveUserInfoHandler = async (data) => {
    try {
      if (isDashboard) {
        await updateUser(data);
        enqueueSnackbar('Modification effectuée avec succès!', {
          variant: 'success',
        });
      } else {
        await addUserInfo(data);
        dispatch(onNextStep());
      }
    } catch (error) {
      console.log('🚀 ~ saveUserInfoHandler ~ error:', error);
      if (isMountedRef.current) {
        setError('afterSubmit', error);
        enqueueSnackbar(error, { variant: 'error' });
      }
    }
  };

  const handleDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    setFile(Object.assign(file, { preview: URL.createObjectURL(file) }));
  }, []);

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(saveUserInfoHandler)}
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
          py={smUp ? 5 : 2}
          pr={{ md: 5, xs: 0 }}
        >
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              {file ? (
                <>
                  <ProgressItem file={file} isProfileUrl={true} />
                </>
              ) : (
                <RHFUploadAvatar
                  name='transporterPhoto'
                  accept='image/*'
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemovePhotoHandler={() =>
                    setValue('transporterPhoto', null)
                  }
                  helperText={
                    <Typography
                      variant='caption'
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack mb={{ md: 5, xs: 2 }} mx={{ md: 0, xs: 3 }}>
              <Typography
                variant='h5'
                mb={{ md: 2, xs: 1 }}
                sx={{ fontWeight: 450 }}
              >
                Personal Information
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
                <RHFTextField name='fName' placeholder={'Prénom'} />
              </Stack>
              <Stack spacing={1}>
                <RHFTextField name='lName' placeholder={'Nom'} />
              </Stack>

              <Stack spacing={1}>
                <RHFTextField name='email' placeholder={'Email'} />
              </Stack>

              <Stack spacing={1}>
                <RHFPhone
                  name='phone'
                  placeholder={'Numéro de téléphone'}
                  disabledPhone={true}
                />
              </Stack>

              <Stack spacing={1}>
                <RHFCountry
                  name='country'
                  placeholder={'Pays'}
                  setCountryIso={setCountryIso}
                />
              </Stack>

              <Stack spacing={1}>
                <RHFMapSearch
                  name='address'
                  borderWidth={1}
                  placeholder={'Ville'}
                  country={countryIso}
                  disabled={countryIso ? false : true}
                />
              </Stack>
            </Box>
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
