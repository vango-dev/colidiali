import { LoadingButton } from '@mui/lab';
import { Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Iconify from '../components/Iconify';
import { FormProvider, RHFTextField } from '../components/hook-form';

export default function LockScreenPage({ children }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [unlock, setUnlock] = useState(false);
  const methods = useForm();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      if (data.password === 'CoLi@123DiaLi963!') {
        setUnlock(true);
        navigate('/');
      }
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
    }
  };

  if (unlock) {
    return children;
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Grid
          container
          gap={3}
          mt={20}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Grid item md={8} sm={12}>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems={'center'}
              spacing={1}
            >
              <Typography variant='subtitle1'>Votre mot de passe</Typography>

              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge='end'
              >
                <Iconify
                  icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                />
              </IconButton>
            </Stack>
            <RHFTextField
              name='password'
              type={showPassword ? 'text' : 'password'}
              label='**********'
            />
          </Grid>
          <Grid item md={3} sx={8} alignSelf={'flex-end'}>
            <LoadingButton
              size='large'
              type='submit'
              variant='contained'
              loading={isSubmitting}
              color='warning'
              sx={{ p: 1.5, borderRadius: 0.6, fontSize: 16, fontWeight: 700 }}
            >
              GO
            </LoadingButton>
          </Grid>
        </Grid>
      </Container>
    </FormProvider>
  );
}
