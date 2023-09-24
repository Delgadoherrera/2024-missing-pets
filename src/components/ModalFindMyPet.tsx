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
  IonIcon,
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
  position,
} from "../features/dataReducer/dataReducer";
import { PetServiceWeb } from "../services/PetServiceWeb";
/* import Toast from "./Toast";
 */ import { MDBContainer } from "mdb-react-ui-kit";
import { closeCircle } from "ionicons/icons";
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
  const [place, setPlace] = useState("");
  const dispatch = useDispatch();
  const pet = useSelector(
    (petSelected: any) => petSelected.counter.petSelected
  );
  const searchThisPet = new PetServiceWeb();
  const coords: any = useSelector(
    (newMarkerValue: any) => newMarkerValue.counter.newMarkerValue
  );

  useEffect(() => {
    console.log("place", place);
  }, [place]);

  const searchPet = () => {};

  const apiKey = "AIzaSyAWhXxfT0fS3H6QYCOLGSE-QHzeKVWG1Y0";
  const lat = coords[0];
  const lng = coords[1];
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  const formatPlace = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          // Extraer información de la ubicación
          const address = data.results[0].formatted_address;
          console.log("Formatted Address:", address);
          const placeFormat = {
            lat:coords[0],
            lng:coords[1],
            placeFormat:address
          }
          if (coords[0] === undefined || coords[1] === undefined) {
            return alert(
              "Porfavor indique con el marcador donde se ha perdido la mascota."
            );
          }

          searchThisPet.searchMyPet(pet.idMascota, placeFormat).then((data) => {
            setSearchingPet(true);
            setShowSearchMyPet(false);
            dispatch(refreshThis(true));
          });
          setShowToast(true);
        } else {
          console.error("La solicitud no fue exitosa.");
        }
      })
      .catch((error) => {
        console.error("Error al buscar la dirección:", error);
      });
  };
  return (
    <>
      <IonContent style={{ display: "flex" }} className="FindMyPetContent">
        <IonToolbar>
          <IonTitle>¿Donde buscamos?</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                dispatch(mapOpen(false));
                setShowSearchMyPet(false);
              }}
            >
              <IonIcon size="large" icon={closeCircle}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonNote>Manten apretado el marcador para moverlo</IonNote>
        <MapFindMyPet />
        <MDBContainer
          fluid
          style={{
            margin: 2,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <img
            alt={pet.idMascota}
            src={`data:image/jpeg;base64,${pet.fotoMascota}`}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          ></img>
          <Button variant="contained" onClick={() => formatPlace()}>
            Buscar a {pet.nombre}
          </Button>
        </MDBContainer>
      </IonContent>
    </>
  );
};

export default ModalFindMyPet;
