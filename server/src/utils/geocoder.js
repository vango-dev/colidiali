import NodeGeocoder from 'node-geocoder';

const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey:
    'AIzaSyDxiJ1eVVzae5q4L6BIqGujvHcmqdQBuVwSyDPCQ-j10xOGOIDjmbgu-HtFPA3_CVYNiU',
  formatter: null,
};

const geocoder = NodeGeocoder(options);

export { geocoder };
