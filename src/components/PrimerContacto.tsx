import React, { useState } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonTextarea,
} from "@ionic/react";
import { Button } from "@mui/material";
import { usersData } from "../features/dataReducer/dataReducer";
import { useSelector } from "react-redux";
import { Pet } from "../interfaces/types";
import axios from "axios";

interface ExampleProps {
  open: (value: any) => void;
  idMascotaPerdida: Pet | null; // Agrega esta línea
}
const Example: React.FC<ExampleProps> = ({ open, idMascotaPerdida }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const user = useSelector(usersData);
  const objetoFecha = Date.now();
  const nowDate = new Date(objetoFecha);
  let fechaMensaje = nowDate.toLocaleDateString("en-ZA");

  const sendMsg = () => {
    const msgData = {
      msg: mensaje,
      emisor: user!.email,
      receptor: idMascotaPerdida!.emailMascota,
      date: fechaMensaje,
    };
    axios
      .post("https://backend.missingpets.art/mensajes/nuevoMensaje", msgData)
      .then((response) => {});
  };
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>¡La encontraste!</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => open(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Ponte en contacto con la persona: </p>
        <p>
          Cuando el destinatario lo vea se abrira una ventana de chat para que
          puedan acordar el encuentro.
        </p>
        <IonTextarea
          placeholder="Mensaje:"
          rows={8}
          style={{ backgroundColor: "grey" }}
          onIonChange={(e) => setMensaje(e.detail.value || "")}
        ></IonTextarea>
        <Button onClick={() => sendMsg()}>Enviar</Button>
        <Button>Cancelar</Button>
      </IonContent>
    </IonModal>
  );
};

export default Example;
