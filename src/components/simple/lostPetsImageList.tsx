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
  const [selectedImage, setSelectedImage] = React.useState(null); // State variable to track the clicked image
  const pets = useSelector(lostPets);
  const [selectedPet, setSelectedPet] = React.useState<Pet | null>(null);
  const [petFound, setPetFound] = React.useState(false);
  const selectedImageURL = selectedImage as unknown as string;

  React.useEffect(()=>{

    console.log('selectedPetUsfx', selectedPet)
  },[selectedPet])

  const handleImageClick = (imgUrl: any, item: any) => {
    setSelectedImage(imgUrl); // Update the state variable with the clicked image URL
    setSelectedPet(item);
  };
  if (petFound) {
    return (
      <PrimerContacto
        open={setPetFound}
        action="petFound"
      />
    );
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
    <>
    <IonContent>
    <CarouselImg pets={pets} setSelectedPet={setSelectedPet} setPetFound={setPetFound} />
      <div className="imgListContainer">
        {/*   <ImageList
            sx={{ width: "100%", height: "100%" }} //antes estaba en 100%
            cols={pets.length < 3 ? 1 : 2}
            rowHeight={pets.length < 3 ? 50 : 100}
          >
            {Array.isArray(pets) &&
              pets.map((item: any, key: any) => (
                <ImageListItem key={key * 1000}>
                  <img
                    src={`data:image/jpeg;base64,${item!.fotoMascota}`}
                    alt={item.title}
                    loading="lazy"
                    onClick={() => handleImageClick(item.fotoMascota, item)} // Add onClick event for image click
                    style={{ objectFit: "cover" }}
                    className="imgListItem"
                  />
                </ImageListItem>
              ))}
          </ImageList> */}
        {pets.length === 0 ? (
          <IonItem>No se encontraron mascotas perdidas.</IonItem>
        ) : null}

        {selectedImage && ( // Render the modal when the selectedImage is not null
          <IonModal
            isOpen={!!selectedImage}
            onDidDismiss={() => setSelectedImage(null)}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={() => setSelectedImage(null)}>
                <IonIcon size="large" icon={arrowUndoCircle}></IonIcon>
              </Button>
            </div>
            <MDBContainer className="imgPanelOpt">
              <IonItem>
                <IonBreadcrumbs>Nombre:</IonBreadcrumbs>
                <b>{capitalizeFirstLetter(selectedPet!.nombre)}</b>
              </IonItem>
              <IonItem>
                <IonBreadcrumbs>Peso:</IonBreadcrumbs>
                <b>{selectedPet!.pesoAproximado}</b>
              </IonItem>
              <IonItem>
                <IonBreadcrumbs>Color principal:</IonBreadcrumbs>
                <b>{capitalizeFirstLetter(selectedPet!.colorPrimario)}</b>
              </IonItem>
              <IonItem>
                <IonBreadcrumbs>Color secundario:</IonBreadcrumbs>
                <b>{capitalizeFirstLetter(selectedPet!.colorSecundario)}</b>
              </IonItem>
              <IonItem>
                <IonBreadcrumbs>Descripción:</IonBreadcrumbs>
                <b>{capitalizeFirstLetter(selectedPet!.descripcion)}</b>
              </IonItem>
              <IonItem>
                <IonBreadcrumbs>Lugar encontrada:</IonBreadcrumbs>
                <b>{capitalizeFirstLetter(selectedPet!.geoAdress)}</b>
              </IonItem>
              <IonButton onClick={() => setPetFound(true)}>
                ¡Encontré a esta mascota!
              </IonButton>
            </MDBContainer>
            <img
              src={
                selectedImageURL && selectedImageURL.startsWith("http")
                  ? selectedImageURL
                  : `data:image/jpeg;base64,${selectedImageURL}`
              }
              alt="Selected"
            />
          </IonModal>
        )}
      </div>
    </IonContent>

    </>
  );
};
function capitalizeFirstLetter(str: any) {
  // Verifica si la cadena está vacía o es nula
  if (!str) {
    return "";
  }

  // Convierte la primera letra a mayúscula y el resto de la cadena a minúscula
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default imageLostPets;
