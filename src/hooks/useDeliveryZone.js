import { useLocation } from '../context/LocationContext';
import { checkLocationServiceability } from '../utils/deliveryZone';

export function useDeliveryZone() {
  const { userLocation, serviceability } = useLocation();

  const checkAddress = (lat, lng) => {
    return checkLocationServiceability(lat, lng);
  };

  return {
    currentZone: serviceability?.nearestHub,
    isServiceable: serviceability?.isServiceable,
    distanceKm: serviceability?.distanceKm,
    estimatedTime: serviceability?.estimatedTime,
    userLocation,
    checkAddress
  };
}

export default useDeliveryZone;
