// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`/assets/icons/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  departure: getIcon('ic_departure'),
  preview: getIcon('ic_preview'),
  price: getIcon('ic_price'),
  information: getIcon('ic_information'),
  account: getIcon('ic_account'),
  company: getIcon('ic_company'),
  email: getIcon('ic_email'),
  gallery: getIcon('ic_gallery'),
  socials: getIcon('ic_socials'),
  phone: getIcon('ic_phone'),
  password: getIcon('ic_password'),
};

const navConfig = [
  // DASHBOARD
  // ----------------------------------------------------------------------
  {
    items: [
      // DASHBOARD : USER
      {
        title: 'dashboard',
        path: PATH_DASHBOARD.root,
        children: [
          {
            title: 'departures',
            path: PATH_DASHBOARD.departures,
            icon: ICONS.departure,
          },
          {
            title: 'Preview',
            path: PATH_DASHBOARD.preview,
            icon: ICONS.preview,
          },
          {
            title: 'Prices',
            path: PATH_DASHBOARD.prices,
            icon: ICONS.price,
          },
        ],
      },
    ],
  },

  // PROFIL
  // ----------------------------------------------------------------------
  {
    items: [
      // PROFIL : USER
      {
        title: 'PROFIL',
        path: 'PATH_DASHBOARD.user.root',
        icon: ICONS.information,

        children: [
          {
            title: 'Personal Information',
            path: `${PATH_DASHBOARD.profile}?step=0`,
            icon: ICONS.information,
          },
          {
            title: 'Company Information',
            path: `${PATH_DASHBOARD.profile}?step=1`,
            icon: ICONS.company,
          },
          {
            title: 'Social Accounts',
            path: `${PATH_DASHBOARD.profile}?step=2`,
            icon: ICONS.socials,
          },
          {
            title: 'Galerie',
            path: `${PATH_DASHBOARD.profile}?step=3`,
            icon: ICONS.gallery,
          },
        ],
      },
    ],
  },

  // PARAMETER
  // ----------------------------------------------------------------------
  {
    items: [
      // PARAMETER : USER
      {
        title: 'PARAMÈTRE',
        path: 'PATH_DASHBOARD.user.root',
        children: [
          {
            title: 'Email',
            path: `${PATH_DASHBOARD.parameter}?parameter=Email Address`,
            icon: ICONS.email,
          },
          {
            title: 'Phone',
            path: `${PATH_DASHBOARD.parameter}?parameter=Phone Number`,
            icon: ICONS.phone,
          },
          {
            title: 'Password',
            path: `${PATH_DASHBOARD.parameter}?parameter=Password`,
            icon: ICONS.password,
          },
          {
            title: 'Block Account',
            path: `${PATH_DASHBOARD.parameter}?parameter=Block Account`,
            icon: ICONS.account,
          },
        ],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
];

export default navConfig;
