import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Pet } from "../../interfaces/types";
import { useDispatch } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonModal,
  IonPage,
} from "@ionic/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import "@ionic/react/css/ionic-swiper.css";

import {
  arrowBack as arrowBackCircle,
  arrowBackCircleSharp,
  arrowForward as arrowForwardCircle,
  close,
} from "ionicons/icons";
import { MDBContainer } from "mdb-react-ui-kit";
import { petSelected } from "../../features/dataReducer/dataReducer";
interface FrontCommandProps {
  pets: Pet;
  setSelectedPet: any;
  setPetFound: any;
}
const BasicDemo: React.FC<FrontCommandProps> = ({
  pets,
  setSelectedPet,
  setPetFound,
}) => {
  const [allPets, setAllPets] = React.useState<Pet | null>(null);
  const [thisPet, setThisPet] = React.useState<Pet | null>(null);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const selectedImageURL = selectedImage as unknown as string;
  const [index, setIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setAllPets(pets);
  }, [pets]);
  const handleImageClick = (imgUrl: any, item: any) => {
    setSelectedImage(imgUrl);
    setThisPet(item);
    dispatch(petSelected(item))

  };
  console.log("active index", index);
  function capitalizeFirstLetter(str: any) {
    if (!str) {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  if (selectedImage) {
    return (
      <IonModal
        isOpen={!!selectedImage}
        onDidDismiss={() => setSelectedImage(null)}
      >
        <IonContent className="contactModalContainer">
          <div style={{ display: "flex", justifyContent: "end" }}>
            <IonIcon
              onClick={() => setSelectedImage(null)}
              size="large"
              icon={close}
              slot="end"
            ></IonIcon>
          </div>
          <MDBContainer>
            <img
              src={
                selectedImageURL && selectedImageURL.startsWith("http")
                  ? selectedImageURL
                  : `data:image/jpeg;base64,${selectedImageURL}`
              }
              alt="Selected"
            />
            <Button onClick={() => setPetFound(true)}>
              ¡Adoptar a esta mascota!
            </Button>
            <IonItem>
              <IonBreadcrumbs>Nombre:</IonBreadcrumbs>
              <b>{capitalizeFirstLetter(thisPet!.nombre)}</b>
            </IonItem>
            <IonItem>
              <IonBreadcrumbs>Peso:</IonBreadcrumbs>
              <b>{thisPet!.pesoAproximado}</b>
            </IonItem>
            <IonItem>
              <IonBreadcrumbs>Color principal:</IonBreadcrumbs>
              <b>{capitalizeFirstLetter(thisPet!.colorPrimario)}</b>
            </IonItem>
            <IonItem>
              <IonBreadcrumbs>Color secundario:</IonBreadcrumbs>
              <b>{capitalizeFirstLetter(thisPet!.colorSecundario)}</b>
            </IonItem>
            <IonItem>
              <IonBreadcrumbs>Descripción:</IonBreadcrumbs>
              <b>{capitalizeFirstLetter(thisPet!.descripcion)}</b>
            </IonItem>
            <IonItem>
              <IonBreadcrumbs>Lugar encontrada:</IonBreadcrumbs>
              <b>{capitalizeFirstLetter(thisPet!.geoAdress)}</b>
            </IonItem>
          </MDBContainer>
        </IonContent>
      </IonModal>
    );
  }
  const slideCarousel = (action: any, index: any) => {
    console.log('elindex', index);
  
    if (Array.isArray(allPets)) {
      if (action === "prev") {
        if (index === 0) {
          console.log("al principio");
          setIndex(allPets.length - 1);
        } else {
          setIndex(index - 1);
        }
      }
  
      if (action === "next") {
        if (index === allPets.length - 1) {
          console.log("al final");
          setIndex(0);
        } else {
          setIndex(index + 1);
        }
      }
    }
  };
  return (
    <>
      {Array.isArray(allPets) ? (
        <div className="carouselContent">
          <div className="arrowSwipButtons">
            <IonIcon
              slot="start"
              size="large"
              onClick={() => slideCarousel("prev", index)}
              icon={arrowBackCircle}
            ></IonIcon>
            <IonBreadcrumb>
              Mascotas perdidas:
              <b style={{marginLeft:'5px'}}>
                {index + 1} / {allPets.length}
              </b>
            </IonBreadcrumb>

            <IonIcon
              slot="end"
              size="large"
              icon={arrowForwardCircle}
              onClick={() => slideCarousel("next", index)}
            ></IonIcon>
          </div>
          <div style={{ textAlign: "center", width: "100%" }}></div>
          <Carousel
            onSlide={(e) => setIndex(e)}
            fade
            activeIndex={index}
            interval={null}
            slide={true}
          >
            {allPets.map((pets: any, index: any) => {
              const truncatedDescription =
                pets.descripcion.length > 50
                  ? pets.descripcion.slice(0, 120) + " "
                  : pets.descripcion;
              console.log("petdescriptionLenght", pets.descripcion.length);
              return (
                <Carousel.Item style={{ textAlign: "center" }}>
                  <MDBCard className="carouselItem">
                    <MDBCardImage
                      src={`data:image/jpeg;base64,${pets.fotoMascota}`}
                      alt={pets.name}
                      onClick={() => handleImageClick(pets.fotoMascota, pets)} // Add onClick event for image click
                      className="imgCarousel"
                    />
                    <MDBCardBody>
                      <MDBCardTitle>{pets.nombre}</MDBCardTitle>
                    </MDBCardBody>
                    <MDBBtn
                      onClick={() => handleImageClick(pets.fotoMascota, pets)} // Add onClick event for image click
                    >
                      Detalles
                    </MDBBtn>
                    <MDBCardText>
                      <b> Descripción </b>
                      {showFullDescription
                        ? pets.descripcion
                        : truncatedDescription}
                      {pets.descripcion.length > 50 && (
                        <button
                          className="showMore"
                          onClick={() =>
                            setShowFullDescription(!showFullDescription)
                          }
                        >
                          {showFullDescription ? "..." : "..."}
                        </button>
                      )}
                    </MDBCardText>
                  </MDBCard>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <p> no hay mascotas</p>
      )}
    </>
  );
};

export default BasicDemo;
