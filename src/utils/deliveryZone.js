import { serviceHubs, sampleSalemLocations } from '../data/serviceZones';

/**
 * Calculates Haversine distance in kilometers between two GPS coordinates
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Validates whether user coordinates are inside an active 5 km delivery zone
 */
export function checkLocationServiceability(userLat, userLng) {
  const activeHubs = serviceHubs.filter((hub) => hub.active);

  let nearestHub = null;
  let minDistance = Infinity;

  activeHubs.forEach((hub) => {
    const dist = calculateHaversineDistance(userLat, userLng, hub.lat, hub.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearestHub = hub;
    }
  });

  if (!nearestHub) {
    return {
      isServiceable: false,
      nearestHub: null,
      distanceKm: 0,
      estimatedTime: "N/A",
      message: "No active service hub available."
    };
  }

  const isInside = minDistance <= nearestHub.radiusKm;

  return {
    isServiceable: isInside,
    nearestHub,
    distanceKm: parseFloat(minDistance.toFixed(2)),
    estimatedTime: isInside ? nearestHub.estimatedTime : "Outside 5km Zone",
    message: isInside
      ? `You are ${minDistance.toFixed(1)} km from ${nearestHub.name}.`
      : `You are ${minDistance.toFixed(1)} km away. Active radius is 5 km.`
  };
}

/**
 * Simulates address lookup for Salem localities
 */
export function findLocationByQuery(queryText) {
  if (!queryText || !queryText.trim()) return null;
  const q = queryText.toLowerCase().trim();

  // Check sample preset Salem locations first
  const match = sampleSalemLocations.find(
    (loc) => loc.name.toLowerCase().includes(q) || loc.locality.toLowerCase().includes(q)
  );

  if (match) {
    return {
      name: match.name,
      locality: match.locality,
      lat: match.lat,
      lng: match.lng
    };
  }

  // Fallback: If user types any Salem address, map to Central Alagapuram hub with small jitter for demo
  return {
    name: queryText.includes('Salem') ? queryText : `${queryText}, Salem`,
    locality: "Salem Locality",
    lat: 11.6643 + (Math.random() - 0.5) * 0.04,
    lng: 78.1460 + (Math.random() - 0.5) * 0.04
  };
}
