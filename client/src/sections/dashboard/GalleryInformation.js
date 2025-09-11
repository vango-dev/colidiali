import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// @mui
import {
  Box,
  Button,
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
import { useCallback, useMemo } from 'react';
import { FormProvider } from '../../components/hook-form';
import { RHFUploadMultiFile } from '../../components/hook-form/RHFUpload';
import useAuth from '../../hooks/useAuth';
import { onBackStep } from '../../redux/slices/transporter';
import { useDispatch } from '../../redux/store';
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
import { useSnackbar } from 'notistack';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------
export default function GalleryInformation() {
  const { pathname } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();

  const smUp = useResponsive('up', 'sm');

  const isDashboard = pathname.includes('dashboard');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user,
    updateUser,
    companyInfo,
    socialAccounts,
    transporterCompanyPhotos,
    profilGallery,
    userInfo,
  } = useAuth();

  const TransporterGallerySchema = Yup.object().shape({
    images: Yup.array(),
  });

  const defaultValues = useMemo(
    () => ({
      images: user?.images || profilGallery || [],
    }),
    [user]
  );

  const methods = useForm({
    resolver: yupResolver(TransporterGallerySchema),
    defaultValues,
  });

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
    [setValue]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };

  const onSubmit = async (data) => {
    const updatedUser = {
      ...companyInfo,
      ...socialAccounts,
      images: profilGallery,
    };
    try {
      if (isDashboard) {
        await updateUser(updatedUser);
        enqueueSnackbar('Modification effectuée avec succès!', {
          variant: 'success',
        });
      } else {
        await updateUser({
          ...userInfo,
          ...updatedUser,
          isVerifiedByAdmin: false,
        });
        navigate(PATH_PAGE.verification);
      }
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
                Gallery
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
              <RHFUploadMultiFile
                name='images'
                showPreview
                accept='image/*'
                maxSize={3145728}
                onDrop={handleDrop}
                onRemove={handleRemove}
                onRemovelAll={handleRemoveAll}
              />
            </Box>
            <Stack
              direction='row'
              justifyContent={'flex-end'}
              spacing={1}
              sx={{ mt: 3 }}
            >
              <Button
                variant='outlined'
                color='primary'
                sx={{ width: 0.2, alignSelf: 'end' }}
                onClick={() => dispatch(onBackStep())}
              >
                Back
              </Button>
              <LoadingButton
                type='submit'
                loading={isSubmitting}
                variant='contained'
                color='warning'
                sx={{
                  width: { md: 0.25, xs: 0.42 },
                  alignSelf: { md: 'end', xs: 'center' },
                  paddingY: { md: 1, xs: 1 },
                }}
              >
                Save Modifications
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </FormProvider>
  );
}
