import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { MensajesService } from "../../services/MsjService";
import { useAuth0 } from "@auth0/auth0-react";
import { Message } from "../../interfaces/types";
import { IonInput, IonItem } from "@ionic/react";

const socket = io("backend.missingpets.art:4000", {
  transports: ["websocket"],
});

interface ExampleProps {
  updateComponent: () => void;
  idReceptor: any;
}

const Example: React.FC<ExampleProps> = ({ updateComponent, idReceptor }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [allMsg, setAllMsg] = useState<Message[]>([]);
  const { user } = useAuth0();
  const getAllMsg = new MensajesService();
  const chatContainerRef = useRef<null | HTMLUListElement>(null);

  useEffect(() => {
    getAllMsg.getMessages(user!.email, idReceptor).then((data) => {
      setAllMsg(data);
    });
  }, [messages]);

  useEffect(() => {
    const receiveMessage = (message: any) => {
      setMessages([message, ...messages]);
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const newMessage: Message = {
      body: message,
      from: "Me",
      emailEmisor: user?.email || "",
      mensaje: message,
      idReceptor: idReceptor,
    };

    setMessage("");
    setMessages([newMessage, ...messages]);
    socket.emit("message", newMessage);
  };

  const backToMessages = () => {
    updateComponent();
  };

  return (
    <div className="divAllMesages">
      <form onSubmit={handleSubmit} className="formChat">
        <h1 className="text-2xl font-bold my-2"></h1>
        <p className="backToMessages" onClick={(e) => updateComponent()}>
          Volver a mensajes
        </p>
        <ul className="chatMsgContainer" ref={chatContainerRef}>
          {allMsg.map((message, index) => (
            <li
              key={index}
              className={`my-2 p-2 table text-sm rounded-md ${
                message.emailEmisor === user!.email
                  ? "bg-sky-70 ml-auto conversationSpan"
                  : "bg-black conversationNotMe"
              }`}
            >
              {message.emailEmisor === user!.email ? (
                <p className="contentChatByMe">
                  <span className="spanName"> {user!.name}:</span>
                  {message.mensaje}
                </p>
              ) : (
                <p> </p>
              )}
              {message.emailEmisor !== user!.email ? (
                <p className="chattingWith">
                  <span className="spanName"> nombre emisario: </span>
                  {message.mensaje}
                </p>
              ) : (
                <p> </p>
              )}
            </li>
          ))}
        </ul>
        <IonItem>
          <input
            name="message"
            type="text"
            placeholder="Escribe un mensaje..."
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue !== null && newValue !== undefined) {
                setMessage(newValue);
              }
            }}
            className="writeAMessage"
            value={message}
          />
        </IonItem>
      </form>
    </div>
  );
};

export default Example;
