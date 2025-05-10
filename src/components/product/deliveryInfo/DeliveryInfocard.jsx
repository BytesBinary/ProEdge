import React, { useEffect, useState } from "react";
import { useOrderContext } from "../../../context/OrderContext";

const DeliveryInfocard = ({ deliveryInfo }) => {
  const [deliveryData, setDeliveryData] = useState(null);
  const { fetchSettingsGraphQL } = useOrderContext();
const [nearestLocation, setNearestLocation] = useState("Calculating...");

useEffect(() => {
  getNearestLocation().then(setNearestLocation);
}, [deliveryData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSettingsGraphQL();
        setDeliveryData(data);
      } catch (error) {
        console.error("Error fetching delivery data:", error);
      }
    };
    fetchData();
  }, [fetchSettingsGraphQL]);

  // Calculate estimated delivery date
  const getDeliveryDate = () => {
    if (!deliveryData?.Shipping_days) return "";
    
    const shippingDays = parseInt(deliveryData.Shipping_days);
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + shippingDays);
    
    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const getNearestLocation = async () => {
    if (!deliveryData?.delivery_address?.geometries?.length) {
      return "Loading locations...";
    }
  
    try {
      // 1. Get user's current location
      const userPosition = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });
  
      const userCoords = {
        lat: userPosition.coords.latitude,
        lng: userPosition.coords.longitude
      };
  
      // 2. Find nearest delivery location
      const locationsWithDistance = await Promise.all(
        deliveryData.delivery_address.geometries.map(async (point) => {
          const [lng, lat] = point.coordinates;
          const distance = calculateDistance(userCoords.lat, userCoords.lng, lat, lng);
          
          // 3. Reverse geocode each delivery point
          const address = await reverseGeocode(lat, lng);
          
          return {
            coordinates: point.coordinates,
            distance,
            address: address || `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`
          };
        })
      );
  
      // 4. Sort by distance and return nearest
      locationsWithDistance.sort((a, b) => a.distance - b.distance);
      return locationsWithDistance[0].address;
  
    } catch (error) {
      console.error("Location error:", error);
      // Fallback: Return first location's coordinates if geolocation fails
      const [lng, lat] = deliveryData.delivery_address.geometries[0].coordinates;
      return `Approximate location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  };
  
  // Reverse geocoding using Nominatim
  async function reverseGeocode(lat, lng) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      
      if (data.address) {
        // Format address based on available components
        const { city, town, village, county, state, country } = data.address;
        return [city || town || village || county, state, country]
          .filter(Boolean)
          .join(", ");
      }
      return null;
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  }
  
  // Haversine distance calculation
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * 
      Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
  if (!deliveryData) {
    return <div>Loading delivery information...</div>;
  }

  return (
    <div className="flex flex-col h-[44px] justify-between">
      <h1 className="text-sm leading-[18px] text-[#182B55]">
         Delivery:{" "}
        <span className="font-medium text-[#000000]">
          {getDeliveryDate()}
        </span>
      </h1>
      <div className="flex items-center">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_313_4747)">
            <path
              d="M6 3C5.60444 3 5.21776 3.1173 4.88886 3.33706C4.55996 3.55682 4.30362 3.86918 4.15224 4.23463C4.00087 4.60009 3.96126 5.00222 4.03843 5.39018C4.1156 5.77814 4.30608 6.13451 4.58579 6.41421C4.86549 6.69392 5.22186 6.8844 5.60982 6.96157C5.99778 7.03874 6.39992 6.99914 6.76537 6.84776C7.13082 6.69638 7.44318 6.44004 7.66294 6.11114C7.8827 5.78224 8 5.39556 8 5C8 4.46957 7.78929 3.96086 7.41422 3.58579C7.03914 3.21071 6.53043 3 6 3ZM6 6C5.80222 6 5.60888 5.94135 5.44443 5.83147C5.27998 5.72159 5.15181 5.56541 5.07612 5.38268C5.00043 5.19996 4.98063 4.99889 5.01922 4.80491C5.0578 4.61093 5.15304 4.43275 5.29289 4.29289C5.43275 4.15304 5.61093 4.0578 5.80491 4.01921C5.99889 3.98063 6.19996 4.00043 6.38268 4.07612C6.56541 4.15181 6.72159 4.27998 6.83147 4.44443C6.94135 4.60888 7 4.80222 7 5C7 5.26522 6.89464 5.51957 6.70711 5.70711C6.51957 5.89464 6.26522 6 6 6Z"
              fill="#3F66BC"
            />
            <path
              d="M5.99625 12.001C5.57522 12.0032 5.15981 11.9044 4.78478 11.713C4.40976 11.5216 4.08605 11.2432 3.84075 10.901C1.93525 8.2725 0.96875 6.2965 0.96875 5.0275C0.96875 3.69412 1.49843 2.41536 2.44127 1.47252C3.38411 0.529682 4.66287 0 5.99625 0C7.32963 0 8.60839 0.529682 9.55123 1.47252C10.4941 2.41536 11.0238 3.69412 11.0238 5.0275C11.0238 6.2965 10.0573 8.2725 8.15175 10.901C7.90645 11.2432 7.58274 11.5216 7.20772 11.713C6.8327 11.9044 6.41728 12.0032 5.99625 12.001ZM5.99625 1.0915C4.95246 1.09269 3.95176 1.50786 3.21369 2.24594C2.47561 2.98401 2.06044 3.98471 2.05925 5.0285C2.05925 6.0335 3.00575 7.892 4.72375 10.2615C4.8696 10.4624 5.06094 10.6259 5.28211 10.7386C5.50328 10.8514 5.748 10.9102 5.99625 10.9102C6.2445 10.9102 6.48922 10.8514 6.71039 10.7386C6.93157 10.6259 7.1229 10.4624 7.26875 10.2615C8.98675 7.892 9.93325 6.0335 9.93325 5.0285C9.93206 3.98471 9.51689 2.98401 8.77881 2.24594C8.04074 1.50786 7.04004 1.09269 5.99625 1.0915Z"
              fill="#3F66BC"
            />
          </g>
          <defs>
            <clipPath id="clip0_313_4747">
              <rect width="12" height="12" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p className="ml-1 text-[#3F66BC] text-[10px] leading-[18px] font-medium">
        Deliver to  {nearestLocation}
        </p>
      </div>
    </div>
  );
};

export default DeliveryInfocard;