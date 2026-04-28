import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const GOOGLE_GEOCODING_URL = "https://maps.googleapis.com/maps/api/geocode/json";

const getAddressPart = (components = [], types = []) => {
    return components.find((component) =>
        types.some((type) => component.types?.includes(type))
    )?.long_name;
};

const formatLocation = (result) => {
    const components = result?.address_components || [];
    const city = getAddressPart(components, [
        "locality",
        "postal_town",
        "sublocality",
        "sublocality_level_1",
        "neighborhood",
        "administrative_area_level_2",
    ]);
    const state = getAddressPart(components, ["state"]);
    const region = getAddressPart(components, ["administrative_area_level_1"]);

    if (city && state) return `${city}, ${state}`;
    if (city && region) return `${city}, ${region}`;
    if (region && state) return `${region}, ${state}`;

    return result?.formatted_address || "";
};

const getStoredLocation = () => {
    try {
        const location = JSON.parse(localStorage.getItem("userLocation"));
        return {
            latitude: location?.latitude,
            longitude: location?.longitude,
        };
    } catch {
        return {};
    }
};

const getBoundsAroundLocation = (latitude, longitude) => {
    if (latitude == null || longitude == null) return null;

    const lat = Number(latitude);
    const lng = Number(longitude);

    if (Number.isNaN(lat) || Number.isNaN(lng)) return null;

    return `${lat - 0.5},${lng - 0.5}|${lat + 0.5},${lng + 0.5}`;
};

const DynamicLocation = ({ latitude, longitude, zipCode = "", className = "", iconClassName = "" }) => {
    const [browserLocation, setBrowserLocation] = useState({});
    const [geocodedLocation, setGeocodedLocation] = useState(null);
    const googleMapApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
    const activeZipCode = zipCode?.trim();
    const storedLocation = getStoredLocation();
    const resolvedLatitude = latitude ?? browserLocation.latitude ?? storedLocation.latitude;
    const resolvedLongitude = longitude ?? browserLocation.longitude ?? storedLocation.longitude;
    const fallbackText = activeZipCode ? `Zip code ${activeZipCode}` : "Current location";
    const lookupKey = activeZipCode
        ? `zip:${activeZipCode}`
        : resolvedLatitude != null && resolvedLongitude != null
            ? `coords:${resolvedLatitude},${resolvedLongitude}`
            : "";
    const locationText = geocodedLocation?.key === lookupKey
        ? geocodedLocation.text
        : fallbackText;

    useEffect(() => {
        if (activeZipCode || (latitude != null && longitude != null)) return;
        if (storedLocation.latitude != null && storedLocation.longitude != null) return;
        if (typeof navigator === "undefined" || !navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition((position) => {
            setBrowserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    }, [activeZipCode, latitude, longitude, storedLocation.latitude, storedLocation.longitude]);

    useEffect(() => {
        if (!googleMapApiKey) return;

        if (!activeZipCode && (resolvedLatitude == null || resolvedLongitude == null)) {
            return;
        }

        const controller = new AbortController();
        const bounds = getBoundsAroundLocation(resolvedLatitude, resolvedLongitude);
        const requests = activeZipCode
            ? [
                { components: `postal_code:${activeZipCode}` },
                { address: `${activeZipCode} postal code` },
                { address: activeZipCode },
            ]
            : [{ latlng: `${resolvedLatitude},${resolvedLongitude}` }];

        const buildUrl = (request) => {
            const params = new URLSearchParams({ key: googleMapApiKey, ...request });

            if (activeZipCode && bounds) {
                params.set("bounds", bounds);
            }

            return `${GOOGLE_GEOCODING_URL}?${params.toString()}`;
        };

        const fetchLocation = async () => {
            try {
                for (const request of requests) {
                    const response = await fetch(buildUrl(request), {
                        signal: controller.signal,
                    });
                    const data = await response.json();
                    const nextLocation = formatLocation(data?.results?.[0]);

                    if (nextLocation) {
                        setGeocodedLocation({ key: lookupKey, text: nextLocation });
                        return;
                    }
                }
            } catch (error) {
                if (error.name !== "AbortError") return;
            }
        };

        fetchLocation();

        return () => controller.abort();
    }, [activeZipCode, googleMapApiKey, lookupKey, resolvedLatitude, resolvedLongitude]);

    return (
        <div className={className}>
            <MapPin className={iconClassName} aria-hidden="true" />
            <span>{locationText}</span>
        </div>
    );
};

export default DynamicLocation;