import * as Yup from 'yup';
// @mui
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
// form
import { useForm } from 'react-hook-form';
// components
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Iconify from '../../components/Iconify';
import {
  FormProvider,
  RHFPhone,
  RHFTextField,
} from '../../components/hook-form';
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useResponsive from '../../hooks/useResponsive';
import { onNextStep } from '../../redux/slices/transporter';
import { useDispatch } from '../../redux/store';

// ----------------------------------------------------------------------
export default function SocialsAccount() {
  const { pathname } = useLocation();
  const isMountedRef = useIsMountedRef();

  const isDashboard = pathname.includes('dashboard');
  const { enqueueSnackbar } = useSnackbar();

  const smUp = useResponsive('up', 'sm');

  const dispatch = useDispatch();
  const { socialAccounts, addSocialAccounts, user, updateUser } = useAuth();

  const TransporterSocialAccountsSchema = Yup.object().shape({
    transporterFacebook: Yup.string(),
    transporterInstagram: Yup.string(),
    transporterWhatsApp: Yup.string(),
    transporterWebsite: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      transporterFacebook:
        user?.transporterFacebook || socialAccounts?.transporterFacebook || '',
      transporterInstagram:
        user?.transporterInstagram ||
        socialAccounts?.transporterInstagram ||
        '',
      transporterWhatsApp:
        user?.transporterWhatsApp || socialAccounts?.transporterWhatsApp || '',
      transporterWebsite:
        user?.transporterWebsite || socialAccounts?.transporterWebsite || '',
    }),
    [socialAccounts, user]
  );

  const methods = useForm({
    resolver: yupResolver(TransporterSocialAccountsSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = methods;

  const saveSocialAccountsInfoHandler = async (data) => {
    try {
      if (isDashboard) {
        await updateUser(data);
        enqueueSnackbar('Modification effectuée avec succès!', {
          variant: 'success',
        });
      } else {
        await addSocialAccounts(data);
        dispatch(onNextStep());
      }
    } catch (error) {
      console.log('🚀 ~ saveCompanyInfoHandler ~ error:', error);
      if (isMountedRef.current) {
        setError('afterSubmit', error);
        enqueueSnackbar(error, { variant: 'error' });
      }
    }
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(saveSocialAccountsInfoHandler)}
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
          py={{ md: 5, xs: 2 }}
          pr={{ md: 5, xs: 0 }}
        >
          <Grid item xs={12} md={10}>
            <Stack mb={{ md: 5, xs: 2 }} mx={{ md: 0, xs: 3 }}>
              <Typography
                variant='h5'
                mb={{ md: 2, xs: 1 }}
                sx={{ fontWeight: 450 }}
              >
                Socials Account
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
                <RHFTextField
                  name='transporterFacebook'
                  placeholder={'Facebook'}
                  InputProps={{
                    startAdornment: (
                      <>
                        <InputAdornment position='start'>
                          <Iconify
                            icon='logos:facebook'
                            height={18}
                            width={18}
                          />
                        </InputAdornment>
                        <Divider
                          sx={{ height: 28, m: 0.5 }}
                          orientation='vertical'
                        />
                      </>
                    ),
                  }}
                />
              </Stack>
              <Stack spacing={1}>
                <RHFTextField
                  name='transporterInstagram'
                  placeholder={'Instagram'}
                  InputProps={{
                    startAdornment: (
                      <>
                        <InputAdornment position='start'>
                          <Iconify
                            icon='skill-icons:instagram'
                            height={18}
                            width={18}
                          />
                        </InputAdornment>
                        <Divider
                          sx={{ height: 28, m: 0.5 }}
                          orientation='vertical'
                        />
                      </>
                    ),
                  }}
                />
              </Stack>

              <Stack spacing={1}>
                <RHFPhone name='transporterWhatsApp' placeholder={'WhatsApp'} />
              </Stack>

              <Stack spacing={1}>
                <RHFTextField
                  name='transporterWebsite'
                  placeholder={'Website'}
                  InputProps={{
                    startAdornment: (
                      <>
                        <InputAdornment position='start'>
                          <Iconify
                            icon='icon-park:browser'
                            height={18}
                            width={18}
                          />
                        </InputAdornment>
                        <Divider
                          sx={{ height: 28, m: 0.5 }}
                          orientation='vertical'
                        />
                      </>
                    ),
                  }}
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
