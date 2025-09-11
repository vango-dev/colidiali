import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Container,
  Grid,
  Step,
  StepButton,
  StepConnector,
  StepLabel,
  Stepper,
  styled,
  Typography,
} from '@mui/material';
// components
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import { useSelector } from '../../redux/store';
import {
  CompanyInformation,
  GalleryInformation,
  PersonalInformation,
  SocialsAccount,
} from '../../sections/dashboard';
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------
const STEPS = [
  'Personal Information',
  'Company Information',
  'Social Accounts',
  'Gallery',
];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

function QontoStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'text.disabled',
      }}
    >
      {completed ? (
        <Iconify
          icon={'eva:checkmark-fill'}
          sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }}
        />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Box>
  );
}
// ----------------------------------------------------------------------
export default function TransporterProfilePage() {
  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');

  const smUp = useResponsive('up', 'sm');

  let step;
  const [searchParams] = useSearchParams();
  const [profilStep, setProfilStep] = useState(null);
  const isComplete = false;
  const { activeStep } = useSelector((state) => state.transporter);

  useEffect(() => {
    if (searchParams) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      step = Number(searchParams.get('step'));
      setProfilStep(step);
    }
  }, [searchParams]);

  const handleStep = (step) => () => {
    setProfilStep(step);
  };

  return (
    <Page title='Dashboard: Profile'>
      <Container maxWidth={'xl'}>
        <Grid container justifyContent={'center'} alignItems={'center'}>
          <Grid item xs={10} md={8} sx={{ mb: smUp ? 5 : 7 }}>
            <Stepper
              alternativeLabel
              nonLinear={profilStep >= 0 && true}
              activeStep={profilStep ? profilStep : activeStep}
              connector={<QontoConnector />}
            >
              {STEPS.map((label, index) => (
                <Step
                  key={label}
                  StepIconComponent={QontoStepIcon}
                  sx={{
                    '& .MuiStepLabel-label': {
                      typography: 'subtitle2',
                      color: 'text.disabled',
                    },
                  }}
                >
                  {isDashboard ? (
                    <StepButton color='inherit' onClick={handleStep(index)}>
                      <>
                        {smUp ? (
                          <Typography variant='subtitle2'>
                            {`Step ${index + 1}`}
                            <br />
                            {label}
                          </Typography>
                        ) : (
                          <Typography
                            variant='caption'
                            sx={{
                              display: 'block', // Ensures the line-height affects the entire block of text
                              lineHeight: '1.3',
                              margin: 0,
                              padding: 0,
                              fontSize: 12,
                            }}
                          >
                            {label}
                          </Typography>
                        )}
                      </>
                    </StepButton>
                  ) : (
                    <StepLabel
                      StepIconComponent={QontoStepIcon}
                      sx={{
                        '& .MuiStepLabel-label': {
                          typography: 'subtitle2',
                          color: 'text.disabled',
                        },
                      }}
                    >
                      Step {index + 1} <br />
                      {label}
                    </StepLabel>
                  )}
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
        {!isComplete &&
          (isDashboard ? (
            <>
              {profilStep === 0 && <PersonalInformation />}
              {profilStep === 1 && <CompanyInformation />}
              {profilStep === 2 && <SocialsAccount />}
              {profilStep === 3 && <GalleryInformation />}
            </>
          ) : (
            <>
              {activeStep === 0 && <PersonalInformation />}
              {activeStep === 1 && <CompanyInformation />}
              {activeStep === 2 && <SocialsAccount />}
              {activeStep === 3 && <GalleryInformation />}
            </>
          ))}
      </Container>
    </Page>
  );
}
