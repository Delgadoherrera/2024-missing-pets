import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Carousel, CarouselResponsiveOption } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { Typography } from "@mui/material";
import { Pet } from "../../interfaces/types";
import PrimerContacto from "../PrimerContacto";
import { petSelected } from "../../features/dataReducer/dataReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  IonBreadcrumbs,
  IonButton,
  IonIcon,
  IonItem,
  IonModal,
} from "@ionic/react";
import { MDBContainer } from "mdb-react-ui-kit";
import { arrowBackCircleSharp, arrowUndoCircle } from "ionicons/icons";
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
  const [petAdopt, setPetAdopt] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null); // State variable to track the clicked image
  const selectedImageURL = selectedImage as unknown as string;
  const dispatch = useDispatch();

  const handleImageClick = (imgUrl: any, item: any) => {
    setSelectedImage(imgUrl); // Update the state variable with the clicked image URL
    setThisPet(item);
  };
  const responsiveOptions: CarouselResponsiveOption[] = [
    /*     {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "991px",
      numVisible: 2,
      numScroll: 1,
    }, */
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
  useEffect(() => {
    setAllPets(pets);
  }, [pets]);
  const getSeverity = (pets: any) => {
    switch (pets.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };
  function capitalizeFirstLetter(str: any) {
    // Verifica si la cadena está vacía o es nula
    if (!str) {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const petsTemplate = (pets: any) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3 petLostCarouselDesc">
        <div className="mb-3">
          <img
            src={`data:image/jpeg;base64,${pets.fotoMascota}`}
            alt={pets.name}
            className="w-6 shadow-2"
            onClick={() => handleImageClick(pets.fotoMascota, pets)} // Add onClick event for image click
          />
        </div>
        <Button
          onClick={(e) => {
            setSelectedPet(pets);
            setPetAdopt(true);
            dispatch(petSelected(pets));
          }}
        >
          Quiero adoptar!
        </Button>
        <Typography>
          <b>Nombre:</b> {capitalizeFirstLetter(pets.nombre)}
        </Typography>
        <Typography>
          <b> Peso:</b>
          {pets.pesoAproximado}
        </Typography>
        <Typography>
          <b> Color principal</b> {capitalizeFirstLetter(pets.colorPrimario)}
        </Typography>
        <Typography>
          <b> Color secundario: </b>
          {capitalizeFirstLetter(pets.colorSecundario)}
        </Typography>
        <Typography>
          <b> Descripcion:</b> {capitalizeFirstLetter(pets.descripcion)}
        </Typography>
      </div>
    );
  };
  if (selectedImage) {
    return (
      <IonModal
        isOpen={!!selectedImage}
        onDidDismiss={() => setSelectedImage(null)}
      >
        <div style={{ display: "flex", justifyContent: "end" }}>
          <IonIcon
            onClick={() => setSelectedImage(null)}
            size="large"
            icon={arrowBackCircleSharp}
            slot="end"
          ></IonIcon>
        </div>
        <MDBContainer className="petLostCarouselDesc">
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
          <IonButton onClick={() => setPetFound(true)}>
            ¡Quiero adoptar!
          </IonButton>
          <img
            src={
              selectedImageURL && selectedImageURL.startsWith("http")
                ? selectedImageURL
                : `data:image/jpeg;base64,${selectedImageURL}`
            }
            alt="Selected"
          />
        </MDBContainer>
      </IonModal>
    );
  }

  if (petAdopt) {
    return <PrimerContacto open={setPetAdopt} action={"adopt"} />;
  }

  return (
    <div className="card">
      {Array.isArray(allPets) && (
        <Carousel
          value={allPets}
          numVisible={1}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          itemTemplate={petsTemplate}
          showIndicators={false}
        />
      )}
    </div>
  );
};

export default BasicDemo;
