import { useState } from "react";
import {
  IonItem,
  IonButton,
  IonRange,
  IonContent,
  IonImg,
  IonText,
  IonNote,
} from "@ionic/react";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { MDBContainer } from "mdb-react-ui-kit";

const KnobDistanceLostPet = ({
  setPetDistance,
}: {
  setPetDistance: (value: any) => void;
}) => {
  const [value, setValue] = useState<any>(1);
  return (
    <MDBContainer className="rangeContainer">
      <IonNote style={{ margin: "5%" }}>Radio de distancia:</IonNote>

      <IonRange
        max={100}
        min={1}
        onIonChange={(e) => setValue(e.detail.value)}
        onIonKnobMoveEnd={() => setPetDistance(value)}
        /*         style={{backgroundColor:'red'}}
         */
      />
      <IonNote>{value} Km.</IonNote>
    </MDBContainer>
  );
};

export default KnobDistanceLostPet;
