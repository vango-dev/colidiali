import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { MotionContainer, varFade } from '../../components/animate';
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import React from 'react';
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------
const RootStyle = styled(m.div)(({ theme }) => ({
  backgroundColor: 'transparent',
  [theme.breakpoints.up('md')]: {
    width: '100%',
    height: '70vh',
    // alignItems: 'center',
    // background: 'linear-gradient(to bottom, #033B3A, #000000)',
  },
}));

const ContentStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    height: '100%',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 80px',
    direction: 'row',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '0',
    paddingBottom: 40,
  },
}));

// ----------------------------------------------------------------------

export default function HomeFAQS() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <MotionContainer>
      <RootStyle>
        <Container maxWidth={'xl'} sx={{ paddingX: { md: '16px', xs: 0 } }}>
          <ContentStyle>
            <CardContent bgcolor='white' sx={{ backgroundColor: 'primary' }}>
              <Stack
                direction={'row'}
                spacing={2}
                my={3}
                mx={{ md: 5, xs: 1 }}
                sx={{ whiteSpace: 'nowrap' }}
              >
                <Button
                  variant='contained'
                  size='large'
                  sx={{
                    fontSize: { md: '16px', xs: 12 },
                    whiteSpace: 'nowrap',
                    padding: { xs: 1, md: '15px 39px' },
                  }}
                  color='warning'
                >
                  Pour les transporteurs
                </Button>
                <Button
                  variant='contained'
                  size='large'
                  sx={{
                    fontSize: { md: '16px', xs: 12 },
                    color: '#000000',
                    padding: { xs: 1, md: '15px 39px' },
                    whiteSpace: 'nowrap',
                  }}
                  color='grey'
                >
                  Pour les utilisateurs
                </Button>
              </Stack>

              {isDesktop && (
                <Typography variant='subtitle1' mx={5}>
                  Pret a démarrer votre expedition sur Colidiali? Voici les
                  étapes :
                </Typography>
              )}

              <List
                sx={{
                  width: '100%',
                  maxWidth: 480,
                }}
              >
                <ListItem alignItems='flex-start'>
                  <ListItemIcon>
                    <Iconify
                      icon='fa-regular:check-circle'
                      color='orange'
                      width={25}
                      height={25}
                      mx={2}
                    />
                  </ListItemIcon>
                  <ListItemText
                    alignItems='flex-start'
                    primary={
                      <Typography variant='h6' sx={{ color: '#014242' }}>
                        Brunch this weekend?
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body1'
                          color='text.grey'
                        >
                          Ali Connors{' '}
                          {
                            " — I'll be in your neighborhood doing errands this…"
                          }
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant='inset' component='li' />
                <ListItem alignItems='flex-start'>
                  <ListItemIcon>
                    <Iconify
                      icon='fa-regular:check-circle'
                      color='orange'
                      width={25}
                      height={25}
                      mx={2}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant='h6' sx={{ color: '#014242' }}>
                        Brunch this weekend?
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component='span'
                          variant='body1'
                          color='text.grey'
                          sx={{ display: 'inline' }}
                        >
                          to Scott, Alex, Jennifer{' '}
                          {" — Wish I could come, but I'm out of town this…"}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant='inset' component='li' />
                <ListItem alignItems='flex-start'>
                  <ListItemIcon>
                    <Iconify
                      icon='fa-regular:check-circle'
                      color='orange'
                      width={25}
                      height={25}
                      mx={2}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant='h6' sx={{ color: '#014242' }}>
                        Brunch this weekend?
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body1'
                          color='text.grey'
                        >
                          Sandra Adams{' '}
                          {
                            ' — Do you have Paris recommendations? Have you ever…'
                          }
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </CardContent>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pl: 1,
                pb: 1,
                backgroundColor: '#F2F2F2',
                height: { md: 400, xs: 250 },
                width: { md: '50%', xs: '85%' },
                borderRadius: { md: 0, xs: 2 },
              }}
            >
              <IconButton aria-label='play/pause'>
                <Iconify
                  icon='arcticons:fpt-play'
                  width={100}
                  height={100}
                  color={'grey'}
                />
              </IconButton>
            </Box>
          </ContentStyle>
        </Container>
      </RootStyle>
    </MotionContainer>
  );
}
