// routes

// components
import Iconify from '../../components/Iconify';
import { PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  // {
  //   title: 'Voir les départs',
  //   path: '/',
  //   icon: <Iconify icon='material-symbols:language' {...ICON_SIZE} />,
  // },
  // {
  //   title: 'Voir les annonces',
  //   path: '/',
  //   icon: <Iconify icon='material-symbols:language' {...ICON_SIZE} />,
  // },
  {
    title: 'Créer une annonce',

    icon: <Iconify icon='material-symbols:language' {...ICON_SIZE} />,
  },
  {
    title: 'Se connecter',
    path: PATH_AUTH.login,
    icon: <Iconify icon='material-symbols:language' {...ICON_SIZE} />,
  },
  {
    title: "S'inscrire",
    path: PATH_AUTH.register,
    icon: <Iconify icon='material-symbols:language' {...ICON_SIZE} />,
  },
  {
    title: 'Français',
    icon: <Iconify icon='material-symbols:language' {...ICON_SIZE} />,
  },
];

export default menuConfig;
