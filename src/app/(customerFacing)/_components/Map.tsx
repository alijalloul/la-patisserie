"use client";

import React, { useRef, useEffect, useState } from "react";
import mapboxgl, { Map as MapboxMap, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { Locate } from "lucide-react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapboxMap | null>(null);
  const [lng, setLng] = useState<number>(35.8623);
  const [lat, setLat] = useState<number>(33.8547);
  const [zoom, setZoom] = useState<number>(7);
  const [marker, setMarker] = useState<Marker | null>(null);
  const [address, setAddress] = useState<string>("");

  const markerRef = useRef<Marker | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.current?.setCenter([longitude, latitude]);
          map.current?.setZoom(14);

          if (markerRef.current) {
            markerRef.current.setLngLat([longitude, latitude]);
          } else {
            const newMarker = new mapboxgl.Marker({
              draggable: true,
            })
              .setLngLat([longitude, latitude])
              .addTo(map.current!);

            markerRef.current = newMarker;
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (map.current) {
      map.current.setCenter([lng, lat]);
      map.current.setZoom(zoom);
      return;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    const handleResize = () => {
      if (map.current) {
        map.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [lng, lat, zoom]);

  useEffect(() => {
    if (map.current) {
      map.current.on("click", async (e) => {
        const { lng, lat } = e.lngLat;

        if (markerRef.current) {
          markerRef.current.setLngLat([lng, lat]);
        } else {
          const newMarker = new mapboxgl.Marker({
            draggable: true,
          })
            .setLngLat([lng, lat])
            .addTo(map.current!);

          markerRef.current = newMarker;
        }

        // Fetch address based on clicked location
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          setAddress(data.features[0].place_name);
        }
      });
    }
  }, []);

  const recalibrateMapToUserLocation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.current?.setCenter([longitude, latitude]);
          map.current?.setZoom(14);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between items-center rounded-lg overflow-hidden">
      <div ref={mapContainer} className="relative w-full h-full" />

      <div>
        <Button
          variant="outline"
          className="absolute top-0 left-0 rounded-full border-[1px] p-2 ml-2 mt-2"
          onClick={(e) => recalibrateMapToUserLocation(e)}
        >
          <Locate />
        </Button>
      </div>
    </div>
  );
};

export default Map;
