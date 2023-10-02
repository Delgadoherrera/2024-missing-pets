import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  IonBreadcrumbs,
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonModal,
  IonNote,
} from "@ionic/react";
import { adoptPet } from "../features/dataReducer/dataReducer";
import { useDispatch, useSelector } from "react-redux";
import { MDBContainer } from "mdb-react-ui-kit";
import { Pet } from "../interfaces/types";
import dogIcon from "../assets/SVG/dog-looking-up-svgrepo-com.svg"; // Importa y convierte el SVG en un componente React
import notFound from "../assets/SVG/location-not-found-svgrepo-com.svg"; // Importa y convierte el SVG en un componente React
import CarouselImg from "./simple/CarouselImgAdopt";
import { arrowBackCircle, arrowForwardCircle } from "ionicons/icons";
import PrimerContacto from "./PrimerContacto";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  const [selectedImage, setSelectedImage] = React.useState(null); // State variable to track the clicked image
  const adoptPets = useSelector(adoptPet);
  const selectedImageURL = selectedImage as unknown as string;
  const [selectedPet, setSelectedPet] = React.useState<Pet | null>(null);
  const [petFound, setPetFound] = React.useState(false);

  console.log('adoptPets',adoptPets)

  const handleImageClick = (imgUrl: any, item: any) => {
    setSelectedImage(imgUrl); // Update the state variable with the clicked image URL
    setSelectedPet(item);
  };

  if (Array.isArray(adoptPets) && adoptPets.length === 0) {
    return (
      <IonContent className="noPetFoundContainer">
        <div>
          <IonNote> No hay mascotas en adopción</IonNote>

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
  if (petFound) {
    return (
      <PrimerContacto
        open={setPetFound}
        action="petFound"
      />
    );
  }

  return (
    <>
      <CarouselImg pets={adoptPets} setPetFound={setPetFound} setSelectedPet={setSelectedPet}/>
      <div className="imgListContainer">
  
        {/*       <IonItem>
  <ImageList
    sx={{ width: "100%", height: "100%" }} //antes estaba en 100%
    cols={adoptPets.length < 3 ? 1 : 2}
    rowHeight={adoptPets.length < 3 ? 300 : 300}
  >
    {Array.isArray(adoptPets) &&
      adoptPets.map((item: any, key: any) => (
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
  </ImageList>
</IonItem> */}

        {selectedImage && ( // Render the modal when the selectedImage is not null
          <IonModal
            isOpen={!!selectedImage}
            onDidDismiss={() => setSelectedImage(null)}
          >
            <IonItem>
              <button onClick={() => setSelectedImage(null)}> X</button>
            </IonItem>
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
              <IonItem>
                <IonButton>¡Quiero adoptar!</IonButton>
              </IonItem>
            </MDBContainer>

            <img
              src={
                selectedImageURL && selectedImageURL.startsWith("http")
                  ? selectedImageURL
                  : `data:image/jpeg;base64,${selectedImageURL}`
              }
              alt="Selected"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </IonModal>
        )}
      </div>
    </>
  );
}
function capitalizeFirstLetter(str: any) {
  // Verifica si la cadena está vacía o es nula
  if (!str) {
    return "";
  }

  // Convierte la primera letra a mayúscula y el resto de la cadena a minúscula
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

