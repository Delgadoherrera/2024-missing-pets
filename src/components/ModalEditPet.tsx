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

interface ModalEditPetProps {
  // Add your own props if needed...
}

const ModalEditPet = ({ setEditPet }: { setEditPet: (value: any) => void }) => {
  const isModalOpen = useSelector(isOpen); // Obtén el valor del estado isOpened
  const open = isModalOpen.payload; // Acceder al valor booleano dentro del objeto de acción
  const dispatch = useDispatch();

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
        <FormEditPet setEditPet={setEditPet} />
      </IonContent>
    </IonModal>
  );
};

export default ModalEditPet;
