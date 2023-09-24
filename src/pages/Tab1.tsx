import { IonContent, IonItem, IonPage } from "@ionic/react";
import "./Tab2.css";
import ImageList from "../components/simple/lostPetsImageList";
import KnobDistanceLostPet from "../components/simple/KnobDistance";
import AppBar from "../components/simple/AppBar";
import Carousel from '../components/simple/Carousel'

const Tab1 = ({ setPetDistance }: { setPetDistance: (value: any) => void }) => {
  return (
    <IonPage>
      <AppBar />
        <KnobDistanceLostPet setPetDistance={setPetDistance} />
{/*         <Carousel />
 */}
      <IonContent>
        <ImageList />
      </IonContent>
    </IonPage>
  );
};
export default Tab1;
