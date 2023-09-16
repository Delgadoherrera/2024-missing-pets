import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { petSelected } from "../../features/dataReducer/dataReducer";
import { Pet } from "../../interfaces/types";
import {
  IonAlert,
  IonBackButton,
  IonBadge,
  IonChip,
  IonIcon,
  IonNote,
} from "@ionic/react";
import gpsIcon from "../../assets/SVG/1891030_blue_direction_gps_location_map_icon.svg";
import adoptIcon from "../../assets/SVG/10559959_pet_sheltering_home_donation_animal_icon.svg";

interface FrontCommandProps {
  pet: Pet;
  activeFrontMap: any;
}

const FrontCommand: React.FC<FrontCommandProps> = ({ pet, activeFrontMap }) => {
  return (
    <MDBContainer className="frontCommandCard">
      <div className="commandContainerI">
        <IonBadge>
          {pet.nombre ? pet.nombre.slice(0, 3).toUpperCase() : ""}...
        </IonBadge>
      </div>
      <div className="commandContainerII">
        {pet.status === 4 ? (
          <Button> En adopcion...</Button>
        ) : pet.status === 1 ? (
          <Button> Buscando...</Button>
        ) : null}
      </div>
      <div className="commandContainerIII">
        <Button>
          {pet.status === 1 && (
            <IonIcon
              aria-hidden="true"
              icon={gpsIcon}
              size="large"
              onClick={() => activeFrontMap(pet)}
            />
          )}
          {pet.status === 4 && (
            <IonIcon aria-hidden="true" icon={adoptIcon} size="large" />
          )}
        </Button>
      </div>
    </MDBContainer>
  );
};

export default FrontCommand;
