import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { Avatar, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { petSelected } from "../../features/dataReducer/dataReducer";
import { Pet } from "../../interfaces/types";
import FolderIcon from "@mui/icons-material/Folder";

import {
  IonAlert,
  IonBackButton,
  IonBadge,
  IonBreadcrumb,
  IonChip,
  IonIcon,
  IonNote,
} from "@ionic/react";
import gpsIcon from "../../assets/SVG/1891030_blue_direction_gps_location_map_icon.svg";
import adoptIcon from "../../assets/SVG/10559959_pet_sheltering_home_donation_animal_icon.svg";
import gpsFront from "../../assets/SVG/gpsFront.svg"; // Importa y convierte el SVG en un componente React

interface FrontCommandProps {
  pet: Pet;
  activeFrontMap: any;
}

const FrontCommand: React.FC<FrontCommandProps> = ({ pet, activeFrontMap }) => {
  return (
    <MDBContainer className="frontCommandCard">
      <div className="commandContainerI">
        <IonBadge>
          {pet.nombre ? pet.nombre.slice(0, 6).toUpperCase() : ""}
          {pet.nombre.length > 6 ? <>...</> : null}
        </IonBadge>
      </div>
      <div className="commandContainerII">
        {pet.status === 4 ? (
          <IonBreadcrumb> En adopción</IonBreadcrumb>
        ) : pet.status === 1 ? (
          <IonBreadcrumb> Buscando</IonBreadcrumb>
        ) : null}
      </div>
      <div className="commandContainerIII">
        <img
          className="userPetsPhoto"
          src={
            pet.fotoMascota !== ""
              ? `data:image/jpeg;base64,${pet.fotoMascota}`
              : ""
          }
        ></img>
      </div>
    </MDBContainer>
  );
};

export default FrontCommand;
