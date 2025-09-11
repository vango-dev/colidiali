import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  Layer,
  Marker,
  NavigationControl,
  Source,
} from 'react-map-gl';
import { IconButtonAnimate } from '../../components/animate';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import { MAPBOX_API } from '../../config';
import useAuth from '../../hooks/useAuth';
import { getTransporterNextDeparture } from '../../redux/slices/departure';
import { dispatch, useSelector } from '../../redux/store';
import TransporterDetails from '../../sections/transporters/TransporterDetails';
import { getCoordinates } from '../../utils/coordinates';
import { getRoute } from '../../utils/getRoutes';
import { lineStyle } from '../transporters/layers';

// ----------------------------------------------------------------------

export default function TransporterProfilePreview() {
  const { user } = useAuth();
  const mapRef = useRef();
  const [, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [transporterDetails, setTransporterDetails] = useState(false);
  const [initialView, setInitialView] = useState({
    latitude: 34.0084,
    longitude: -6.8539,
    zoom,
  });

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [waypoints, setWaypoints] = useState(null);
  const [coords, setCoords] = useState([]);

  const { departure } = useSelector((state) => state.departure);

  useEffect(() => {
    dispatch(getTransporterNextDeparture());
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef?.current]);

  useEffect(() => {
    const updateCoordinates = async () => {
      try {
        const result = await getCoordinates(user?.address);
        setCoordinates(result);
      } catch (error) {
        setCoordinates({ latitude: 0, longitude: 0 });
      }
    };

    updateCoordinates();
  }, [user?.address]);

  useEffect(() => {
    if (departure) {
      setInitialView({
        latitude: departure?.departureCoordinates[0],
        longitude: departure?.departureCoordinates[1],
        zoom: 9,
      });
    } else if (coordinates?.latitude && coordinates?.longitude) {
      setInitialView({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        zoom: 4,
      });
    }
  }, [departure, coordinates]);

  // const onSelectTransporter = useCallback(() => {
  //   if (departure) {
  //     mapRef.current?.flyTo({
  //       center: [
  //         departure?.departureCoordinates[1],
  //         departure?.departureCoordinates[0],
  //       ],
  //       duration: 5000,
  //     });
  //     setZoom(4);
  //   } else if (coordinates) {
  //     mapRef.current?.flyTo({
  //       center: [coordinates?.latitude, coordinates?.longitude],
  //       duration: 5000,
  //     });
  //     setZoom(4);
  //   }
  // }, [departure, coordinates]);

  const onLoad = useCallback(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();

      if (departure) {
        map.flyTo({
          center: [
            departure.departureCoordinates[1],
            departure.departureCoordinates[0],
          ],
          zoom: 9,
          duration: 2000,
        });
      } else if (coordinates.latitude && coordinates.longitude) {
        map.flyTo({
          center: [coordinates.longitude, coordinates.latitude],
          zoom: 4,
          duration: 2000,
        });
      }
    }
  }, [departure, coordinates]);

  useEffect(() => {
    if (departure) {
      const { departureCoordinates, destinationCoordinates, checkPoints } =
        departure;
      setStart([departureCoordinates[1], departureCoordinates[0]]);
      setEnd([destinationCoordinates[1], destinationCoordinates[0]]);

      if (checkPoints?.length > 0) {
        const intermediatePoints = checkPoints
          ?.map(
            (point) =>
              `${point.coordinates.longitude.toFixed(
                4
              )},${point.coordinates.latitude.toFixed(4)}`
          )
          .join(';');
        if (intermediatePoints) {
          setWaypoints(intermediatePoints);
        }
      } else {
        setWaypoints(null);
      }
    } else {
      setStart(null);
      setEnd(null);
      setCoords([]);
    }
  }, [departure]);

  // useEffect(() => {
  //   const points = transporters?.map((transporter) => ({
  //     type: 'Feature',
  //     properties: {
  //       cluster: false,
  //       transporter,
  //     },
  //     geometry: {
  //       type: 'Point',
  //       coordinates: [
  //         parseFloat(transporter?.trajectory?.departureCoordinates[0]),
  //         parseFloat(transporter?.trajectory?.departureCoordinates[1]),
  //       ],
  //     },
  //   }));

  //   setPoints(points);
  // }, [transporters]);

  useEffect(() => {
    // Call getRoute only if both start and end coordinates are available
    if (start && end) {
      getRoute(start, end, waypoints)
        .then((response) => {
          setCoords(response);
        })
        .catch((error) => console.error(error));
    } else {
      // If start or end coordinates are missing, clear the route
      setCoords([]);
    }
  }, [start, end, waypoints]);

  // geojson
  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'feature',
        geometry: {
          type: 'LineString',
          coordinates: [...coords],
        },
      },
    ],
  };

  // end point
  const endPoint = end
    ? {
        type: 'FeatureCollection',
        features: [
          {
            type: 'feature',
            geometry: {
              type: 'Point',
              coordinates: [...end],
            },
          },
        ],
      }
    : null;

  // Route styles
  const layerEndPoint = {
    id: 'end',
    type: 'circle',
    source: {
      type: 'geojson',
      data: end,
    },
    paint: {
      'circle-radius': 4,
      'circle-color': '#f30',
    },
  };

  return (
    <Page title='Dashboard: Preview'>
      <Container maxWidth={'xl'}>
        <Grid container justifyContent={'center'} alignItems={'center'}>
          <Grid item xs={10} md={12}>
            <Card sx={{ position: 'relative' }}>
              <Stack direction='column' mx={3} my={2}>
                <Typography variant='h5' sx={{ fontWeight: 450, mb: 1 }}>
                  Profile Preview
                </Typography>
                <Divider />
              </Stack>
              <Box
                sx={{
                  display: 'grid',

                  columnGap: 2,
                  rowGap: 3,
                  height: 800,
                  width: '100%',
                  px: { md: 3, xs: 2 },
                  pb: { md: 3, xs: 2 },
                  gridTemplateColumns: {
                    xs: 'repeat(1,1fr)',
                  },
                }}
              >
                <ReactMapGL
                  initialViewState={initialView}
                  mapboxAccessToken={MAPBOX_API}
                  mapStyle='mapbox://styles/mapbox/streets-v11'
                  ref={mapRef}
                  onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
                  zoom={zoom}
                  onLoad={onLoad}
                >
                  <Marker
                    longitude={
                      departure?.departureCoordinates[1] ||
                      coordinates?.longitude
                    }
                    latitude={
                      departure?.departureCoordinates[0] ||
                      coordinates?.latitude
                    }
                  >
                    <Tooltip title={`${user.fName} ${user.lName}`}>
                      <IconButtonAnimate
                        elevation={2}
                        onClick={() => {
                          setTransporterDetails(!transporterDetails);
                          onLoad();
                        }}
                      >
                        <Iconify
                          icon={'flowbite:map-pin-alt-solid'}
                          width={25}
                          height={25}
                          sx={{ color: '#000000' }}
                        />
                      </IconButtonAnimate>
                    </Tooltip>
                  </Marker>
                  <Source id='routeSource' type='geojson' data={geojson}>
                    <Layer {...lineStyle} />
                  </Source>
                  {endPoint && (
                    <Source id='endSource' type='geojson' data={endPoint}>
                      <Layer {...layerEndPoint} />
                    </Source>
                  )}
                  <GeolocateControl />
                  <FullscreenControl />
                  <NavigationControl position='top-right' />
                </ReactMapGL>
              </Box>
              {transporterDetails && (
                <Stack
                  sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '4%',
                    height: { md: '90vh', lg: '90', xl: '75vh' },
                    width: { lg: 380, md: 350, xs: 350 },
                  }}
                >
                  <TransporterDetails
                    transporter={user}
                    nextDeparture={departure}
                  />
                </Stack>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
