// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
// sections
import {
  HomeHero,
  HomeAuth,
  HomeTransporters,
  HomeTestimonial,
  HomeFAQS,
  HomeAdvertisement,
} from '../sections/home';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  background:
    'linear-gradient(180deg, #033B3A 0%, #033938 0%, #02302F 19.03%, #000000 100%);',
}));
// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title='Page d’accueil'>
      <RootStyle>
        <HomeHero />

        <ContentStyle>
          <HomeAuth />

          <HomeTransporters />

          <HomeTestimonial />

          <HomeFAQS />

          <HomeAdvertisement />
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
