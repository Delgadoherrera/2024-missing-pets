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

const Tab3 = (data: any) => {
  console.log("data", data);
  return (
    <IonPage>
      <AppBar />
      <IonContent className="UserPetsContainer">
        <UserPets data={data} />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
