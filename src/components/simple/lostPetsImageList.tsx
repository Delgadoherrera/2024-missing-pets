import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  IonBadge,
  IonBreadcrumbs,
  IonButton,
  IonContent,
  IonFabButton,
  IonIcon,
  IonImg,
  IonItem,
  IonModal,
  IonNote,
  IonTabButton,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { lostPets, petSelected } from "../../features/dataReducer/dataReducer";
import { Pet } from "../../interfaces/types";
import { MDBContainer } from "mdb-react-ui-kit";
import { Button, StepButton } from "@mui/material";
import ContactoPetFound from "../ContactoPetFound";
import PrimerContacto from "../PrimerContacto";
import dogIcon from "../../assets/SVG/dog-looking-up-svgrepo-com.svg"; // Importa y convierte el SVG en un componente React
import {
  arrowBackCircle,
  arrowBackCircleOutline,
  arrowBackSharp,
  arrowUndoCircle,
} from "ionicons/icons";
import CarouselImg from "../simple/CarouselImg";

interface FrontCommandProps {
  pet: Pet | null;
  activeFrontMap: any;
}
const imageLostPets: React.FC = () => {
  const pets = useSelector(lostPets);
  const [selectedPet, setSelectedPet] = React.useState<Pet | null>(null);
  const [petFound, setPetFound] = React.useState(false);

  React.useEffect(() => {
    console.log("selectedPetUsfx", selectedPet);
  }, [selectedPet]);

  if (petFound) {
    return <PrimerContacto open={setPetFound} action="petFound" />;
  }
  if (Array.isArray(pets) && pets.length === 0) {
    return (
      <IonContent className="noPetFoundContainer">
        <div>
          <IonNote> No hay mascotas perdidas</IonNote>
          <IonImg
            src={dogIcon}
            style={{
              objectFit: "cover",
              width: "80px",
              height: "80px",
              opacity: "60%",
            }}
            className="imagenInicial"
          ></IonImg>
        </div>
      </IonContent>
    );
  }
  return (
    <IonContent>
      <CarouselImg
        pets={pets}
        setSelectedPet={setSelectedPet}
        setPetFound={setPetFound}
      />
      {pets.length === 0 ? (
        <IonItem>No se encontraron mascotas perdidas.</IonItem>
      ) : null}
    </IonContent>
  );
};

export default imageLostPets;
