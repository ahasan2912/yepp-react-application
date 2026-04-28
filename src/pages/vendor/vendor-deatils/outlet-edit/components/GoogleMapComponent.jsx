import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef } from "react";
import { googleMapsLoaderOptions } from "../../../../../lib/googleMapsLoader";
import outletMapIcon from "../../../../../assets/images/outletMap.png";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const defaultCenter = {
    lat: 23.8103,
    lng: 90.4125,
};

const GoogleMapComponent = ({ address, selectedLocation, onMarkerSelect }) => {
    const { isLoaded } = useJsApiLoader(googleMapsLoaderOptions);
    const initialAddressRef = useRef("");
    const lastGeocodedAddressRef = useRef("");

    const center = selectedLocation || defaultCenter;

    useEffect(() => {
        if (!isLoaded) return;

        const searchAddress = address?.trim();

        if (!searchAddress) return;

        if (!initialAddressRef.current && selectedLocation) {
            initialAddressRef.current = searchAddress;
            lastGeocodedAddressRef.current = searchAddress;
            return;
        }

        if (searchAddress === lastGeocodedAddressRef.current) return;

        lastGeocodedAddressRef.current = searchAddress;

        const timer = setTimeout(() => {
            const geocoder = new window.google.maps.Geocoder();

            geocoder.geocode({ address: searchAddress }, (results, status) => {
                const location = results?.[0]?.geometry?.location;

                if (status !== "OK" || !location) return;

                onMarkerSelect({
                    lat: location.lat(),
                    lng: location.lng(),
                });
            });
        }, 600);

        return () => clearTimeout(timer);
    }, [address, isLoaded, onMarkerSelect, selectedLocation]);

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        onMarkerSelect({ lat, lng });
    };

    if (!isLoaded) {
        return <div className="w-full h-full flex items-center justify-center">Loading Map...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={selectedLocation ? 15 : 12}
            onClick={handleMapClick}
            options={{
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                draggable: true,
                gestureHandling: "greedy",
            }}
        >
            {selectedLocation && <Marker
                position={selectedLocation}
                icon={{
                    url: outletMapIcon,
                    scaledSize: new window.google.maps.Size(40, 40),
                }}
            />}
        </GoogleMap>
    );
};

export default GoogleMapComponent;
