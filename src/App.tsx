import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import { Browser } from "@capacitor/browser";
import { useAuth0 } from "@auth0/auth0-react";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import { useEffect } from "react";
import {
  add,
  chevronBack,
  chevronDown,
  chevronForward,
  chevronUp,
} from "ionicons/icons";
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
import MapFindMyPet from "./components/MapFindMyPet";
import FloatButton from "./components/simple/FloatButton";
import AppBar from "./components/simple/AppBar";
/* Theme variables */
import "./theme/variables.css";
import ViewStructure from "./components/main/viewStructure";

setupIonicReact();

const App: React.FC = () => {
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
    <IonApp>
      {isAuthenticated ? (
        <DataRoutingApp />
      ) : (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Missing Peats</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent></IonContent>
          <IonContent>
            <div className="container">
              {isAuthenticated ? null : <LoginButton />}
            </div>
          </IonContent>
        </IonPage>
      )}
    </IonApp>
  );
};

export default App;
