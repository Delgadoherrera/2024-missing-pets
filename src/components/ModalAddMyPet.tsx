import React, { useState, useEffect } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonItem,
  IonImg,
  IonBreadcrumb,
} from "@ionic/react";
import MapFindMyPet from "./MapFindMyPet";
import { useSelector, useDispatch } from "react-redux";
import { imageValue, selectCount } from "../features/dataReducer/dataReducer";
import { camera, close, closeCircle } from "ionicons/icons";
import { Camera, CameraResultType } from "@capacitor/camera";
import FormAddMyPet from "./forms/FormAddMyPet";
import { Typography } from "@mui/material";
import { Button } from "primereact/button";

const ModalEditPet = ({ setAddPet }: { setAddPet: (value: any) => void }) => {
  const dispatch = useDispatch();
  const value = useSelector(selectCount);
  const [isOpen, setIsOpen] = useState(true);

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });
    dispatch(imageValue(image || 10));
  };

  return (
    <IonModal isOpen={isOpen} className="modal-container">
      <IonIcon
        onClick={() => {
          setIsOpen(false);
          setAddPet(false);
          dispatch(imageValue("" || 10));
        }}
        icon={closeCircle}
        size="large"
        className="close-icon"
      ></IonIcon>
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
      <IonBreadcrumb className="imageAddIcon" onClick={() => takePicture()}>
        <IonIcon icon={camera} size="large" />
        Adjuntar imagen
      </IonBreadcrumb>
      <FormAddMyPet setAddPet={setAddPet} />
    </IonModal>
  );
};

export default ModalEditPet;
