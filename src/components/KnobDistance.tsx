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

const KnobDistanceLostPet = ({setPetDistance}: {setPetDistance: (value: any) => void;}) => {
  const [value, setValue] = useState<any>(1);
  return (
    <div>
      <IonNote>{value} Km.</IonNote>
      <Box width={100}>
        <IonRange
          max={100}
          min={1}
          onIonChange={(e) => setValue(e.detail.value)}
          onIonKnobMoveEnd={() => setPetDistance(value)}
        />
      </Box>
    </div>
  );
};

export default KnobDistanceLostPet;
