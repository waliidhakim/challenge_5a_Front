// // UserLocationMap.js
// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px' // Ajustez la hauteur selon vos besoins
// };

// const center = { lat: -3.745, lng: -38.523 }; // Position initiale, peut être n'importe où

// const UserLocationMap = () => {
//   const [location, setLocation] = useState(center);
//   const [location2, setLocation2] = useState({
//     lat: 41.898 , lng: 12.476
//   });

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           });
//         },
//         () => {
//           console.error("Error: The Geolocation service failed.");
//         }
//       );
//     } else {
//       console.error("Error: Your browser doesn't support geolocation.");
//     }
//   }, []);

//   return (
//     <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={location}
//         zoom={10}
//       >
//         <Marker position={location} />
//         <Marker position={location2} />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default UserLocationMap;



import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px', // Ajustez la hauteur selon vos besoins
};

// Positions initiales pour les markers
const initialPositions = [
  { lat: -3.745, lng: -38.523 },
  { lat: 41.898, lng: 12.476 },
  // { lat: 40.898, lng: 3.476 },
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
