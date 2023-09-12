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
} from "@ionic/react";
import MapFindMyPet from "./MapFindMyPet";
import { useSelector, useDispatch } from "react-redux";
import { imageValue, selectCount } from "../features/dataReducer/dataReducer";
import { camera } from "ionicons/icons";
import { Camera, CameraResultType } from "@capacitor/camera";
import FormAddMyPet from "./forms/FormAddMyPet";

const ModalEditPet = ({ setAddPet }: { setAddPet: (value: any) => void }) => {
  const dispatch = useDispatch();
  const value = useSelector(selectCount);
  const [isOpen, setIsOpen] = useState(true);

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
