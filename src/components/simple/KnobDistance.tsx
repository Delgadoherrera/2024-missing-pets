import { useEffect, useState } from "react";
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
import Slider from "@mui/material/Slider";
const KnobDistanceLostPet = ({
  setPetDistance,
}: {
  setPetDistance: (value: any) => void;
}) => {
  const [value, setValue] = useState<any>(1);

  useEffect(() => {
    setPetDistance(value);
  }, [value]);
  return (
    <MDBContainer style={{ textAlign: "center" }} className="knobContainer">
      <IonNote style={{ margin: "5%" }}>Distancia: {value} Km.</IonNote>
      <Slider
        max={100}
        min={1}
        onChange={(e, newValue) => setValue(newValue)} // Usa newValue en lugar de e.current.value        onDragEnd={() => setPetDistance(value)}
      />
    </MDBContainer>
  );
};

export default KnobDistanceLostPet;
