import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import useUserLocation from "../../../../hooks/useUserLocation";
import { googleMapsLoaderOptions } from "../../../../lib/googleMapsLoader";
import outletMapIcon from "../../../../assets/images/outletMap.png";


const GoogleMapComponent = ({ address, onMarkerSelect }) => {
    const { isLoaded } = useJsApiLoader(googleMapsLoaderOptions);
    const [marker, setMarker] = useState(null);
    const { latitude, longitude } = useUserLocation();

    const userLocation = useMemo(() => {
        const lat = Number(latitude);
        const lng = Number(longitude);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
            return null;
        }

        return { lat, lng };
    }, [latitude, longitude]);
    const fallbackCenter = {
        lat: latitude,
        lng: longitude,
    };
    const center = marker || userLocation || fallbackCenter;

    useEffect(() => {
        const func = () => {
            if (!isLoaded) return;

            const searchAddress = address?.trim();

            if (!searchAddress) {
                setMarker(userLocation);
                onMarkerSelect?.(userLocation ? [userLocation.lng, userLocation.lat] : null);
                return;
            }

            setMarker(null);
            onMarkerSelect?.(null);

            const timer = setTimeout(() => {
                const geocoder = new window.google.maps.Geocoder();

                geocoder.geocode({ address: searchAddress }, (results, status) => {
                    const location = results?.[0]?.geometry?.location;

                    if (status !== "OK" || !location) return;

                    const nextMarker = {
                        lat: location.lat(),
                        lng: location.lng(),
                    };

                    setMarker(nextMarker);
                    onMarkerSelect?.([nextMarker.lng, nextMarker.lat]);
                });
            }, 600);

            return () => clearTimeout(timer);
        }
        func();
    }, [address, isLoaded, onMarkerSelect, userLocation]);

    const handleMapClick = (event) => {

        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        setMarker({ lat, lng });

        if (onMarkerSelect) {
            onMarkerSelect([lng, lat]);
        }
    };

    if (!isLoaded) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                Loading Map...
            </div>
        );
    }
    return (
        <GoogleMap
            mapContainerStyle={{
                width: "100%",
                height: "100%"
            }}
            center={center}
            zoom={marker ? 15 : 10}
            onClick={handleMapClick}
            options={{
                mapTypeControl: false,
                draggable: true,
                gestureHandling: "greedy",
            }}
        >
            {marker && <Marker
                position={marker}
                icon={{
                    url: outletMapIcon,
                    scaledSize: new window.google.maps.Size(40, 40),
                }}
            />}
        </GoogleMap>
    );
};

export default GoogleMapComponent;
