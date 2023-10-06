import React, { useState, useEffect } from "react";
import { useIonActionSheet } from "@ionic/react";
import { useDispatch } from "react-redux";
import { formValue, refreshThis } from "../../features/dataReducer/dataReducer";
import { PetServiceWeb } from "../../services/PetServiceWeb";
import { MensajesService } from "../../services/MsjService";

interface ActionSheetExampleProps {
  header: string; // Cambia 'string' al tipo correcto si el tipo real es diferente
  action: any; // Cambia 'any' al tipo correcto si el tipo real es diferente
  petToDelete: any; // Cambia 'any' al tipo correcto si el tipo real es diferente
  setShowActionSheet: any;
  cancelAction: any;
}

const ActionSheetExample: React.FC<ActionSheetExampleProps> = ({
  header,
  action,
  petToDelete,
  setShowActionSheet,
  cancelAction,
}) => {
  const [result, setResult] = useState();
  const dispatch = useDispatch();
  const handleActionSheet = async (actionType: any) => {
    const uploadNewPet = new PetServiceWeb();
    const msgService = new MensajesService();

    switch (actionType) {
      case "delete":
        uploadNewPet.deletePet(petToDelete.idMascota).then((data) => {
          dispatch(formValue({} || 10));
          setShowActionSheet(false);
          dispatch(refreshThis(true));
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
            cancelAction(false);
          },
        },
      ],

      onDidDismiss: (detail: any) => setResult(detail),
    });
  }, []); // El segundo argumento vacío asegura que se ejecute solo una vez al montar

  return true;
};

export default ActionSheetExample;
