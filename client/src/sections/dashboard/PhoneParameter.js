import { useMemo, useState } from 'react';
import * as Yup from 'yup';
import axios from '../../utils/axios';
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
import { FormProvider, RHFPhone } from '../../components/hook-form';
import useAuth from '../../hooks/useAuth';
import { VerifyCodeForm } from '../auth/verify-code';
import useResponsive from '../../hooks/useResponsive';
// ----------------------------------------------------------------------
export default function PhoneParameter() {
  const [newPhone, setNewPhone] = useState('');

  const { user } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const NewUserSchema = Yup.object().shape({
    phone: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      phone: user?.phone || '',
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
  } = methods;

  const saveUserInfoHandler = async (data) => {
    try {
      const { phone } = data;
      setNewPhone(data.phone);
      const response = await axios.get(`/api/transporters/verify/${phone}`);
      if (response.status === 200) {
        console.log('🚀 ~ saveUserInfoHandler ~ response:', response);
        console.log('sent successfully');
        //   setNewPhone(data.phone);
      }
    } catch (error) {
      console.log('🚀 ~ saveUserInfoHandler ~ error:', error);
    }
  };

  return (
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
              Phone Number
            </Typography>
            <Divider sx={{ width: '180%' }} />
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
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(saveUserInfoHandler)}
            >
              <Stack spacing={2}>
                <RHFPhone name='phone' placeholder={'Numéro de téléphone'} />
              </Stack>
              <Stack spacing={1} mt={2}>
                <LoadingButton
                  type='submit'
                  loading={isSubmitting}
                  variant='contained'
                  color='warning'
                  sx={{ width: { md: 0.2, xs: 1 }, alignSelf: 'start', py: 1 }}
                >
                  Save
                </LoadingButton>
              </Stack>
            </FormProvider>
            <Stack spacing={1} direction='column' alignItems={'flex-start'}>
              <Typography variant='subtitle1'>Vérification Code</Typography>
              <Typography
                variant='body2'
                sx={{ color: 'text.secondary', textAlign: 'center' }}
              >
                {`Enter the code that we have sent to {phone}`}
              </Typography>
              <VerifyCodeForm
                justifyButton={'flex-start'}
                buttonStyle={{ width: '100%', mt: 200 }}
                phone={newPhone}
              />
              <Typography
                variant='body2'
                sx={{ color: 'green', textAlign: 'center' }}
              >
                {`I need help getting my verification code`}
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
