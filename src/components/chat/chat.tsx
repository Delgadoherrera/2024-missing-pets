import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { MensajesService } from "../../services/MsjService";
import { useAuth0 } from "@auth0/auth0-react";
import { Message } from "../../interfaces/types";
import {
  IonBreadcrumb,
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonText,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { Button, Input } from "@mui/material";

const socket = io("https://backend.missingpets.art");
interface ChatWindowProps {
  updateComponent: () => void;
  idReceptor: any;
  nombreEmisario: any;
  fotoMascota: any;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  updateComponent,
  idReceptor,
  nombreEmisario,
  fotoMascota,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [allMsg, setAllMsg] = useState<Message[]>([]);
  const { user } = useAuth0();
  const chatContainerRef = useRef<HTMLIonListElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const getAllMsg = new MensajesService();
  useEffect(() => {
    getAllMsg.getMessages(user!.email, idReceptor).then((data) => {
      setAllMsg(data);
    });
  }, [messages]);
  useEffect(() => {
    if (chatContainerRef.current && lastMessageRef.current) {
      chatContainerRef.current.scrollTop = lastMessageRef.current.offsetTop;
    }
  }, [messages]);
  useEffect(() => {
    // Desplazar al último mensaje cuando se cargan los mensajes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth", // Opcionalmente puedes usar 'auto' en lugar de 'smooth' para un desplazamiento instantáneo
      });
    }
  }, [allMsg]);
  useEffect(() => {
    const receiveMessage = (message: any) => {

      // Agrega el mensaje a allMsg
      setAllMsg((prevAllMsg) => [message, ...prevAllMsg]);

      // Verifica si el mensaje recibido es del usuario actual (para evitar duplicados)
      if (message.emailEmisor !== user?.email) {
        setMessages((prevMessages) => [message, ...prevMessages]);
      }
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (message.length === 0) return;
    const newMessage: Message = {
      body: message,
      from: "Me",
      emailEmisor: user?.email || "",
      mensaje: message,
      idReceptor: idReceptor,
      nombreEmisor: user?.given_name || "",
      fotoMascota: "",
    };

    try {
      // Primero, actualiza el estado de los mensajes
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      setMessage("");

      // Luego, emite el mensaje al servidor
      socket.emit("message", newMessage);

      // Agrega un timeout antes de desplazarte al último mensaje
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      }, 500); // Puedes ajustar el valor del timeout según tus preferencias
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };
  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1 className="text-2xl font-bold my-2"></h1>
        <p className="backToMessages" onClick={(e) => updateComponent()}>
          <IonBreadcrumb>
            <IonIcon size="large" icon={arrowBack}></IonIcon>

            <IonNote>Conversando con {nombreEmisario}</IonNote>
          </IonBreadcrumb>
        </p>
      </div>
      <IonList className="chatMsgContainer" ref={chatContainerRef}>
        <img src={`data:image/jpeg;base64,${fotoMascota}`}></img>
        {allMsg
          .slice()
          .reverse()
          .map((message, index) => (
            <div
              key={index}
              ref={(el) => {
                if (index === 0) lastMessageRef.current = el;
              }}
              className={`message-container ${
                message.emailEmisor === user!.email ? "by-me" : "not-by-me"
              }`}
            >
              {message.emailEmisor === user!.email ? message.mensaje : null}
              {message.emailEmisor !== user!.email ? message.mensaje : null}
            </div>
          ))}
      </IonList>
      <div className="input-container">
        <Input
          name="message"
          type="text"
          placeholder="Escribe un mensaje..."
          onChange={handleMessage}
          value={message}
          autoComplete="off"
          className="writeAMessage"
        />
        <Button className="buttonSendMsg" onClick={handleSubmit}>
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default ChatWindow;
