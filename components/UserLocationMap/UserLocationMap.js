
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px', 
};

const initialPositions = [

];

const UserLocationMap = () => {
  const [locations, setLocations] = useState(initialPositions);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //console.log("position : ",position);
          // Ajoute la position actuelle de l'utilisateur au tableau des locations
          setLocations(currentLocations => [
            ...currentLocations,
            {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          ]);
        },
        () => {
          console.error("Error: The Geolocation service failed.");
        }
      );
    } else {
      console.error("Error: Your browser doesn't support geolocation.");
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={locations.length > 0 ? locations[locations.length - 1] : undefined} // Centre sur la première position ou un fallback
        zoom={10}>
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default UserLocationMap;
