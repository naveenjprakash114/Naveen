import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkLocationServiceability } from '../utils/deliveryZone';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  // Default to Alagapuram Main Road, Salem (Active Hub)
  const [userLocation, setUserLocation] = useState({
    name: 'Alagapuram Main Road',
    locality: 'Alagapuram',
    city: 'Salem',
    lat: 11.6643,
    lng: 78.1460
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [serviceability, setServiceability] = useState(() =>
    checkLocationServiceability(11.6643, 78.1460)
  );

  useEffect(() => {
    if (userLocation && userLocation.lat && userLocation.lng) {
      const result = checkLocationServiceability(userLocation.lat, userLocation.lng);
      setServiceability(result);
    }
  }, [userLocation]);

  const updateLocation = (newLoc) => {
    setUserLocation(newLoc);
    setIsLocationModalOpen(false);
  };

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        updateLocation,
        serviceability,
        isLocationModalOpen,
        setIsLocationModalOpen
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) throw new Error('useLocation must be used within LocationProvider');
  return context;
}
