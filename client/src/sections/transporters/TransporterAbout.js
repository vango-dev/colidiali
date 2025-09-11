import { Grid, List, ListSubheader, Stack, Typography } from '@mui/material';
import Iconify from '../../components/Iconify';
import { useEffect } from 'react';
import { dispatch, useSelector } from '../../redux/store';
import category, {
  getTransporterCategories,
} from '../../redux/slices/category';

export default function TransporterAbout({ transporter }) {
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getTransporterCategories());
  }, []);

  return (
    <Grid
      container
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none',
        },
      }}
    >
      <Grid item md={12}>
        <Stack direction='column' sx={{ mt: 2, mb: 1 }}>
          <Stack direction='row' alignItems={'center'} spacing={1}>
            <Iconify icon={'akar-icons:info-fill'} />
            <Typography variant='subtitle2'>
              A propos du transporter :
            </Typography>
          </Stack>
          <Typography
            component='div'
            variant='caption'
            dangerouslySetInnerHTML={{
              __html: transporter?.companyObservation,
            }}
          />
        </Stack>
        <Stack direction='column' sx={{ mb: 2 }}>
          <Stack direction='row' alignItems={'center'} spacing={1}>
            <Iconify icon={'ion:pricetags-outline'} />
            <Typography variant='subtitle2'>Tarification :</Typography>
          </Stack>
          {categories?.map((category) => (
            <List direction='row' key={category._id}>
              <ListSubheader>
                <Stack direction='row' spacing={1} sx={{ mx: 2 }}>
                  <Typography variant='caption'>- {category.name} :</Typography>

                  <Typography variant='caption'>
                    {category.value} Euro
                  </Typography>
                </Stack>
              </ListSubheader>
            </List>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
