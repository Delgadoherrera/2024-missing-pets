import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab3.css";
import AppBar from "../components/simple/AppBar";
import UserPets from "../components/UserPets";
import "./Tab1.css";
import MapFindMyPet from "../components/MapFindMyPet";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Tab3 = () => {
  const isMapOpen = useSelector((isOpen: any) => isOpen.counter.isOpened);
  return (
    <IonPage>
{/*       <AppBar />
 */}      <IonContent className="UserPetsContainer">
        <UserPets />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
