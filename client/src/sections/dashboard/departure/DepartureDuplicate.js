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
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FormProvider, RHFDateSearch } from '../../../components/hook-form';
import { HEADER } from '../../../config';
import {
  addTransporterDeparture,
  clearPage,
} from '../../../redux/slices/departure';
import { useDispatch } from '../../../redux/store';
import { useSnackbar } from 'notistack';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

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

export default function DepartureDuplicate({
  openDuplicate,
  openDuplicateHandler,
  departure,
}) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const isMountedRef = useIsMountedRef();

  const DepartureSchema = Yup.object().shape({
    departureTime: Yup.date().required('Ce champ est obligatoire'),
  });

  const defaultValues = {
    departureTime: new Date(),
  };

  const methods = useForm({
    resolver: yupResolver(DepartureSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = methods;

  const onSubmit = async (data) => {
    const { departureTime } = data;

    const { _id, __v, createdAt, updatedAt, ...cleanedDeparture } = departure;

    const newDeparture = {
      ...cleanedDeparture,
      departureTime,
      destinationTime: new Date(
        new Date(departureTime).getTime() + 2 * 24 * 60 * 60 * 1000
      ),
    };
    try {
      dispatch(addTransporterDeparture(newDeparture));
      reset();
      dispatch(clearPage());
      enqueueSnackbar('Modification effectuée avec succès!', {
        variant: 'success',
      });
      openDuplicateHandler();
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
      if (isMountedRef.current) {
        setError('afterSubmit', error);
        enqueueSnackbar(error, { variant: 'error' });
      }
      reset();
    }
  };

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openDuplicate}
    >
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <Typography
              variant='h3'
              paragraph
              sx={{ color: 'text.primary', textAlign: 'center' }}
            >
              Duplicate departure
            </Typography>
            <Typography
              variant='body2'
              sx={{ color: 'text.secondary', textAlign: 'center' }}
            >
              Your departure ticket is duplicated. Please note that you can
              change the date and status of this departure.
            </Typography>

            <Box sx={{ mt: 5, mb: 1 }}>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={1} sx={{ color: 'black' }}>
                  <RHFDateSearch
                    name='departureTime'
                    placeholder='Date de départ'
                    variant={'body2'}
                  />
                </Stack>
                <Stack direction='row' justifyContent='center' my={4}>
                  <LoadingButton
                    size='large'
                    type='submit'
                    variant='contained'
                    loading={isSubmitting}
                    color='warning'
                  >
                    Save changes
                  </LoadingButton>
                </Stack>
                <Stack>
                  <Button size='small' onClick={openDuplicateHandler}>
                    Cancel
                  </Button>
                </Stack>
              </FormProvider>
            </Box>
          </Box>
        </Container>
      </RootStyle>
    </Backdrop>
  );
}
