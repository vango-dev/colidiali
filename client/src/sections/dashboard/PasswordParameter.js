import { useState } from 'react';
import * as Yup from 'yup';
// @mui
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// components
import { LoadingButton } from '@mui/lab';
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import useAuth from '../../hooks/useAuth';
import { useSnackbar } from 'notistack';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// ----------------------------------------------------------------------
export default function PasswordParameter() {
  const { enqueueSnackbar } = useSnackbar();
  const { updateUserParameter } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const NewUserSchema = Yup.object().shape({
    password: Yup.string(),
    newPassword: Yup.string()
      .required('Ce champs est obligatoire')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character'
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      'Passwords must match'
    ),
  });

  const defaultValues = {
    password: '',
    newPassword: '',
    confirmPassword: '',
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
        reset();
      }
    }
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(saveUserInfoHandler)}
    >
      <Card>
        <CardHeader
          sx={{ position: 'absolute', top: 10, zIndex: 10000 }}
          titleTypographyProps={{ fontSize: 120 }}
          title='Paramètre'
        />
        <Grid container alignItems={'center'} py={5} pr={5}>
          <Grid item xs={12} md={11} mx={8}>
            <Stack mb={5}>
              <Typography variant='h5' mb={2} sx={{ fontWeight: 450 }}>
                Password
              </Typography>
              <Divider />
            </Stack>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: {
                  xs: 'repeat(1,1fr)',
                  sm: 'repeat(1,1fr)',
                },
              }}
            >
              <Stack spacing={0}>
                <RHFTextField
                  name='password'
                  type={showCurrentPassword ? 'text' : 'password'}
                  placeholder='Current Password'
                  isPassword={true}
                  showPassword={showCurrentPassword}
                  showPasswordHandler={() =>
                    setShowCurrentPassword(!showCurrentPassword)
                  }
                />
              </Stack>

              <Stack spacing={0}>
                <RHFTextField
                  name='newPassword'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Votre mot de passe'
                  isPassword={true}
                  showPassword={showPassword}
                  showPasswordHandler={() => setShowPassword(!showPassword)}
                />
              </Stack>

              <Stack spacing={0}>
                <RHFTextField
                  name='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Confirmer votre mot de passe'
                  isPassword={true}
                  showPassword={showConfirmPassword}
                  showPasswordHandler={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                />

                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ fontWeight: 300 }}
                >
                  Use 8 or more characters with a mix of letters, numbers and
                  symbols
                </Typography>
              </Stack>

              <Stack spacing={1}>
                <LoadingButton
                  type='submit'
                  loading={isSubmitting}
                  variant='contained'
                  color='warning'
                  sx={{ width: 0.25, alignSelf: 'end', py: 1 }}
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
