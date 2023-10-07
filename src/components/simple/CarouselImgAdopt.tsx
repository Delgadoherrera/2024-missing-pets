import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Typography } from "@mui/material";
import { Pet } from "../../interfaces/types";
import { useDispatch } from "react-redux";
import { petSelected } from "../../features/dataReducer/dataReducer";
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
import { SwiperSlide, useSwiper, Swiper } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
  Navigation,
  A11y,
} from "swiper/modules";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import "@ionic/react/css/ionic-swiper.css";

import {
  arrowBackCircle,
  arrowBackCircleSharp,
  arrowForwardCircle,
  close,
} from "ionicons/icons";
import { MDBContainer } from "mdb-react-ui-kit";
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
  const [selectedImage, setSelectedImage] = React.useState(null); // State variable to track the clicked image
  const selectedImageURL = selectedImage as unknown as string;
  const swiperRef = useRef<SwiperType | null>(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const swiper = useSwiper();
  const [index, setIndex] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    setAllPets(pets);
  }, [pets]);
  const handleImageClick = (imgUrl: any, item: any) => {
    setSelectedImage(imgUrl); // Update the state variable with the clicked image URL
    setThisPet(item);
  };
  const handleSwiperReady = (swiper: SwiperType) => {
    console.log("SwiperType", SwiperType);
    setSwiperReady(true);
  };
  function capitalizeFirstLetter(str: any) {
    // Verifica si la cadena está vacía o es nula
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
              ¡Encontré a esta mascota!
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

  return (
    <>
      {Array.isArray(allPets) ? (
        <div className="carouselContent">
          <p>
            Mascotas perdidas:
            <b>
              {index + 1} / {allPets.length}
            </b>
          </p>
          {/*           <div className="arrowSwipButtons">
            <IonIcon
              slot="start"
              size="large"
              onClick={() => swiper.slidePrev()}
              icon={arrowBackCircle}
            ></IonIcon>
            <IonBreadcrumb>Mascotas perdidas: {allPets.length}</IonBreadcrumb>
            <IonIcon
              slot="end"
              size="large"
              icon={arrowForwardCircle}
              onClick={() => swiper.slideNext()}
            ></IonIcon>
          </div> */}
          <div style={{ textAlign: "center", width: "100%" }}></div>
          <Carousel onSlide={(e) => setIndex(e)} fade interval={null}>
            {allPets.map((pets: any, index: any) => {
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
                      <MDBCardText>
                        <b> Descripción </b> {pets.descripcion}
                      </MDBCardText>
                   
                    </MDBCardBody>
                    <MDBBtn
                        onClick={() => handleImageClick(pets.fotoMascota, pets)} // Add onClick event for image click
                      >
                        Detalles
                      </MDBBtn>
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
