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
  IonIcon,
} from "@ionic/react";
import { Button, Typography } from "@mui/material";
import { usersData } from "../features/dataReducer/dataReducer";
import { useSelector } from "react-redux";
import { Pet } from "../interfaces/types";
import axios from "axios";
import { closeCircle } from "ionicons/icons";

interface ExampleProps {
  open: (value: any) => void;
  action: any;
}
const Example: React.FC<ExampleProps> = ({ open, action }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [send, setSend] = useState(false);
  const selected = useSelector(
    (petSelected: any) => petSelected.counter.petSelected
  );
  const user = useSelector(usersData);
  const objetoFecha = Date.now();
  const nowDate = new Date(objetoFecha);
  let fechaMensaje = nowDate.toLocaleDateString("en-ZA");

  console.log("action", action);

  useEffect(() => {
    switch (action) {
      case "adopt":
        if (send) {
          const sendMsg = () => {
            const msgData = {
              msg: `Hola, Quiero adoptar a ${
                selected!.nombre
              }!, pongamonos en contacto!`,
              emisor: user!.email,
              receptor: selected!.emailMascota,
              date: fechaMensaje,
              nombreEmisor: user?.given_name || "",
              fotoMascota: selected!.fotoMascota,
            };

            // Agregar un retraso antes de enviar el mensaje
            axios
              .post(
                "https://backend.missingpets.art/mensajes/nuevoMensaje",
                msgData
              )
              .then((response) => {
                open(false);
                /*                 setSelectedImage(null);
                 */ setSend(false);
              });
          };
          sendMsg();
          setSend(false);
        }
        setSend(false);
        break;
      case "petFound":
        if (send) {
          const sendMsg = () => {
            const msgData = {
              msg: `Hola, creo que encontre a ${
                selected!.nombre
              }!, pongamonos en contacto!`,
              emisor: user!.email,
              receptor: selected!.emailMascota,
              date: fechaMensaje,
              nombreEmisor: user?.given_name || "",
              fotoMascota: selected!.fotoMascota,
            };

            // Agregar un retraso antes de enviar el mensaje
            axios
              .post(
                "https://backend.missingpets.art/mensajes/nuevoMensaje",
                msgData
              )
              .then((response) => {
                open(false);
                /*                 setSelectedImage(null);
                 */ setSend(false);
              });
          };
          sendMsg();
          setSend(false);
        }
        setSend(false);
        break;
      default:
        break;
    }
  }, [send]);

  return (
    <IonModal isOpen={isOpen}>
      <IonIcon
        style={{ alignSelf: "flex-end" }}
        size="large"
        icon={closeCircle}
        onClick={() => open(false)}
      >
        Close
      </IonIcon>

      <IonContent className="ion-padding modalPrimerContacto">
        <IonNote>
          Cuando el destinatario lo vea se abrira una ventana de chat para que
          puedan comunicarse.
        </IonNote>
        <img
          src={`data:image/jpeg;base64,${selected!.fotoMascota}`}
          alt={selected!.descripcion}
          loading="lazy"
          style={{
            objectFit: "cover",
            borderRadius: "40px",
          }}
        />
{/* 
        <Typography>{selected.nombre}</Typography>
        <Typography>{selected.descripcion}</Typography> */}

        <IonButton onClick={() => setSend(true)}>Enviar</IonButton>
        <IonButton onClick={() => open(false)}> Cancelar</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default Example;
