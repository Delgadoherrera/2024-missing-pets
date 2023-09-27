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
  IonContent,
  IonIcon,
  IonItem,
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

import { arrowBackCircle, arrowForwardCircle } from "ionicons/icons";
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
  const swiper = useSwiper();
  const dispatch = useDispatch();
  useEffect(() => {
    setAllPets(pets);
  }, [pets]);

  function capitalizeFirstLetter(str: any) {
    // Verifica si la cadena está vacía o es nula
    if (!str) {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <>
      {Array.isArray(allPets) ? (
        <>
          <IonItem>
            <IonIcon slot="start" size="large" icon={arrowBackCircle}></IonIcon>
            <IonIcon
              slot="end"
              size="large"
              icon={arrowForwardCircle}
            ></IonIcon>
          </IonItem>

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
                      className="w-6 shadow-2"
                    />
                    <Button
                      onClick={(e) => {
                        setSelectedPet(pets);
                        setPetFound(true);
                        dispatch(petSelected(pets));
                      }}
                    >
                      Encontré a esta mascota
                    </Button>
                    <Typography>
                      <b>Nombre:</b> {capitalizeFirstLetter(pets.nombre)}
                    </Typography>
                    <Typography>
                      <b>Perdida en:</b> {pets.geoAdress}
                    </Typography>
                    <Typography>
                      <b> Peso:</b>
                      {pets.pesoAproximado}
                    </Typography>
                    <Typography>
                      <b> Color principal</b>
                      {capitalizeFirstLetter(pets.colorPrimario)}
                    </Typography>
                    <Typography>
                      {" "}
                      <b> Color secundario: </b>
                      {capitalizeFirstLetter(pets.colorSecundario)}
                    </Typography>
                    <Typography>
                      {" "}
                      <b> Descripcion:</b>
                      {capitalizeFirstLetter(pets.descripcion)}
                    </Typography>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      ) : (
        <p> no hay mascotas</p>
      )}
    </>
  );
};

export default BasicDemo;
