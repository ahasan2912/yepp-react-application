import { useJsApiLoader } from "@react-google-maps/api";
import { googleMapsLoaderOptions } from "../../../../../lib/googleMapsLoader";
import VendorAccountForm from "./VendorAccountForm";

const VendorAccountFormWrapper = () => {
  const { isLoaded } = useJsApiLoader(googleMapsLoaderOptions);
  if (!isLoaded) return <div className="text-center p-10">Loading Map...</div>;
  return <VendorAccountForm />;
};

export default VendorAccountFormWrapper;
