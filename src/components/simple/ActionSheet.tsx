import React, { useState, useEffect } from "react";
import { useIonActionSheet } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import {
  formValue,
  isOpen,
  openModal,
  petSelected,
  refreshThis,
} from "../../features/dataReducer/dataReducer";
import axios from "axios";
import { PetServiceWeb } from "../../services/PetServiceWeb";

interface ActionSheetExampleProps {
  header: string; // Cambia 'string' al tipo correcto si el tipo real es diferente
  action: any; // Cambia 'any' al tipo correcto si el tipo real es diferente
  petToDelete: any; // Cambia 'any' al tipo correcto si el tipo real es diferente
  setShowActionSheet: any;
}

const ActionSheetExample: React.FC<ActionSheetExampleProps> = ({
  header,
  action,
  petToDelete,
  setShowActionSheet,
}) => {
  const [result, setResult] = useState();
  const dispatch = useDispatch();
  const handleActionSheet = async (actionType: any) => {
    const uploadNewPet = new PetServiceWeb();

    switch (actionType) {
      case "delete":
        uploadNewPet.deletePet(petToDelete.idMascota).then((data) => {
          dispatch(formValue({} || 10));
          setShowActionSheet(false);
          // dispatch(refreshThis(true));
        });
        break;
      case "adoptPet":
        uploadNewPet.startAdoption(petToDelete.idMascota).then((data) => {
          setShowActionSheet(false);
          dispatch(refreshThis(true));
          console.log("datares", data);
        });
        break;

      case "quitAdoptPet":
        try {
          console.log("editando mascota");
          const result = await uploadNewPet.quitAdoption(petToDelete.idMascota);
          setShowActionSheet(false);
          dispatch(refreshThis(true));
        } catch (error) {
          // Handle error if needed
        }
        break;

      case "stopSearch":
        try {
          console.log("editando mascota");
          const result = await uploadNewPet.stopSearch(petToDelete.idMascota);
          dispatch(refreshThis(true));
          setShowActionSheet(false);
        } catch (error) {
          // Handle error if needed
        }
        break;
      default:
        break;
    }
    // dispatch(refreshThis(!refresh));
  };

  const [present] = useIonActionSheet();

  useEffect(() => {
    present({
      header: header,
      /*       subHeader: "Example subheader",
       */ buttons: [
        {
          text: "Aceptar",
          role: "destructive",
          handler: () => handleActionSheet(action),
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            setShowActionSheet(false);
          },
        },
      ],

      onDidDismiss: (detail: any) => setResult(detail),
    });
  }, []); // El segundo argumento vacío asegura que se ejecute solo una vez al montar

  return true;
};

export default ActionSheetExample;
