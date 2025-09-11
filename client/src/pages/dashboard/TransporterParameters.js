import { Box, Container, Stack, Tab, Tabs } from '@mui/material';
import Page from '../../components/Page';
import { useEffect, useState } from 'react';
import Iconify from '../../components/Iconify';
import {
  PhoneParameter,
  EmailParameter,
  PasswordParameter,
  BlockAccountParameter,
} from '../../sections/dashboard';
import { useSearchParams } from 'react-router-dom';

// ----------------------------------------------------------------------
export default function TransporterParameters() {
  const [searchParams] = useSearchParams();

  const [currentTab, setCurrentTab] = useState('Email Address');

  useEffect(() => {
    if (searchParams) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const activeParameter = searchParams.get('parameter');
      setCurrentTab(activeParameter);
    }
  }, [searchParams]);

  const ACCOUNT_TABS = [
    {
      value: 'Email Address',
      subheader: 'Change your email address',
      icon: <Iconify icon={'ic:outline-email'} width={20} height={20} />,
      component: <EmailParameter />,
    },
    {
      value: 'Phone Number',
      subheader: 'Change your phone number',
      icon: <Iconify icon={'tabler:phone'} width={20} height={20} />,
      component: <PhoneParameter />,
    },
    {
      value: 'Password',
      subheader: 'Change your password',
      icon: (
        <Iconify icon={'material-symbols:password'} width={20} height={20} />
      ),
      component: <PasswordParameter />,
    },
    {
      value: 'Block Account',
      subheader: 'block your account',
      icon: (
        <Iconify icon={'fluent-mdl2:block-contact'} width={20} height={20} />
      ),
      component: <BlockAccountParameter />,
    },
  ];

  return (
    <Page title='Transporteur: Paramétrage'>
      <Container>
        <Stack direction='row' justifyContent={'center'} sx={{ width: '100%' }}>
          <Tabs
            value={currentTab}
            variant='fullWidth'
            scrollButtons='auto'
            allowScrollButtonsMobile
            onChange={(e, value) => setCurrentTab(value)}
            centered
            sx={{ width: '100%' }}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                label={tab.value}
                icon={tab.icon}
                value={tab.value}
                sx={{ flexGrow: 1 }}
                iconPosition='start'
              />
            ))}
          </Tabs>
        </Stack>
        <Box sx={{ mb: 5 }} />
        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
