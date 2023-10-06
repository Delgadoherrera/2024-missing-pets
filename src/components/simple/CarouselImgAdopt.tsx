import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Carousel, CarouselResponsiveOption } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { Typography } from "@mui/material";
import { Pet } from "../../interfaces/types";
import { useDispatch } from "react-redux";
import { petSelected } from "../../features/dataReducer/dataReducer";
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
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
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
  const dispatch = useDispatch();
  useEffect(() => {
    setAllPets(pets);
  }, [pets]);
  const handleImageClick = (imgUrl: any, item: any) => {
    setSelectedImage(imgUrl); // Update the state variable with the clicked image URL
    setThisPet(item);
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
          </MDBContainer>
        </IonContent>
      </IonModal>
    );
  }

  return (
    <>
      {Array.isArray(allPets) ? (
        <div className="carouselContent">
          <div className="arrowSwipButtons">
            <IonIcon slot="start" size="large" icon={arrowBackCircle}></IonIcon>
            <IonBreadcrumb>Mascotas perdidas: {allPets.length}</IonBreadcrumb>
            <IonIcon
              slot="end"
              size="large"
              icon={arrowForwardCircle}
            ></IonIcon>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            watchSlidesProgress
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {allPets.map((pets: any, index: any) => {
              return (
                <SwiperSlide key={index}>
                  <div className="slidesContent petLostCarouselDesc">
                    <img
                      src={`data:image/jpeg;base64,${pets.fotoMascota}`}
                      alt={pets.name}
                      onClick={() => handleImageClick(pets.fotoMascota, pets)} // Add onClick event for image click
                      className="imgCarousel"
                    />
           {/*          <Button
                      onClick={(e) => {
                        setSelectedPet(pets);
                        setPetFound(true);
                        dispatch(petSelected(pets));
                      }}
                    >
                      Adoptar a esta mascota
                    </Button> */}
                    <div className="petsDescriptionContent"></div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <p> no hay mascotas</p>
      )}
    </>
  );
};

export default BasicDemo;
