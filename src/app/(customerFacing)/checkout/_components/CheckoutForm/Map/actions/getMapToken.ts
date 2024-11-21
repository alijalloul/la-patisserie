export async function getMapboxToken() {
    const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN;

    console.log("action env: ", mapboxToken)
  
    if (!mapboxToken) {
      throw new Error("Mapbox token is not available in environment variables.");
    }
  
    return mapboxToken;
  }
  