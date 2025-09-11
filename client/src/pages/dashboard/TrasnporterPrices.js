import {
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  Slider,
  Stack,
  Typography,
  styled,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useEffect, useState } from 'react';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import useResponsive from '../../hooks/useResponsive';
import { dispatch, useSelector } from '../../redux/store';
import {
  addTransporterCategory,
  deleteTransporterCategory,
  getTransporterCategories,
  updateTransporterCategory,
} from '../../redux/slices/category';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------
const PricesSlider = styled(Slider)({
  color: '#F56B3D',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#F56B3D',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});
// ----------------------------------------------------------------------

export default function TransporterPrices() {
  const smUp = useResponsive('up', 'sm');

  const { enqueueSnackbar } = useSnackbar();

  const [category, setCategory] = useState({ name: '', value: 0 });
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingValue, setEditingValue] = useState(null);

  const [editingName, setEditingName] = useState(null);

  const [displayAddCategory, setDisplayAddCategory] = useState(false);

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getTransporterCategories());
  }, []);

  const handleSliderChange = (index, value) => {
    setEditingCategory(index);
    setEditingValue(value);
  };

  const handleNameChange = (index, name) => {
    setEditingCategory(index);
    setEditingName(name);
  };

  const handleUpdateCategory = async (index) => {
    const updatedCategory = {
      name: editingName !== null ? editingName : categories[index].name,
      value: editingValue !== null ? editingValue : categories[index].value,
    };
    const categoryId = categories[index]?._id;

    try {
      dispatch(updateTransporterCategory(categoryId, updatedCategory));
      setEditingCategory(null);
      setEditingValue(null);
      setEditingName(null);
      enqueueSnackbar('Modification effectuée avec succès', {
        variant: 'success',
      });
    } catch (error) {
      console.log('🚀 ~ handleUpdateCategory ~ error:', error);
      enqueueSnackbar(error, { variant: 'error' });
      setEditingCategory(null);
      setEditingValue(null);
      setEditingName(null);
    }
  };

  const handleAddCategory = async () => {
    if (!category.name || category.value === 0) {
      alert('Please enter a valid category name and value.');
      return;
    }

    try {
      await dispatch(addTransporterCategory(category));
      setCategory({ name: '', value: 0 });
      setDisplayAddCategory(false);
      enqueueSnackbar('Catégorie créé avec succès', { variant: 'success' });
    } catch (error) {
      console.log('🚀 ~ handleAddCategory ~ error:', error);
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const handleDeleteCategory = async (index) => {
    const categoryId = categories[index]._id;
    try {
      dispatch(deleteTransporterCategory(categoryId));
      enqueueSnackbar('Catégorie supprimé avec succès', { variant: 'warning' });
    } catch (error) {
      console.log('🚀 ~ handleDeleteCategory ~ error:', error);
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  return (
    <Page title='Dashboard: Prices'>
      <Container maxWidth={'xl'}>
        <Card>
          <CardHeader
            sx={{ position: 'absolute', top: smUp ? 10 : 160, zIndex: 10000 }}
            titleTypographyProps={{ fontSize: smUp ? 120 : 18 }}
            title='Dashboard'
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
                  Adjust Delivery Prices{' '}
                </Typography>
                <Typography variant='p'>
                  As a transporter, you can define prices based on the type of
                  deliveries you handle. Use the sliders below to set your
                  prices for different categories. You can add new categories as
                  needed.
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
                {categories?.map((category, index) => (
                  <Grid
                    container
                    justifyContent={'center'}
                    alignItems={'center'}
                    spacing={3}
                    key={index}
                  >
                    <Grid item md={2}>
                      {editingCategory === index ? (
                        <TextField
                          value={editingName ? editingName : category.name}
                          onChange={(e) =>
                            handleNameChange(index, e.target.value)
                          }
                        />
                      ) : (
                        <Typography
                          variant='subtitle1'
                          gutterBottom
                          onClick={() => setEditingCategory(index)}
                        >
                          {category.name}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item md={5}>
                      <PricesSlider
                        valueLabelDisplay='auto'
                        aria-label='price slider'
                        value={
                          editingCategory === index && editingValue !== null
                            ? editingValue
                            : category.value
                        }
                        onChange={(e, value) =>
                          handleSliderChange(index, value)
                        }
                      />
                    </Grid>
                    <Grid item md={2}>
                      <Typography
                        gutterBottom
                        variant='subtitle1'
                        sx={{
                          textAlign: 'center',
                          border: 'solid 1px black',
                          borderRadius: 1,
                          borderColor: '#DDDCE0',
                        }}
                        p={1}
                      >
                        {editingCategory === index && editingValue !== null
                          ? editingValue
                          : category.value}{' '}
                        euro/kg
                      </Typography>
                    </Grid>
                    <Grid item md={1} sx={{ display: 'flex' }}>
                      <IconButton onClick={() => handleDeleteCategory(index)}>
                        <Iconify icon='octicon:trash-24' />
                      </IconButton>
                      {editingCategory === index ? (
                        <IconButton
                          onClick={() => {
                            handleUpdateCategory(index);
                          }}
                        >
                          <Iconify
                            icon='icon-park-outline:check-one'
                            color='green'
                          />
                        </IconButton>
                      ) : null}
                    </Grid>
                  </Grid>
                ))}
              </Box>

              <Stack
                direction='row'
                spacing={2}
                justifyContent='flex-start'
                alignItems='center'
                my={3}
              >
                <IconButton
                  onClick={() => setDisplayAddCategory(!displayAddCategory)}
                >
                  <Iconify
                    icon={
                      !displayAddCategory
                        ? 'material-symbols:add-box'
                        : 'ph:minus-fill'
                    }
                    color='#F56B3D'
                    mr={1}
                  />
                  <Typography variant='subtitle2' sx={{ color: 'black' }}>
                    Add category
                  </Typography>
                </IconButton>
              </Stack>

              {displayAddCategory && (
                <>
                  <Box
                    sx={{
                      display: 'grid',
                      columnGap: 2,
                      rowGap: 3,
                      px: { md: 3, xs: 2 },
                      gridTemplateColumns: {
                        xs: 'repeat(1,1fr)',
                        sm: 'repeat(1,1fr)',
                      },
                    }}
                  >
                    <Grid
                      container
                      alignItems='center'
                      justifyContent='center'
                      spacing={3}
                    >
                      <Grid md={2} mr={5}>
                        <TextField
                          value={category.name}
                          onChange={(e) =>
                            setCategory({ ...category, name: e.target.value })
                          }
                          placeholder='New Category Name'
                        />
                      </Grid>
                      <Grid md={7} mr={5}>
                        <PricesSlider
                          valueLabelDisplay='auto'
                          aria-label='pretto slider'
                          value={category.value}
                          onChange={(e, value) =>
                            setCategory({ ...category, value })
                          }
                        />
                      </Grid>
                      <Grid md={2}>
                        <Typography
                          gutterBottom
                          variant='subtitle1'
                          sx={{
                            textAlign: 'center',
                            border: 'solid 1px black',
                            borderRadius: 1,
                            borderColor: '#DDDCE0',
                          }}
                          p={1}
                        >
                          {category.value} euro/kg
                        </Typography>
                      </Grid>
                      <Grid md={1}></Grid>
                    </Grid>
                  </Box>
                  <Stack direction='row' mt={2} justifyContent={'flex-end'}>
                    <LoadingButton
                      variant='contained'
                      color='warning'
                      onClick={handleAddCategory}
                      sx={{ justifyContent: 'start' }}
                    >
                      Save Changes
                    </LoadingButton>
                  </Stack>
                </>
              )}
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
