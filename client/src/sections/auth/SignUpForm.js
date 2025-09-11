import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Iconify from '../../components/Iconify';
import {
  FormProvider,
  RHFCountry,
  RHFPhone,
  RHFTextField,
} from '../../components/hook-form';
import { HEADER } from '../../config';
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { VerifyCodeForm } from '../../sections/auth/verify-code';
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: 500,
  width: 800,
  alignItems: 'center',
  padding: theme.spacing(1, 0),
  marginTop: HEADER.MAIN_DESKTOP_HEIGHT,
  backgroundColor: '#ffffff',
  borderRadius: 12,
}));
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

export default function SignUpForm({ user }) {
  const { enqueueSnackbar } = useSnackbar();

  const smUp = useResponsive('up', 'sm');
  const isMountedRef = useIsMountedRef();
  const [, setCountryIso] = useState('');

  const { addUserInfo, verifyPhoneNumber } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const NewUserSchema = Yup.object().shape({
    fName: Yup.string().required('Ce champs est obligatoire'),
    lName: Yup.string().required('Ce champs est obligatoire'),
    phone: Yup.string()
      .phone('Numéro de téléphone invalide')
      .required('Ce champs est obligatoire'),
    email: Yup.string()
      .email('Adresse e-mail incorrecte')
      .required('Ce champs est obligatoire'),
    companyName: Yup.string().required('Ce champs est obligatoire'),
    country: Yup.string().required('Ce champs est obligatoire'),
    password: Yup.string()
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
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  });

  const defaultValues = {
    fName: '',
    lName: '',
    phone: '',
    email: '',
    companyName: '',
    country: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const [phone, setPhone] = useState(null);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = methods;

  const onSubmit = async (data) => {
    try {
      const { phone } = data;
      const response = await verifyPhoneNumber(data.phone);
      console.log('🚀 ~ onSubmit ~ response:', response);
      await addUserInfo(data);
      handleOpen();
      setPhone(phone);
      enqueueSnackbar('OTP sent successfully!', { variant: 'success' });
      // const response = await axios.get(`/api/transporters/verify/${phone}`);
      // if (response.status === 200) {
      //   handleOpen();
      //   setPhone(data.phone);

      //   // navigate(PATH_AUTH.verify);
      // }
    } catch (error) {
      console.log('🚀 ~ file: RegisterForm.js:151 ~ onSignUp ~ error:', error);
      //   reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {!!errors.afterSubmit && (
          <Alert severity='error'>{errors.afterSubmit.message}</Alert>
        )}

        <Stack spacing={3} mt={2}>
          <Grid container justifyContent={'space-between'}>
            <Grid item md={5.8} xs={12} mb={3}>
              <RHFTextField name='lName' placeholder={'Votre nom *'} />
            </Grid>
            <Grid item md={5.8} xs={12}>
              <RHFTextField name='fName' placeholder={'Votre prénom *'} />
            </Grid>
          </Grid>

          <Stack spacing={2}>
            <RHFPhone
              name='phone'
              placeholder={'Votre numéro de téléphone *'}
            />
          </Stack>

          <Stack>
            <RHFTextField name='email' placeholder={'Votre adresse mail *'} />
          </Stack>

          <Grid container justifyContent={'space-between'}>
            {user === 'transporter' && (
              <Grid item md={5.8} xs={12}>
                <RHFTextField
                  name='companyName'
                  placeholder={`Nom de l'entreprise`}
                />
              </Grid>
            )}
            <Grid item md={user === 'transporter' ? 5.8 : 12} xs={12}>
              <Stack spacing={2}>
                <RHFCountry
                  name='country'
                  placeholder='Pays'
                  setCountryIso={setCountryIso}
                />
              </Stack>
            </Grid>
          </Grid>

          <Stack>
            <RHFTextField
              name='password'
              isPassword={true}
              type={showPassword ? 'text' : 'password'}
              placeholder={'Votre mote de passe'}
              showPassword={showPassword}
              showPasswordHandler={() => setShowPassword(!showPassword)}
            />
          </Stack>

          <Stack spacing={0}>
            <RHFTextField
              name='confirmPassword'
              isPassword={true}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={'Confirmer votre mot de passe'}
              showPassword={showConfirmPassword}
              showPasswordHandler={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            />
            <Typography
              variant={smUp ? 'body2' : 'caption'}
              color='text.secondary'
              sx={{ fontWeight: 300 }}
            >
              Use 8 or more characters with a mix of letters, numbers and
              symbols
            </Typography>
          </Stack>

          <Typography
            variant={smUp ? 'body1' : 'caption'}
            color='text.secondary'
          >
            En créant un compte, vous acceptez{' '}
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
            type='submit'
            loading={isSubmitting}
            size='large'
            variant='contained'
            color='warning'
            sx={{ p: 1.5, borderRadius: 0.6, fontSize: 16, fontWeight: 700 }}
          >
            S'INSCRIRE
          </LoadingButton>

          <Divider>
            <Typography variant='body1' sx={{ fontWeight: 550 }}>
              Ou se s'inscrire avec
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

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <RootStyle>
          <Container>
            <Box sx={{ maxWidth: 600, mx: 'auto' }}>
              <Button
                size='small'
                onClick={() => handleClose()}
                startIcon={
                  <Iconify
                    icon={'eva:arrow-ios-back-fill'}
                    width={20}
                    height={20}
                  />
                }
                sx={{ mb: 3 }}
              >
                Précédant
              </Button>

              <Stack direction='row' justifyContent='center'>
                <Iconify
                  height={50}
                  width={50}
                  icon={'solar:lock-outline'}
                  color={'#000000'}
                />
              </Stack>

              <Typography
                variant='h3'
                paragraph
                sx={{ color: 'text.primary', textAlign: 'center' }}
              >
                Nous avons envoyé un code{' '}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: 'text.secondary', textAlign: 'center' }}
              >
                {`Enter the code that we have sent to ${phone}`}
              </Typography>

              <Box sx={{ mt: 5, mb: 1 }}>
                <VerifyCodeForm phone={phone} />
              </Box>

              <Stack direction='row' justifyContent='center'>
                <Link
                  sx={{ alignContent: 'center' }}
                  variant='body2'
                  underline='none'
                  onClick={() => {}}
                >
                  Renvoyer le code
                </Link>
              </Stack>
            </Box>
          </Container>
        </RootStyle>
      </Backdrop>
    </>
  );
}
