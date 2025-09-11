import { m } from 'framer-motion';
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  Layer,
  Marker,
  NavigationControl,
  Source,
} from 'react-map-gl';
import Supercluster from 'supercluster';
import './cluster.css';
// @mui
import { styled } from '@mui/material/styles';
// components
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import TransporterSearchForm from '../../sections/transporters/TransporterSearchForm';
import TransportersList from '../../sections/transporters/TransportersList';
// utils
import { Box, Button, Grid, Tooltip, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconButtonAnimate, MotionContainer } from '../../components/animate';
import { MAPBOX_API } from '../../config';
import useResponsive from '../../hooks/useResponsive';
import { clearTransporter } from '../../redux/slices/transporter';
import { useDispatch, useSelector } from '../../redux/store';
import { getRoute } from '../../utils/getRoutes';
import { lineStyle } from './layers';

/**
 * TODO Apply search by language
 * TODO Possibility to change the place of the search form
 */

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
  backgroundColor: theme.palette.background.default,
  background:
    'linear-gradient(180deg, #033B3A 0%, #033938 0%, #02302F 19.03%, #000000 100%);',
}));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});
// ----------------------------------------------------------------------

export default function TransportersMapPage() {
  const isDesktop = useResponsive('up', 'md');

  const [selectedTransporterFromMap, setSelectedTransporterFromMap] =
    useState('');

  const [openMap, setOpenMap] = useState(false);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [clusters, setClusters] = useState([]);
  const [points, setPoints] = useState([]);
  const [zoom, setZoom] = useState(5);

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [waypoints, setWaypoints] = useState(null);
  const [coords, setCoords] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  // const { transporter, transporters } = useSelector(
  //   (state) => state.transporter
  // );

  const { futurDepartures } = useSelector((state) => state.departure);

  // useEffect(() => {
  //   dispatch(getTransporters());
  // }, [dispatch]);

  const mapRef = useRef();

  // useEffect(() => {
  //   if (transporter) {
  //     const { departureCoordinates, destinationCoordinates, checkPoints } =
  //       transporter.trajectory;

  //     setStart(departureCoordinates);
  //     setEnd(destinationCoordinates);

  //     if (checkPoints?.length > 0) {
  //       const intermediatePoints = checkPoints
  //         ?.map((point) =>
  //           point?.coordinates?.map((coord) => coord.toFixed(4)).join(',')
  //         )
  //         .join(';');
  //       if (intermediatePoints) {
  //         setWaypoints(intermediatePoints);
  //       }
  //     } else {
  //       setWaypoints(null);
  //     }
  //   } else {
  //     setStart(null);
  //     setEnd(null);
  //     setCoords([]);
  //   }
  // }, [transporter]);

  useEffect(() => {
    const points = futurDepartures?.map((departure) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        departure,
      },
      geometry: {
        type: 'Point',
        coordinates: [
          departure?.departureCoordinates.coordinates[0],
          departure?.departureCoordinates.coordinates[1],
        ],
      },
    }));

    setPoints(points);
  }, [futurDepartures]);

  useEffect(() => {
    supercluster.load(points);
    setClusters(supercluster.getClusters(bounds, zoom));
  }, [points, zoom, bounds]);

  useEffect(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef?.current]);

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

  const onSelectTransporter = useCallback((departure) => {
    mapRef.current?.flyTo({
      center: [
        departure?.departureCoordinates.coordinates[0],
        departure?.departureCoordinates.coordinates[1],
      ],
      duration: 5000,
    });
  }, []);

  return (
    <MotionContainer>
      <Page title='Carte transporteurs'>
        <RootStyle>
          <Grid container justifyContent={'space-between'}>
            {openMap && (
              <Grid item md={4}>
                <Grid
                  container
                  justifyContent={'flex-end'}
                  alignItems={'center'}
                >
                  <Grid item md={12}>
                    <m.div>
                      <TransporterSearchForm
                        withPaper={!isDesktop}
                        searchParams={searchParams}
                      />
                    </m.div>
                  </Grid>

                  <Grid item md={12}>
                    <TransportersList
                      onSelectTransporter={onSelectTransporter}
                      selectedTransporterFromMap={selectedTransporterFromMap}
                      searchParams={searchParams}
                      onIconClick={() => {
                        setOpenMap(!openMap);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}

            <Grid item md={openMap ? 8 : 12}>
              <>
                <Box
                  height={isDesktop ? '92vh' : openMap ? '65vh' : '89vh'}
                  width={isDesktop ? '100%' : '100vw'}
                  sx={{
                    marginTop: isDesktop ? 8 : openMap ? 0 : 8,
                    paddingY: isDesktop && 2,
                    paddingRight: isDesktop ? 5 : 0,
                    paddingLeft: isDesktop ? 3 : 0,
                  }}
                >
                  <ReactMapGL
                    initialViewState={{ latitude: 34.0084, longitude: -6.8539 }}
                    style={{ borderRadius: isDesktop ? '6px' : 0 }}
                    mapboxAccessToken={MAPBOX_API}
                    mapStyle='mapbox://styles/mapbox/streets-v11'
                    ref={mapRef}
                    onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
                  >
                    {clusters?.map((cluster) => {
                      const { cluster: isCluster, point_count } =
                        cluster.properties;
                      const [longitude, latitude] =
                        cluster.geometry.coordinates;
                      if (isCluster) {
                        return (
                          <Marker
                            key={`cluster-${cluster.id}`}
                            longitude={longitude}
                            latitude={latitude}
                          >
                            <div
                              className='cluster-marker'
                              style={{
                                width: `${
                                  10 + (point_count / points.length) * 25
                                }px`,
                                height: `${
                                  10 + (point_count / points.length) * 25
                                }px`,
                              }}
                              onClick={() => {
                                const zoom = Math.min(
                                  supercluster.getClusterExpansionZoom(
                                    cluster.id
                                  ),
                                  20
                                );
                                mapRef.current.flyTo({
                                  center: [longitude, latitude],
                                  zoom,
                                  speed: 1,
                                });
                              }}
                            >
                              <Typography variant='subtitle2'>
                                {point_count}
                              </Typography>
                            </div>
                          </Marker>
                        );
                      }
                      return (
                        <Marker
                          key={`Transporteur-${cluster.properties.departure._id}`}
                          longitude={longitude}
                          latitude={latitude}
                        >
                          <Tooltip
                            title={`${cluster.properties.departure.transporterId.fName} ${cluster.properties.departure.transporterId.lName}`}
                          >
                            <IconButtonAnimate
                              elevation={2}
                              onClick={() => {
                                onSelectTransporter(
                                  cluster.properties.departure
                                );
                                setOpenMap(true);
                                setSelectedTransporterFromMap(
                                  cluster.properties.departure
                                );
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
                      );
                    })}

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
                    <NavigationControl />
                    {start && (
                      <Marker longitude={start[0]} latitude={start[1]} />
                    )}
                  </ReactMapGL>
                </Box>
              </>
            </Grid>
            <Button
              variant='contained'
              color='warning'
              size='large'
              sx={{
                position: 'absolute',
                zIndex: 1,
                left: isDesktop ? (openMap ? '60%' : '45%') : '30%',
                bottom: '5%',
              }}
              startIcon={
                <Iconify icon={'gravity-ui:list-ul'} width={20} height={20} />
              }
              onClick={() => {
                setOpenMap(!openMap);
                dispatch(clearTransporter());
                setSelectedTransporterFromMap('');
              }}
            >
              {!openMap
                ? 'Afficher les transporteurs'
                : 'Cacher les transporteurs'}
            </Button>
          </Grid>
        </RootStyle>
      </Page>
    </MotionContainer>
  );
}
