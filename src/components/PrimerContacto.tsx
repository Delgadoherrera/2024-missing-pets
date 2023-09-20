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
  IonNote,
  IonItem,
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
  console.log("IDMASCOTAPERDIDA", idMascotaPerdida);

  useEffect(() => {
    if (send) {
      const sendMsg = () => {
        const msgData = {
          msg: mensaje,
          emisor: user!.email,
          receptor: idMascotaPerdida!.emailMascota,
          date: fechaMensaje,
          nombreEmisor: user?.given_name || "",
          fotoMascota: idMascotaPerdida!.fotoMascota,
        };

        // Agregar un retraso antes de enviar el mensaje
        axios
          .post(
            "https://backend.missingpets.art/mensajes/nuevoMensaje",
            msgData
          )
          .then((response) => {
            open(false);
            setSelectedImage(null);
            setSend(false);
          });
      };
      sendMsg();
      setSend(false);
    }
    setSend(false);
  }, [send]);

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
        <IonNote>
          Cuando el destinatario lo vea se abrira una ventana de chat para que
          puedan acordar el encuentro.
        </IonNote>
        <IonItem>
          <img
            src={`data:image/jpeg;base64,${idMascotaPerdida!.fotoMascota}`}
            alt={idMascotaPerdida!.descripcion}
            loading="lazy"
            style={{
              objectFit: "cover",
              width: "150px",
              height: "150px",
              borderRadius: "40px",
              margin: "10px",
            }}
          />

          <Button onClick={() => setSend(true)}>Enviar</Button>
          <Button onClick={() => open(false)}> Cancelar</Button>
        </IonItem>
      </IonContent>
    </IonModal>
  );
};

export default Example;
