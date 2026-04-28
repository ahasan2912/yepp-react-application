import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PersistGate } from "redux-persist/integration/react";
import AppRoutes from './routes/Route.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './app/store.js'
import { Toaster } from 'react-hot-toast'
import InitialPageLoader from './components/skeleton/InitialPageLoader.jsx'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(function (registration) {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch(function (err) {
      console.error("Service Worker registration failed:", err);
    });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<InitialPageLoader />} persistor={persistor}>
        <AppRoutes />
        <Toaster position="top-right" reverseOrder={false} />
      </PersistGate>
    </Provider>
  </StrictMode>
)
