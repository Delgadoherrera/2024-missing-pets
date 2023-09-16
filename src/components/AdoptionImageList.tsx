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
import { adoptPet } from "../features/dataReducer/dataReducer";
import { useDispatch, useSelector } from "react-redux";
import { MDBContainer } from "mdb-react-ui-kit";
import { Pet } from "../interfaces/types";

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

  const handleImageClick = (imgUrl: any, item: any) => {
    setSelectedImage(imgUrl); // Update the state variable with the clicked image URL
    setSelectedPet(item);
  };

  return (
    <React.Fragment>
      <IonItem>
        <ImageList
          sx={{ width: "100%", height: "100%" }}
          cols={3}
          rowHeight={164}
        >
          {Array.isArray(itemData) &&
            itemData.map((item, index) => (
              <ImageListItem key={index}>
                <img
                  src={`${item.fotoMascota}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.fotoMascota}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                  onClick={() => handleImageClick(item.fotoMascota, item)} // Add onClick event for image click
                  style={{ objectFit: "cover" }}
                />
              </ImageListItem>
            ))}
          {Array.isArray(adoptPets) &&
            adoptPets.map((item, index) => (
              <ImageListItem key={index}>
                <img
                  src={`data:image/jpeg;base64,${item!.fotoMascota}`}
                  alt={item.nombre}
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
          </IonContent>
        </IonModal>
      )}
    </React.Fragment>
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

const itemData = [
  {
    fotoMascota:
      "https://cdn.pixabay.com/photo/2018/05/11/08/11/pets-3389723_1280.jpg",
    title: "toogle",
    rows: 2,
    cols: 2,
  },
  {
    fotoMascota:
      "https://c.pxhere.com/images/9a/b4/da003d715c163f1bb32c101ed14f-1594744.jpg!d",
    title: "Burger",
  },
  {
    fotoMascota:
      "https://cdn.pixabay.com/photo/2019/04/28/07/18/animal-4162316_1280.jpg",
    title: "Camera",
  },
  {
    fotoMascota:
      "https://i0.hippopx.com/photos/876/902/418/dog-puppy-pet-toy-preview.jpg",
    title: "Coffee",
    cols: 2,
  },
  /*   {
    img: "https://images.freeimg.net/rsynced_images/pets-3389730_1280.jpg",
    title: "Hats",
    cols: 2,
  },
  {
    img: "https://c.pxhere.com/photos/6a/53/animal_dog_pets_puppy_mammals_look_nature_eye-681400.jpg!d",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://c.pxhere.com/photos/97/b0/cat_animals_pet_rest_pets-1146992.jpg!d",
    title: "Basketball",
  },
  {
    img: "https://c.pxhere.com/photos/a6/f0/dog_animal_puppy_siberian_huskies_siberian_husky_husky_pool_swim-1021635.jpg!d",
    title: "Fern",
  },
  {
    img: "https://c.pxhere.com/photos/1c/98/dog_dogs_bulldog_french_bulldog_sleep_puppy_animals_cute-1351107.jpg!d",
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://c.pxhere.com/photos/27/84/cat_pet_cat's_eyes_cat_face_cute_cat_animals_feline_cat_nose-1019394.jpg!d",
    title: "Tomato basil",
  },
  {
    img: "https://c.pxhere.com/photos/04/b2/cat_outdoor_pets_cute_cat_slave_tummy_lazy-849163.jpg!d",
    title: "Sea star",
  },
  {
    img: "https://c.pxhere.com/photos/14/e4/dog_puppy_white_pets-1084325.jpg!d",
    title: "Bike",
    cols: 2,
  }, */
  /*   {
    img: "https://c.pxhere.com/images/9a/b4/da003d715c163f1bb32c101ed14f-1594744.jpg!d",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://c.pxhere.com/photos/f0/49/pit_bull_dog_pitbull_valentine_valentines_day_staffordshire_puppy_love-1188710.jpg!d",
    title: "Burger",
  },
  {
    img: "https://c.pxhere.com/photos/e7/5c/kittens_pets_sleeping_cats_animal_domestic_cute_kitty-1361134.jpg!d",
    title: "Camera",
  },
  {
    img: "https://c.pxhere.com/photos/a6/20/dogs_puppies_puppy_mutt_pets_canine_animals_brown-655301.jpg!d",
    title: "Coffee",
    cols: 2,
  },
  {
    img: "https://c.pxhere.com/photos/da/a4/french_bulldog_dog_puppy_pet_animals_bulldog_mischief_funny-1125668.jpg!d",
    title: "Hats",
    cols: 2,
  },
  {
    img: "https://c.pxhere.com/photos/55/59/pets_dog_poodle_bichon_cute_dance_pet_education_pet_training-879183.jpg!d",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://c.pxhere.com/photos/e0/09/dogs_dog_fur_pets_sitting_dog_nos_animals_funny_dog-760358.jpg!d",
    title: "Basketball",
  },
  {
    img: "https://c.pxhere.com/photos/97/30/dog_dogs_bulldog_french_bulldog_sleep_puppy_animals_cute-1124096.jpg!d",
    title: "Fern",
  },
  {
    img: "https://c.pxhere.com/photos/97/0c/horses_stallion_mane_gelding_animals_mammals_nature_purebred-655319.jpg!d",
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  }, */
];
