import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------
function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const PRIMARY = {
  lighter: '#D7FDD7',
  light: '#78E378',
  main: '#033B3A',
  dark: '#26B625',
  darker: '#1D8C1D',
};

const WARNING = {
  lighter: '#FFE3D9',
  light: '#FFB3A1',
  main: '#EF6E4F',
  dark: '#D75A3A',
  darker: '#BF4726',
};

const BLACK = {
  lighter: '#b6b6b4',
  light: '#808080',
  main: '#1a1a1a',
  dark: '#676767',
  darker: '#097db9',
};

const CORAL = {
  lighter: '#FFECD1',
  light: '#FEC97C',
  main: '#FDA018',
  dark: '#FDAA30',
  darker: '#F89402',
};

const YELLOW = {
  lighter: '#FFEBEB',
  light: '#F29E9C',
  main: '#D8201D',
  dark: '#D8201D',
  darker: '#C21D1A',
};

const GREY = {
  main: '#EFECEC',
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  // info: createGradient(INFO.light, INFO.main),
  // success: createGradient(SUCCESS.light, SUCCESS.main),
  // warning: createGradient(WARNING.light, WARNING.main),
  // error: createGradient(ERROR.light, ERROR.main),
};

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY, contrastText: '#fff' },
  warning: { ...WARNING, contrastText: '#fff' },
  black: { ...BLACK, contrastText: '#fff' },
  coral: { ...CORAL, contrastText: '#fff' },
  yellow: { ...YELLOW, contrastText: '#fff' },
  grey: { ...GREY, contrastText: '#fff' },
  gradients: GRADIENTS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  ...COMMON,
  text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
  background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
  action: { active: GREY[600], ...COMMON.action },
};

export default palette;
