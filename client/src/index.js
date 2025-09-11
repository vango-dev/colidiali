// i18n
import './locales/i18n';

// highlight
import './utils/highlight';

// MapBox
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
// ----------------------------------------------------------------------
// @mui
import { AdapterDateFns } from '@mui//x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fr } from 'date-fns/locale';

// redux
import { store } from './redux/store';

// contexts
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';

import App from './App';
import { AuthProvider } from './contexts/JWTContext';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
          <CollapseDrawerProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CollapseDrawerProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </HelmetProvider>
  </AuthProvider>
);
