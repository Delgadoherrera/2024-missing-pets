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

  const handleImageClick = (imgUrl: any, item: any) => {
    setSelectedImage(imgUrl); // Update the state variable with the clicked image URL
    setSelectedPet(item);
  };
  if (petFound) {
    return (
      <PrimerContacto
        open={setPetFound}
        idMascotaPerdida={selectedPet}
        setSelectedImage={setSelectedImage}
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
      <CarouselImg pets={pets} />
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

const itemData = [
  {
    img: "https://c.pxhere.com/photos/12/6b/dog_animal_pets_puppy_pet-914137.jpg!d",
    title: "Tomato basil",
  },
  {
    img: "https://c.pxhere.com/photos/eb/b9/cat_pets_animals_cat_eyes_cat's_eye_cute_pet_cat_person-1116599.jpg!d",
    title: "Sea star",
  },
  {
    img: "https://c.pxhere.com/photos/40/a8/pet_cats_pets_nature_animal_animals_cat_silver-392212.jpg!d",
    title: "Bike",
    cols: 2,
  },
  {
    img: "https://c.pxhere.com/photos/5c/56/dog_puppy_pets_expensive_sweet_livestock-1221911.jpg!d",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://c.pxhere.com/photos/3c/64/dog_pet_pets_dogs_animals_nikon_straydogs_streetdogs-462940.jpg!d",
    title: "Burger",
  },
  /*  {
    img: "https://c.pxhere.com/photos/1f/8a/vienna_wien_blackandwhite_bw_dog_pet_pets_dogs-278367.jpg!d",
    title: "Camera",
  },
  {
    img: "https://c.pxhere.com/photos/7c/92/pet_cats_pets_nature_animal_animals_cat_persian-278967.jpg!d",
    title: "Coffee",
    cols: 2,
  },
  {
    img: "https://c.pxhere.com/photos/62/9e/chihuahua_dog_small_pets_cute_animal-1172487.jpg!d",
    title: "Hats",
    cols: 2,
  },
  {
    img: "https://c.pxhere.com/photos/81/25/dog_hybrid_animal_fur_comrade_face_pets_portrait-909765.jpg!d",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://c.pxhere.com/photos/1c/d0/dog_pet_pets_dogs_nature_animals_turkey_nikon-524574.jpg!d",
    title: "Basketball",
  },
  {
    img: "https://c.pxhere.com/photos/bd/40/cat_persian_animals_catherine_white_skin_pets-678890.jpg!d",
    title: "Fern",
  },
  {
    img: "https://c.pxhere.com/photos/8e/06/cat_pet_animal_look_feline_animals_rest_kitten-795383.jpg!d",
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://c.pxhere.com/photos/23/ed/dog_puppy_animals_laika_redhead_pets_portrait_man's_best_friend-1012134.jpg!d",
    title: "Tomato basil",
  },
  {
    img: "https://c.pxhere.com/photos/b1/27/pet_cats_pets_nature_animal_animals_cat_silver-280456.jpg!d",
    title: "Sea star",
  }, */
];

export default imageLostPets;
