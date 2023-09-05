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
import FloatButton from "../../components/simple/FloatButton";
import AppBar from "../../components/simple/AppBar";
import LostPetImage from "../simple/lostPetsImageList";

const ViewStructure = () => {
  return (
    <>
      <AppBar />
      <LostPetImage />
      <FloatButton />
    </>
  );
};

export default ViewStructure;
