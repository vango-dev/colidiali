// ----------------------------------------------------------------------
function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_TRANSPORTER = '/transporters';
const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  verify: path(ROOTS_AUTH, '/verify'),
  lock: path(ROOTS_AUTH, '/lock'),
};

export const PATH_TRANSPORTER = {
  root: ROOTS_TRANSPORTER,
  map: path(ROOTS_TRANSPORTER, '/map'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  departures: path(ROOTS_DASHBOARD, '/departures'),
  prices: path(ROOTS_DASHBOARD, '/prices'),
  preview: path(ROOTS_DASHBOARD, '/preview'),
  profile: path(ROOTS_DASHBOARD, '/profile'),
  parameter: path(ROOTS_DASHBOARD, '/parameter'),
};

export const PATH_PAGE = {
  verification: '/verification',
};
