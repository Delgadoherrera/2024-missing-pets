// index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import App from "./App";
import { domain as auth0Domain, clientId, callbackUri } from "./auth.config";
import store from "./reduxStore/appStore";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./sass/index.scss";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import 'primereact/resources/themes/saga-blue/theme.css'; // Importa el tema de PrimeReact
import 'primereact/resources/primereact.min.css'; // Importa los estilos de PrimeReact
import 'primeicons/primeicons.css'; // Importa las fuentes de iconos de PrimeIcons

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Auth0Provider
    domain={auth0Domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: callbackUri,
    }}
    // For using Auth0-React with Ionic on Android and iOS,
    // it's important to use refresh tokens without the fallback
    useRefreshTokens={true}
    useRefreshTokensFallback={false}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
);
defineCustomElements(window);
