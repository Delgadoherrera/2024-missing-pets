import React from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";

import FormEditPet from "../components/forms/FormEditPet";

import {
  userPet,
  petSelected,
  openModal,
  isOpen,
} from "../features/dataReducer/dataReducer";
import { Pet } from "../interfaces/types";
interface FrontCommandProps {
  pet: Pet | null;
  setEditPet: any;
  handleUpdateComps: any;
}
const ModalEditPet: React.FC<FrontCommandProps> = ({
  pet,
  setEditPet,
  handleUpdateComps,
}) => {
  console.log("pet", pet, "setEditPet", setEditPet);
  const This = useSelector((userPet: any) => userPet.counter.dataUserPets);
  return (
    <IonModal isOpen={true}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar mascota</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setEditPet(false)}>X</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <FormEditPet
          setEditPet={setEditPet}
          pet={pet}
          handleUpdateComps={handleUpdateComps}
        />
      </IonContent>
    </IonModal>
  );
};

export default ModalEditPet;
