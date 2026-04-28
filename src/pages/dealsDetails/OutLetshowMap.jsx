import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from "react";
import outletMapIcon from "../../assets/images/outletMap.png";
import { googleMapsLoaderOptions } from "../../lib/googleMapsLoader";

const OutLetshowMap = ({ locations = [] }) => {
    const { isLoaded } = useJsApiLoader(googleMapsLoaderOptions);

    const containerStyle = {
        width: "100%",
        height: "500px"
    };

    const center = useMemo(() => {
        if (!locations.length) return { lat: 23.8103, lng: 90.4125 };

        let totalLat = 0;
        let totalLng = 0;

        locations.forEach((loc) => {
            totalLat += loc?.location?.coordinates?.[1] || 0;
            totalLng += loc?.location?.coordinates?.[0] || 0;
        });

        return {
            lat: totalLat / locations.length,
            lng: totalLng / locations.length,
        };
    }, [locations]);

    if (!isLoaded) return <div>Loading Map...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            options={{
                mapTypeControl: false,
                draggable: true,
                gestureHandling: "greedy",
            }}
        >
            {locations.map((loc, index) => (
                <Marker
                    key={index}
                    position={{
                        lat: loc?.location?.coordinates?.[1],
                        lng: loc?.location?.coordinates?.[0],
                    }}
                    icon={{
                        url: outletMapIcon,
                        scaledSize: new window.google.maps.Size(40, 40),
                    }}
                />
            ))}
        </GoogleMap>
    );
};

export default OutLetshowMap;
