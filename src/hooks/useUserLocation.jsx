const useUserLocation = () => {
    const location = JSON.parse(localStorage.getItem("userLocation"));
    const latitude = location?.latitude;
    const longitude = location?.longitude;

    return { latitude, longitude }
};

export default useUserLocation;