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
  IonIcon,
  IonItem,
  IonImg,
} from "@ionic/react";
import MapFindMyPet from "./MapFindMyPet";
import { useSelector, useDispatch } from "react-redux";
import {
  userPet,
  petSelected,
  openModal,
  isOpen,
  counterPetSelected,
  newMarkerValue,
  imageValue,
  selectCount,
  refreshThis,
  refresh,
} from "../features/dataReducer/dataReducer";
import { PetServiceWeb } from "../services/PetServiceWeb";
import Toast from "./Toast";
import { camera } from "ionicons/icons";
import { Camera, CameraResultType } from "@capacitor/camera";
import FormAddMyPet from "./forms/FormAddMyPet";

interface ModalEditPetProps {
  /*   setShowedit: (value: boolean) => void;
  pet: object;
  showEdit: boolean; */
  // Other props...
}
interface YourStateType {
  // Define the structure of your Redux state here
  setAddPet: {
    setAddPet: boolean;
    // Other properties...
  };
  // Other parts of your state...
}
const ModalEditPet = ({ setAddPet }: { setAddPet: (value: any) => void }) => {
  const [searchingPet, setSearchingPet] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const pet = useSelector(counterPetSelected).petSelected;
  const searchThisPet = new PetServiceWeb();
  const positionLost: any = useSelector(newMarkerValue);
  const value = useSelector(selectCount);
  const doRefresh = useSelector(refresh);
  const [isOpen, setIsOpen] = useState(true);

  const coords: any = positionLost.payload.counter.newMarkerValue;

  console.log("addPetaddPetaddPet", open);

  const searchPet = () => {
    dispatch(refreshThis(true));

    if (coords[0] === undefined || coords[1] === undefined) {
      return alert(
        "Porfavor indique con el marcador donde se ha perdido la mascota."
      );
    }
    searchThisPet.searchMyPet(pet.idMascota, coords).then((data) => {
      setSearchingPet(true);
      setIsOpen(false);
    });
    setShowToast(true);
  };

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });
    dispatch(imageValue(image || 10));
  };

  return (
    <>
      <IonModal isOpen={isOpen}>
        <IonContent>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Agrega a tu mascota</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => {
                    setIsOpen(false);
                    setAddPet(false);
                  }}
                >
                  X
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          {value ? (
            value.length > 1 ? (
              <IonImg
                className="imageCard"
                src={`data:image/jpeg;base64,${value}`}
                style={{
                  width: "100vw",
                  height: "15vh",
                  objectFit: "contain",
                  marginTop: "2%",
                  zoom: "100%",
                }}
              />
            ) : null
          ) : null}

          <IonItem>
            <IonIcon icon={camera} onClick={() => takePicture()} />
          </IonItem>
          <FormAddMyPet setAddPet={setAddPet} />
        </IonContent>
      </IonModal>
    </>
  );
};

export default ModalEditPet;
