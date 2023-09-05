import React from "react";
import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import {
  addCircleOutline,
  chevronBack,
  chevronDown,
  chevronForward,
  chevronUp,
} from "ionicons/icons";

function Example() {
  return (
    <IonFab slot="fixed" horizontal="center" vertical="bottom">
      <IonFabButton className="fabMaster" >
        <IonIcon icon={addCircleOutline}></IonIcon>
      </IonFabButton>
      <IonFabList side="top">
        <IonFabButton className="fabButton">Perdidas</IonFabButton>
      </IonFabList>
      <IonFabList side="end">
        <IonFabButton className="fabButton">En adopción</IonFabButton>
      </IonFabList>
      <IonFabList side="bottom">
        <IonFabButton className="fabButton">Mis mascotas</IonFabButton>
      </IonFabList>
    </IonFab>
  );
}
export default Example;
