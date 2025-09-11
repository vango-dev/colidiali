export async function getCoordinates(formattedAddress) {
  try {
    if (formattedAddress) {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${formattedAddress}.json?access_token=pk.eyJ1IjoiaWxpYXNzYW5hdGkiLCJhIjoiY2xuc3Rrb2hwMXlvejJrb2QxaG14ZXZzayJ9.BN3gUYZ3USajADQhJBvXQA`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          const [longitude, latitude] = data.features[0].center;

          return { latitude, longitude };
        }
      }
    }
    throw new Error('Geocoding failed');
  } catch (error) {
    console.error('Error in geocoding:', error);
    return { latitude: 0, longitude: 0 };
  }
}
