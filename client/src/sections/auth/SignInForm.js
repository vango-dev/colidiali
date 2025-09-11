import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Button, Divider, Link, Stack, Typography } from '@mui/material';

// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import {
  FormProvider,
  RHFCheckbox,
  RHFPhone,
  RHFTextField,
} from '../../components/hook-form';
import useResponsive from '../../hooks/useResponsive';
import { PATH_DASHBOARD } from '../../routes/paths';
// ----------------------------------------------------------------------
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

export default function SignInForm() {
  const navigate = useNavigate();

  const smUp = useResponsive('up', 'sm');

  const [showPassword, setShowPassword] = useState(false);

  const isMountedRef = useIsMountedRef();

  const { loginUser } = useAuth();

  const LoginSchema = Yup.object().shape({
    phone: Yup.string()
      .phone('Numéro de téléphone invalide')
      .required('Ce champs est obligatoire'),
    password: Yup.string().required('Ce champs est obligatoire'),
  });

  const defaultValues = {
    phone: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
    reset,
  } = methods;

  useEffect(() => {
    if (errors.afterSubmit) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [errors.afterSubmit]);

  const onSubmit = async (data) => {
    try {
      await loginUser(data.phone, data.password);
      navigate(PATH_DASHBOARD.departures);
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
      reset({ phone: data.phone, password: '' });
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {errors.afterSubmit?.message && (
        <>
          <Alert
            severity='error'
            sx={{ mt: 2 }}
            onClose={() => {
              setError('afterSubmit', null);
            }}
          >
            {errors.afterSubmit.message}
          </Alert>
        </>
      )}
      <Stack spacing={2} mt={2}>
        <RHFPhone name='phone' placeholder={'Votre numéro de téléphone *'} />

        <Stack spacing={0}>
          <RHFTextField
            name='password'
            isPassword={true}
            type={showPassword ? 'text' : 'password'}
            placeholder={'Votre mot de passe *'}
            showPassword={showPassword}
            showPasswordHandler={() => setShowPassword(!showPassword)}
          />
          <Typography
            variant={'caption'}
            color='text.secondary'
            sx={{ fontWeight: 300 }}
          >
            Use 8 or more characters with a mix of letters, numbers and symbols
          </Typography>
        </Stack>

        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <RHFCheckbox name='remember' label='Remember me' />
          <Link sx={{ textDecoration: 'none' }} component={RouterLink} to={'/'}>
            <Typography
              variant={smUp ? 'body2' : 'caption'}
              color='text.secondary'
            >
              Mot de passe oublié
            </Typography>
          </Link>
        </Stack>

        <Typography
          sx={{ marginTop: -2 }}
          variant={smUp ? 'body2' : 'caption'}
          color='text.secondary'
        >
          En continuant, vous acceptez{' '}
          <Link component={RouterLink} to={'/'}>
            les conditions d'utilisation{' '}
          </Link>
          et{' '}
          <Link component={RouterLink} to={'/'}>
            la politique de confidentialité{' '}
          </Link>
          .
        </Typography>
        <LoadingButton
          size='large'
          type='submit'
          variant='contained'
          loading={isSubmitting}
          color='warning'
          sx={{ p: 1.5, borderRadius: 0.6, fontSize: 16, fontWeight: 700 }}
        >
          SE CONNECTER
        </LoadingButton>

        <Divider>
          <Typography variant='body1' sx={{ fontWeight: 550 }}>
            Ou se connecter avec
          </Typography>
        </Divider>
        <Button
          size='large'
          variant='outlined'
          sx={{ p: 1.5, borderRadius: 0.6, fontSize: 16, fontWeight: 700 }}
        >
          Google
        </Button>
        <Button
          size='large'
          variant='outlined'
          sx={{ p: 1.5, borderRadius: 0.6, fontSize: 16, fontWeight: 700 }}
        >
          Facebook
        </Button>
      </Stack>
    </FormProvider>
  );
}
