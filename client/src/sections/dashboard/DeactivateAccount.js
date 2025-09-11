import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Backdrop,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { HEADER } from '../../config';
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';

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

export default function DeactivateAccount() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const isMountedRef = useIsMountedRef();

  const { updateUserParameter, user } = useAuth();

  const NewUserSchema = Yup.object().shape({
    password: Yup.string().required('Ce champs est obligatoire'),
  });

  const defaultValues = {
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = methods;

  const deactivateAccountHandler = async (data) => {
    const updatedUser = { ...data, isActivated: !user?.isActivated };
    try {
      await updateUserParameter(updatedUser);
      setOpen(false);
      if (!user?.isActivated) {
        enqueueSnackbar('Votre compte est activé', { variant: 'success' });
      } else {
        enqueueSnackbar('Votre compte est désactivé', { variant: 'warning' });
      }
    } catch (error) {
      console.log('🚀 ~ deactivateAccountHandler ~ error:', error);
      if (isMountedRef.current) {
        setError('afterSubmit', error);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  };

  return (
    <>
      <Stack spacing={2}>
        <Typography variant='subtitle1'>Deactivate Account</Typography>
        <Typography
          variant='body2'
          sx={{ color: 'text.secondary', textAlign: 'start' }}
        >
          Select this option if you wish to temporarily suspend your account.
          Your profile and information will be hidden from other users, but you
          can reactivate it at any time by logging in again.
        </Typography>
      </Stack>
      <Stack spacing={1}>
        <Button
          onClick={() => setOpen(true)}
          variant='contained'
          color='warning'
          sx={{ width: 0.3, alignSelf: 'start', py: 2 }}
        >
          {user?.isActivated ? 'Deactivate Account' : 'Reactivate Account'}
        </Button>
      </Stack>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(deactivateAccountHandler)}
      >
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <RootStyle>
            <Container>
              <Box sx={{ maxWidth: 600, mx: 'auto' }}>
                <Button
                  size='small'
                  onClick={() => setOpen(false)}
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
                    icon={'fe:disabled'}
                    color={'#000000'}
                    mb={2}
                  />
                </Stack>

                <Typography
                  variant='h6'
                  paragraph
                  sx={{ color: 'text.primary', textAlign: 'center' }}
                >
                  Veuillez insérer votre mot de passe pour confirmer l'operation
                </Typography>
                {/* <Typography
                variant='body2'
                sx={{ color: 'text.secondary', textAlign: 'center' }}
              >
                {`Enter the code that we have sent to `}
              </Typography> */}

                <Box sx={{ mt: 5, mb: 1 }}>
                  <RHFTextField
                    name='password'
                    isPassword={true}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={'Votre mote de passe'}
                    showPasswordHandler={() => setShowPassword(!showPassword)}
                  />
                </Box>

                <Stack direction='row' justifyContent='center' my={3}>
                  <LoadingButton
                    type='submit'
                    loading={isSubmitting}
                    variant='contained'
                    color='warning'
                    sx={{ width: 0.35, alignSelf: 'end', p: 2 }}
                  >
                    {user?.isActivated
                      ? 'Désactiver le compte'
                      : 'Réactiver le compte'}
                  </LoadingButton>
                </Stack>
              </Box>
            </Container>
          </RootStyle>
        </Backdrop>
      </FormProvider>
    </>
  );
}
