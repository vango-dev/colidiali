// utils
import { MAPBOX_API } from '../config';

export async function getRoute(start, end, waypoints) {
  if (!start || !end) return;

  let url;
  if (waypoints) {
    url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${waypoints};${end[0]},${end[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${MAPBOX_API}`;
  } else {
    url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${MAPBOX_API}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const routeCoords = data.routes[0]?.geometry.coordinates;
      if (routeCoords) {
        return routeCoords;
      } else {
        console.error('No coordinates found in the route data.');
      }
    } else {
      console.error('No routes found in the response data.');
    }
  } catch (error) {
    console.error('Error fetching or parsing route data:', error);
  }
}

// const getRoute = async () => {
//   if (!start || !end) return;

//   let url;
//   if (waypoints) {
//     url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${waypoints};${end[0]},${end[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${MAPBOX_API}`;
//   } else {
//     url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${MAPBOX_API}`;
//   }

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.routes && data.routes.length > 0) {
//       const routeCoords = data.routes[0]?.geometry.coordinates;
//       if (routeCoords) {
//         setCoords(routeCoords);
//       } else {
//         console.error('No coordinates found in the route data.');
//       }
//     } else {
//       console.error('No routes found in the response data.');
//     }
//   } catch (error) {
//     console.error('Error fetching or parsing route data:', error);
//   }
// };
