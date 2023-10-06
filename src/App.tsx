import {
  IonApp,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";

import { Browser } from "@capacitor/browser";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "./components/generals.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { App as CapApp } from "@capacitor/app";
import LoginButton from "./components/LoginButton";
import DataRoutingApp from "./components/DataRoutingApp";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
/* Theme variables */
import "./theme/variables.css";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import ModalFindMyPet from "./components/MapFindMyPet";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import dogIcon from "./assets/SVG/6366331_animal_breed_dog_pedigree_pet_icon.svg"; // Importa y convierte el SVG en un componente React
//core
import "primereact/resources/primereact.min.css";
import LoginForm from "./components/simple/LoginForm";
setupIonicReact();

const App: React.FC = (pageProps: any) => {
  // Get the callback handler from the Auth0 React hook
  const { handleRedirectCallback } = useAuth0();
  const { isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    // Handle the 'appUrlOpen' event and call `handleRedirectCallback`
    CapApp.addListener("appUrlOpen", async ({ url }) => {
      console.log("URLCAPP", url);
      if (
        url.includes("state") &&
        (url.includes("code") || url.includes("error"))
      ) {
        await handleRedirectCallback(url);
      }
      // No-op on Android
      await Browser.close();
    });
  }, [handleRedirectCallback]);
  if (isLoading) {
    return null;
  }

  return (
    <PrimeReactProvider>
      <IonApp {...pageProps}>
        {isAuthenticated ? (
          <DataRoutingApp />
        ) : (
          <IonContent>
            {/*       <img
              src={dogIcon}
              style={{
                objectFit: "cover",
                height: "320px",
                color: "red",
                position: "fixed",
                top: "50%",
              }}
              className="imagenInicial"
            ></img> */}
            <div>
              {isAuthenticated ? null : <LoginForm />}
            </div>
          </IonContent>
        )}
      </IonApp>
    </PrimeReactProvider>
  );
};

export default App;
