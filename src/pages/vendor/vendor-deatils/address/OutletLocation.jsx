import React, { useEffect, useState } from "react";
import { MapPin, Store, ChevronRight, Mailbox, GitCommitVertical } from "lucide-react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import useUserLocation from "../../../../hooks/useUserLocation";
import outletMapIcon from "../../../../assets/images/outletMap.png";
import { googleMapsLoaderOptions } from "../../../../lib/googleMapsLoader";

export default function OutletLocation({ outlets = [] }) {
  const { latitude, longitude } = useUserLocation();
  const [selectedOutlet, setSelectedOutlet] = useState(outlets?.[0] || null);
  const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const { isLoaded } = useJsApiLoader(googleMapsLoaderOptions);

  useEffect(() => {
    const func = () => {
      if (outlets?.length && !selectedOutlet) {
        setSelectedOutlet(outlets[0]);
      }
    }
    func();
  }, [outlets, selectedOutlet]);

  const coordinates = selectedOutlet?.location?.coordinates;
  const outletLng = coordinates?.[0];
  const outletLat = coordinates?.[1];

  const center =
    outletLat != null && outletLng != null
      ? { lat: outletLat, lng: outletLng }
      : latitude != null && longitude != null
        ? { lat: latitude, lng: longitude }
        : { lat: 23.8103, lng: 90.4125 };

  function getDistanceInMiles(userLat, userLng, shopLat, shopLng) {
    const toRad = (value) => (value * Math.PI) / 180;

    const earthRadiusMiles = 3958.8;
    const dLat = toRad(shopLat - userLat);
    const dLng = toRad(shopLng - userLng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(userLat)) *
      Math.cos(toRad(shopLat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusMiles * c;
  }

  const formatDistance = (distance) => {
    if (distance == null) return null;
    if (distance < 0.01) return "Less than 0.01 miles away";
    return `${distance.toFixed(2)} miles away`;
  };

  const selectedOutletDistance =
    latitude != null &&
      longitude != null &&
      outletLat != null &&
      outletLng != null
      ? getDistanceInMiles(latitude, longitude, outletLat, outletLng)
      : null;

  return (
    <div className="w-full max-w-305 mx-auto pb-10">
      <div className="flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white min-h-110">

        {/* LEFT */}
        <div className="md:w-5/12 flex flex-col p-3 sm:p-6 border-b md:border-b-0 md:border-r border-gray-200">
          <p className="text-[26px] font-bold text-primary mb-5">
            Available Locations
          </p>
          <div className="space-y-5">
            {outlets.map((outlet) => {
              const isActive = selectedOutlet?._id === outlet?._id;

              const locCoordinates = outlet?.location?.coordinates;
              const locLng = locCoordinates?.[0];
              const locLat = locCoordinates?.[1];

              const distance =
                latitude != null &&
                  longitude != null &&
                  locLat != null &&
                  locLng != null
                  ? getDistanceInMiles(latitude, longitude, locLat, locLng)
                  : null;

              return (
                <button
                  key={outlet?._id}
                  onClick={() => setSelectedOutlet(outlet)}
                  className={`w-full flex items-center justify-between rounded-lg px-3 py-3 sm:px-5 sm:py-4 text-left transition-all duration-200 border
                    ${isActive
                      ? "bg-[color-mix(in_srgb,var(--primary-color)_8%,white)] border-(--primary-color) shadow-sm"
                      : "bg-slate-100 border-transparent hover:bg-slate-200"
                    }`}
                >
                  <div className="flex gap-2 min-w-0">
                    <Store className="w-5 h-5 text-primary shrink-0 mt-1.5" />

                    <div className="min-w-0">
                      <p className="text-lg text-gray-500 truncate">
                        <span className="text-primary font-semibold">
                          {outlet?.outlet_name || outlet?.address}:
                        </span>{" "}
                        {outlet?.address}
                      </p>

                      {distance != null && (
                        <p className="text-sm text-gray-500 font-semibold mt-1">
                          Zip code {outlet?.zip_code}
                        </p>
                      )}
                    </div>
                  </div>

                  <ChevronRight className="w-6 h-6 text-gray-500 shrink-0 ml-3" />
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:flex-1 flex flex-col min-h-80 md:min-h-0">
          <div className="bg-slate-100 h-75 sm:h-87.5 md:h-auto md:flex-1">
            {isLoaded && (outletLat != null || latitude != null) ? (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={center}
                zoom={15}
                options={{
                  mapTypeControl: false,
                  streetViewControl: false,
                  fullscreenControl: false,
                  draggable: true,
                  gestureHandling: "greedy",
                }}
              >
                {/* Outlet Marker */}
                {outletLat != null && outletLng != null && (
                  <Marker
                    position={{ lat: outletLat, lng: outletLng }}
                    icon={{
                      url: outletMapIcon,
                      scaledSize: new window.google.maps.Size(40, 40),
                    }}
                  />
                )}

                {latitude != null && longitude != null && (
                  <Marker
                    position={{ lat: latitude, lng: longitude }}
                    icon={{
                      url: `data:image/svg+xml;charset=UTF-8,
                    ${encodeURIComponent(`
                      <svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="36" cy="36" r="22" fill="#4285F4" opacity="0.18"/>
                        <circle cx="36" cy="36" r="18" fill="#4285F4" opacity="0.25">
                          <animate attributeName="r" values="18;26;18" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.25;0;0.25" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="36" cy="36" r="7" fill="#1A73E8" stroke="white" stroke-width="3"/>
                      </svg>
                    `)}`,
                      scaledSize: new window.google.maps.Size(80, 80),
                      anchor: new window.google.maps.Point(36, 36),
                    }}
                  />
                )}
              </GoogleMap>
            ) : (
              <div className="w-full h-full min-h-75 flex flex-col items-center justify-center gap-3 text-slate-400">
                <MapPin className="w-8 h-8 opacity-40" />
                <p className="text-sm">
                  {GOOGLE_MAP_API_KEY
                    ? "Loading map or missing coordinates..."
                    : "Add your Google Maps API key"}
                </p>
              </div>
            )}
          </div>

          {/* INFO BAR */}
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-1 min-w-0">
              <MapPin className="w-5.5 h-5.5 text-red-400 shrink-0" />
              <p className="text-lg text-gray-600 font-bold truncate">
                {selectedOutlet?.address || "No address available"}
              </p>
            </div>

            {selectedOutletDistance != null && (
              <p className="text-base font-semibold text-primary shrink-0 text wrap-anywhere">
                {formatDistance(selectedOutletDistance)} Distance
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



