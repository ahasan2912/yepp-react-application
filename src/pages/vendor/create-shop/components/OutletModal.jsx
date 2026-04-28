import { MapPin, Store, X } from "lucide-react";
import { useState } from "react";
import GoogleMapComponent from "./GoogleMapComponent";

const OutletModal = ({ onClose, onSave }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [outlet_name, setOutletName] = useState("");
  const [address, setAddress] = useState("");
  const [zip_code, setZip] = useState("");

  const handleSave = () => {
    onSave({
      outlet_name,
      address,
      zip_code,
      coordinates
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white h-auto rounded-2xl w-full max-w-xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-primary">Add Location</h3>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-5">
          {/* Outlet Name */}
          <div>
            <label className="block text-lg font-medium">
              Name
            </label>

            <div className="relative mt-2">
              <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                className="w-full pl-12 pr-4 py-3 border rounded-full outline-0"
                placeholder="Shop name, street, city"
                value={outlet_name}
                onChange={(e) => setOutletName(e.target.value)}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-lg font-medium">
              Address
            </label>

            <div className="relative mt-2">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                className="w-full pl-12 pr-4 py-3 border rounded-full outline-0"
                placeholder="Shop name, street, city"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* Map */}
          <div>
            <label className="block text-lg font-medium">
              Location
            </label>

            <div className="w-full h-64 rounded-xl overflow-hidden border mt-2">

              <GoogleMapComponent
                address={address}
                onMarkerSelect={setCoordinates}
              />

            </div>
          </div>

          {/* Zip */}
          <div>
            <label className="block text-lg font-medium">
              Zip Code
            </label>

            <input
              className="w-full mt-2 px-4 py-3 border rounded-full outline-0"
              placeholder="Zip code"
              value={zip_code}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            <button
              onClick={onClose}
              className="flex-1 py-3 border rounded-full text-gray-800 cursor-pointer"
            >
              Cancel
            </button>

            <button
              disabled={coordinates === null}
              onClick={handleSave}
              className={`flex-1 py-3 rounded-full cursor-pointer ${coordinates === null ? 'bg-gray-300 text-gray-800' : 'bg-primary text-white'}`}
            >
              Save Location
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OutletModal;
