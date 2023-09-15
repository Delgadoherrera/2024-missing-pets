import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  IonBreadcrumbs,
  IonButton,
  IonContent,
  IonItem,
  IonModal,
  IonNote,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { lostPets, petSelected } from "../../features/dataReducer/dataReducer";
import { Pet } from "../../interfaces/types";
import { MDBContainer } from "mdb-react-ui-kit";
import { Button } from "@mui/material";
import ContactoPetFound from "../ContactoPetFound";
import PrimerContacto from "../PrimerContacto";

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
  console.log("petfound", petFound);
  const handleImageClick = (imgUrl: any, item: any) => {
    console.log("item", item);
    setSelectedImage(imgUrl); // Update the state variable with the clicked image URL
    setSelectedPet(item);
  };
  if (petFound) {
    return <PrimerContacto open={setPetFound} idMascotaPerdida={selectedPet} />;
  }
  return (
    <React.Fragment>
      <IonItem>
        <ImageList
          sx={{ width: "100%", height: "100%" }}
          cols={3}
          rowHeight={164}
        >
          {Array.isArray(itemData) &&
            itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                  onClick={() => handleImageClick(item.img, item)} // Add onClick event for image click
                  style={{ objectFit: "cover" }}
                />
              </ImageListItem>
            ))}
          {Array.isArray(pets) &&
            pets.map((item: any) => (
              <ImageListItem key={item.img + item.img}>
                <img
                  src={`data:image/jpeg;base64,${item!.fotoMascota}`}
                  alt={item.title}
                  loading="lazy"
                  onClick={() => handleImageClick(item.fotoMascota, item)} // Add onClick event for image click
                  style={{ objectFit: "cover" }}
                />
              </ImageListItem>
            ))}
        </ImageList>
      </IonItem>
      {selectedImage && ( // Render the modal when the selectedImage is not null
        <IonModal
          isOpen={!!selectedImage}
          onDidDismiss={() => setSelectedImage(null)}
        >
          <IonContent>
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
                <IonButton onClick={() => setPetFound(true)}>
                  ¡Es mi mascota!
                </IonButton>
              </IonItem>
            </MDBContainer>
            <img
              src={
                selectedImageURL && selectedImageURL.startsWith("http")
                  ? selectedImageURL
                  : `data:image/jpeg;base64,${selectedImageURL}`
              }
              alt="Selected"
            />
          </IonContent>
        </IonModal>
      )}
    </React.Fragment>
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
