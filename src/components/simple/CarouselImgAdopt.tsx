import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Carousel, CarouselResponsiveOption } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { Typography } from "@mui/material";

export default function BasicDemo(pets: any) {
  const [allPets, setAllPets] = useState([]);
  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "991px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
  useEffect(() => {
    setAllPets(pets.pets);
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
          />
        </div>
        <Button>Quiero adoptar!</Button>
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

  return (
    <div className="card">
      <Carousel
        value={allPets}
        numVisible={1}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        itemTemplate={petsTemplate}
        showIndicators={false}
      />
    </div>
  );
}
