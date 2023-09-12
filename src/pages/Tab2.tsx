import {
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab2.css";
import AdoptionImageList from "../components/AdoptionImageList";
import KnobDistanceLostPet from "../components/simple/KnobDistance";
import AppBar from "../components/simple/AppBar";

const Tab2 = ({ setPetDistance }: { setPetDistance: (value: any) => void }) => {
  return (
    <IonPage>
      <AppBar />
      <IonItem>
        <KnobDistanceLostPet setPetDistance={setPetDistance} />
      </IonItem>
      <IonContent>
        <AdoptionImageList />
      </IonContent>
    </IonPage>
  );
};
export default Tab2;
