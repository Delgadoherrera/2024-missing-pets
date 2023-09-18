import { MensajesService } from "../../services/MsjService";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import MensajesArea from "../chat/chat";
import { useAuth0 } from "@auth0/auth0-react";
import { refreshThis, refresh } from "../../features/dataReducer/dataReducer";
import { useSelector } from "react-redux";

const getAllMsg = new MensajesService();

export default function Mensajes() {
  const [allMsg, setAllMsg] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState<string[]>([]); // Proporcionar el tipo string[] para filteredMessages
  const [displayMessage, setDisplayMessage] = useState(false);
  const [emisario, setEmisario] = useState(0);
  const [inbox, setInbox] = useState<{ [key: string]: any }>({}); // Proporcionar el tipo adecuado para inbox
  const [nombreEmisario, setNombreEmisario] = useState("");
  const doRefresh = useSelector(refresh);
  const { user } = useAuth0();
  console.log("refreshThis", doRefresh);

  const getAllMsg = new MensajesService();

  useEffect(() => {
    getAllMsg.getAllMyMsg(user!.email).then((data) => {
      setAllMsg(data);
    });
  }, [doRefresh]);
  let letrasUnicas: string[] = [];
  let idUnicos: string[] = [];

  if (allMsg.length > 0) {
    allMsg.forEach((elemento: any) => {
      if (!letrasUnicas.includes(elemento.emailReceptor)) {
        letrasUnicas.push(elemento.emailReceptor);
      }
    });
    allMsg.forEach((elemento: any) => {
      if (!idUnicos.includes(elemento.emailEmisor)) {
        idUnicos.push(elemento.emailEmisor);
      }
    });
    let hash: { [key: string]: boolean } = {};
    let filteredMsg: any = allMsg.filter(function (current: any) {
      let exists: any = !hash[current.emailReceptor];
      hash[current.emailEmisor] = false;
      return exists;
    });
  }
  useEffect(() => {
    setFilteredMessages(idUnicos);
  }, [allMsg]);

  const clicOnMessages = (e: any) => {
    setDisplayMessage(!displayMessage);
    setEmisario(e.currentTarget.value);
    setNombreEmisario(e.currentTarget.ariaLabel);
  };
  const updateComponent = () => {
    setDisplayMessage(!displayMessage);
  };
  console.log("emisario", emisario);

  return (
    <div className="divMsg">
      {filteredMessages.length === 0 ? (
        <p className="contactoMensajesInfo">No tienes mensajes.</p>
      ) : null}

      {displayMessage === true ? (
        <MensajesArea
          updateComponent={updateComponent}
          idReceptor={emisario}
          nombreEmisario={idUnicos}
        />
      ) : (
        <p></p>
      )}
      {!displayMessage && filteredMessages.length > 0 ? (
        filteredMessages.map((one, index) => {
          return (
            <Button
              key={index}
              type="button"
              label={`${one}`}
              icon="pi pi-users"
              className="mensajesButton"
              badgeClassName="mensajesButton"
              aria-label={one}
              value={idUnicos[index]}
              onClick={(e) => {
                clicOnMessages(e);
              }}
            />
          );
        })
      ) : (
        <p> </p>
      )}
    </div>
  );
}
