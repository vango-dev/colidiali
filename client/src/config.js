// @mui
import { enUS, frFR, arSA, deDE } from '@mui/material/locale';
// API
// -----------------------------------------------------------------------------
export const HOST_API = process.env.REACT_APP_HOST_API_KEY || '';

export const MAPBOX_API = process.env.REACT_APP_MAPBOX_TOKEN;

// LAYOUT
// ----------------------------------------------------------------------
export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 92,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 48,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 22,
};

// MULTI LANGUAGES
// ----------------------------------------------------------------------
export const allLangs = [
  {
    label: 'Français',
    value: 'fr',
    systemValue: frFR,
    icon: '/assets/icons/flags/ic_flag_fr.svg',
  },
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'ARABE (MAROC)',
    value: 'ar',
    systemValue: arSA,
    icon: '/assets/icons/flags/ic_flag_sa.svg',
  },
  {
    label: 'GERMANY',
    value: 'de',
    systemValue: deDE,
    icon: '/assets/icons/flags/ic_flag_de.svg',
  },
];

export const defaultLang = allLangs[0];
