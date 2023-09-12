import React, { useState, useEffect } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonNote,
} from "@ionic/react";
import MapFindMyPet from "../components/MapFindMyPet";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, Typography } from "@mui/material";
import { Pet } from "../interfaces/types";
import FormEditPet from "./forms/FormEditPet";
import {
  userPet,
  petSelected,
  openModal,
  isOpen,
  counterPetSelected,
  newMarkerValue,
  refreshThis,
  mapOpen,
} from "../features/dataReducer/dataReducer";
import { PetServiceWeb } from "../services/PetServiceWeb";
/* import Toast from "./Toast";
 */ import { MDBContainer } from "mdb-react-ui-kit";
interface ActionSheetExampleProps {
  data: Pet | null;
  setShowSearchMyPet: any;
}
const ModalFindMyPet: React.FC<ActionSheetExampleProps> = ({
  data,
  setShowSearchMyPet,
}) => {
  const [searchingPet, setSearchingPet] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const pet = useSelector(
    (petSelected: any) => petSelected.counter.petSelected
  );
  const searchThisPet = new PetServiceWeb();
  const positionLost: any = useSelector(newMarkerValue);
  const coords: any = positionLost.payload.counter.newMarkerValue;
  const searchPet = () => {
    if (coords[0] === undefined || coords[1] === undefined) {
      return alert(
        "Porfavor indique con el marcador donde se ha perdido la mascota."
      );
    }
    searchThisPet.searchMyPet(pet.idMascota, coords).then((data) => {
      setSearchingPet(true);
      setShowSearchMyPet(false);
      dispatch(refreshThis(true));
    });
    setShowToast(true);
  };
  return (
    <>
      <MapFindMyPet />

      {/*       {showToast === true ? (
        <Toast
          setShowToast={setShowToast}
          message={`Estamos buscando a ${pet.nombre}`}
        />
      ) : null} */}
      <IonContent style={{ display: "flex" }} className="FindMyPetContent">
        <IonToolbar>
          <IonTitle>¿Donde buscamos?</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                dispatch(mapOpen(false));
                dispatch(isOpen(false));
                setShowSearchMyPet(false);
              }}
            >
              X
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonNote>Manten apretado el marcador para moverlo</IonNote>

        <MDBContainer
          fluid
          style={{
            margin: 2,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <img
            alt={pet.idMascota}
            src={`data:image/jpeg;base64,${pet.fotoMascota}`}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          ></img>
          <Button onClick={() => searchPet()}>Buscar a {pet.nombre}</Button>
        </MDBContainer>
      </IonContent>
    </>
  );
};

export default ModalFindMyPet;
