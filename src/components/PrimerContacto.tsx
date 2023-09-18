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
  setSelectedImage: any;
}
const Example: React.FC<ExampleProps> = ({
  open,
  idMascotaPerdida,
  setSelectedImage,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [send, setSend] = useState(false);

  const user = useSelector(usersData);
  const objetoFecha = Date.now();
  const nowDate = new Date(objetoFecha);
  let fechaMensaje = nowDate.toLocaleDateString("en-ZA");

  useEffect(() => {
    if (send) {
      const sendMsg = () => {
        const msgData = {
          msg: mensaje,
          emisor: user!.email,
          receptor: idMascotaPerdida!.emailMascota,
          date: fechaMensaje,
          nombreEmisor: user?.given_name || "",
        };

        // Agregar un retraso antes de enviar el mensaje
        setTimeout(() => {
          axios
            .post(
              "https://backend.missingpets.art/mensajes/nuevoMensaje",
              msgData
            )
            .then((response) => {
              open(false);
              setSelectedImage(null);
            });
        }, 100); // Puedes ajustar el valor de tiempo si es necesario
      };
      sendMsg();
      setSend(false);
    }
  }, [mensaje]);

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
        <Button onClick={() => setSend(true)}>Enviar</Button>
        <Button>Cancelar</Button>
      </IonContent>
    </IonModal>
  );
};

export default Example;
