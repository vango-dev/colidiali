// routes
import Router from './routes';

// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import NotistackProvider from './components/NotistackProvider';

// ----------------------------------------------------------------------
export default function App() {
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <NotistackProvider>
            <Router />
          </NotistackProvider>
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
