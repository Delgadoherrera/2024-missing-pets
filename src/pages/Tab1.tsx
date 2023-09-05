import {
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab2.css";
import ImageList from "../components/simple/lostPetsImageList";
import KnobDistanceLostPet from "../components/simple/KnobDistance";
import AppBar from "../components/simple/AppBar";

const Tab2 = ({ setPetDistance }: { setPetDistance: (value: any) => void }) => {
  return (
    <IonPage>
      <AppBar />
      <KnobDistanceLostPet setPetDistance={setPetDistance} />
      <ImageList />
    </IonPage>
  );
};
export default Tab2;
