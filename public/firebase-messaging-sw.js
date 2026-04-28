/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyA6_inEReD0lKuzY2pSld4-sfPHK136tOs",
    authDomain: "yepp-app.firebaseapp.com",
    projectId: "yepp-app",
    storageBucket: "yepp-app.firebasestorage.app",
    messagingSenderId: "191216477482",
    appId: "1:191216477482:web:20c68fdc7fc557d4c2ea53"
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/logo.svg",
    });
});