import { requestPermissionAndGetToken } from "../hooks/useFCM";
import getBrowserName from "./getBrowserName";

export const generateFcmTokenData = async () => {
    const token = await requestPermissionAndGetToken();
    let deviceId = null;

    if (!token) return null;

    let getDeviceId = localStorage.getItem("deviceId");
    if (!getDeviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem("deviceId", deviceId);
    } else {
        deviceId = getDeviceId;
    }

    const browserName = await getBrowserName(navigator.userAgent);

    const fcmToken = {
        deviceId: deviceId,
        token: token,
        platform: "WEB",
        deviceName: browserName,
    };
    return fcmToken;
};