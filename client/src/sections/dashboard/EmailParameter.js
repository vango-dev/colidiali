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
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useResponsive from '../../hooks/useResponsive';
// ----------------------------------------------------------------------
export default function EmailParameter() {
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const isMountedRef = useIsMountedRef();

  const smUp = useResponsive('up', 'sm');

  const { user, updateUserParameter } = useAuth();

  const NewUserSchema = Yup.object().shape({
    email: Yup.string()
      .email('Adresse e-mail incorrecte')
      .required('Ce champs est obligatoire'),
  });

  const defaultValues = {
    password: '',
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setError,
    reset,
  } = methods;

  const saveUserInfoHandler = async (data) => {
    try {
      await updateUserParameter(data);
      enqueueSnackbar('Modification effectuée avec succès!', {
        variant: 'success',
      });
      reset();
    } catch (error) {
      console.log('🚀 ~ saveUserInfoHandler ~ error:', error);
      if (isMountedRef.current) {
        setError('afterSubmit', error);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
      reset();
    }
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(saveUserInfoHandler)}
    >
      <Card sx={{ mt: { md: 0, xs: 8 } }}>
        <CardHeader
          sx={{ position: 'absolute', top: smUp ? 10 : 160, zIndex: 10000 }}
          titleTypographyProps={{ fontSize: smUp ? 120 : 18 }}
          title='Paramètre'
        />
        <Grid
          container
          alignItems={'center'}
          justifyContent={'center'}
          py={{ md: 5, xs: 2 }}
          pr={{ md: 5, xs: 0 }}
        >
          <Grid item xs={12} md={11} mx={{ md: 8, xs: 0 }}>
            <Stack mb={{ md: 5, xs: 2 }} mx={{ md: 0, xs: 3 }}>
              <Typography variant='h5' mb={2} sx={{ fontWeight: 450 }}>
                Email
              </Typography>
              <Divider />
              <Typography
                variant='body2'
                sx={{ color: 'text.secondary', textAlign: 'start' }}
              >
                Your current Primary email address is :{' '}
                <span style={{ color: '#EF6E4F' }}>{user?.email}</span>
              </Typography>
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
                <RHFTextField
                  isPassword={true}
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  showPasswordHandler={() => setShowPassword(!showPassword)}
                  placeholder={'Mot de passe'}
                />
              </Stack>

              <Stack spacing={1}>
                <RHFTextField name='email' placeholder={'New Email Address'} />
              </Stack>
              <Stack spacing={1}>
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
                  Save changes
                </LoadingButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </FormProvider>
  );
}
