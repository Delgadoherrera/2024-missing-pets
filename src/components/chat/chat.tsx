import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { MensajesService } from "../../services/MsjService";
import { useAuth0 } from "@auth0/auth0-react";
import { Message } from "../../interfaces/types";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonList,
} from "@ionic/react";

const socket = io("backend.missingpets.art:4000", {
  transports: ["websocket"],
});

interface ChatWindowProps {
  updateComponent: () => void;
  idReceptor: any;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  updateComponent,
  idReceptor,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [allMsg, setAllMsg] = useState<Message[]>([]);
  const { user } = useAuth0();
  const chatContainerRef = useRef<HTMLIonListElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const getAllMsg = new MensajesService();

  useEffect(() => {
    if (chatContainerRef.current && lastMessageRef.current) {
      chatContainerRef.current.scrollTop = lastMessageRef.current.offsetTop;
    }
  }, [messages]);
  useEffect(() => {
    getAllMsg.getMessages(user!.email, idReceptor).then((data) => {
      setAllMsg(data);
    });
  }, [messages]);
  useEffect(() => {
    const receiveMessage = (message: any) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    };

    socket.on("message", (receiveMessage) => {
      try {
        // Procesar y enviar el mensaje
      } catch (error) {
        console.error("Error al procesar el mensaje:", error);
      }
    });

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
    };

    try {
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      setMessage("");

      socket.emit("message", newMessage);
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
          Volver a mensajes
        </p>
      </div>
      <IonList className="chatMsgContainer" ref={chatContainerRef}>
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
              <p className="message-text">
                {message.emailEmisor === user!.email ? (
                  <span className="spanName">{user!.name}:</span>
                ) : (
                  <span className="spanName">nombre emisario:</span>
                )}
                {message.mensaje}
              </p>
            </div>
          ))}
      </IonList>
      <div className="input-container">
        <IonItem>
          <input
            name="message"
            type="text"
            placeholder="Escribe un mensaje..."
            onChange={handleMessage}
            value={message}
            autoComplete="off"
            className="writeAMessage"
          />
          <IonButton onClick={handleSubmit}>Enviar</IonButton>
        </IonItem>
      </div>
    </div>
  );
};

export default ChatWindow;
