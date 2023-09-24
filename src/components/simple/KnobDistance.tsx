import { useEffect, useState } from "react";
import {
  IonItem,
  IonButton,
  IonRange,
  IonContent,
  IonImg,
  IonText,
  IonNote,
  IonSelect,
  IonList,
  IonSelectOption,
  IonBreadcrumb,
} from "@ionic/react";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { MDBContainer } from "mdb-react-ui-kit";
import Slider from "@mui/material/Slider";
import {
  ButtonBase,
  ButtonGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
const KnobDistanceLostPet = ({
  setPetDistance,
}: {
  setPetDistance: (value: any) => void;
}) => {
  const [value, setValue] = useState<any>(1);
  const [temp,setTemp]=useState<any>(value)
  const [selectedCities, setSelectedCities] = useState(null);

  const cities = [
    { name: "Perro", code: "PERR" },
    { name: "Gato", code: "GAT" },
    { name: "Otro", code: "OTR" },
    { name: "Negro", code: "NEG" },
    { name: "Blanco", code: "BLA" },
    { name: "Gris", code: "GRI" },
    { name: "Marron", code: "MARR" },
    { name: "Dorado", code: "DOR" },
    { name: "Pequeño", code: "PEQ" },
    { name: "Joven", code: "JOV" },
    { name: "Adulto", code: "ADU" },
    { name: "Viejito", code: "VIE" },
  ];
  useEffect(() => {
    setPetDistance(value);
  }, [value]);
  return (
    <MDBContainer style={{ textAlign: "center" }} className="knobContainer">
      <IonList>
          <IonSelect placeholder="Filtrar " multiple={true}>
            <IonSelectOption value="apples">Perro</IonSelectOption>
            <IonSelectOption value="oranges">Gato</IonSelectOption>
            <IonSelectOption value="bananas">Otra especie</IonSelectOption>
            <IonSelectOption value="bananas">Negro</IonSelectOption>
            <IonSelectOption value="bananas">Blanco</IonSelectOption>
            <IonSelectOption value="bananas">Gris</IonSelectOption>
            <IonSelectOption value="bananas">Marron</IonSelectOption>
            <IonSelectOption value="bananas">Dorado</IonSelectOption>
            <IonSelectOption value="bananas">Pequeño</IonSelectOption>
            <IonSelectOption value="bananas">Joven</IonSelectOption>
            <IonSelectOption value="bananas">Adulto</IonSelectOption>
            <IonSelectOption value="bananas">Viejito</IonSelectOption>
          </IonSelect>
      </IonList>
      <IonBreadcrumb
        style={{
          margin: "1%",
          width: "180px",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        Distancia: {temp} Km.
      </IonBreadcrumb>
      <Slider
        max={100}
        min={1}
        onChange={(e, newValue) => setTemp(newValue)} // Usa newValue en lugar de e.current.value        onDragEnd={() => setPetDistance(value)}
        onChangeCommitted={(e, newValue) => setValue(newValue)} // Usa newValue en lugar de e.current.value        onDragEnd={() => setPetDistance(value)}
      />
    </MDBContainer>
  );
};

export default KnobDistanceLostPet;
