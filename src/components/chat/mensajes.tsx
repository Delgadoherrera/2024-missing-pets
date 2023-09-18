import { MensajesService } from "../../services/MsjService";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import MensajesArea from "../chat/chat";
import { useAuth0 } from "@auth0/auth0-react";
import { refreshThis, refresh } from "../../features/dataReducer/dataReducer";
import { useSelector } from "react-redux";
import { IonIcon, IonItem } from "@ionic/react";
import Avatar from "@mui/material/Avatar";
import { MDBContainer } from "mdb-react-ui-kit";
import { mail } from "ionicons/icons";

const getAllMsg = new MensajesService();

export default function Mensajes() {
  const [allMsg, setAllMsg] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState<string[]>([]); // Proporcionar el tipo string[] para filteredMessages
  const [displayMessage, setDisplayMessage] = useState(false);
  const [emisario, setEmisario] = useState(0);
  const [nombreEmisario, setNombreEmisario] = useState("");
  const doRefresh = useSelector(refresh);
  const { user } = useAuth0();
  const getAllMsg = new MensajesService();
  const emailToNameMap: { [key: string]: string } = {};
  if (allMsg.length > 0) {
    allMsg.forEach((elemento: any) => {
      if (!emailToNameMap[elemento.emailEmisor]) {
        emailToNameMap[elemento.emailEmisor] = elemento.nombreEmisor;
      }
    });
  }

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
  }
  useEffect(() => {
    setFilteredMessages(idUnicos);
  }, [allMsg]);
  console.log("idUnicos", idUnicos);
  const clicOnMessages = (e: any) => {
    setDisplayMessage(!displayMessage);
    setEmisario(e.currentTarget.value);
    setNombreEmisario(e.currentTarget.ariaLabel);
    const nombreEmisor = emailToNameMap[e.currentTarget.value] || ""; // Si no se encuentra el nombre, asigna una cadena vacía
    setNombreEmisario(nombreEmisor);
  };
  const updateComponent = () => {
    setDisplayMessage(!displayMessage);
  };

  return (
    <div className="divMsg">
      {filteredMessages.length === 0 ? (
        <p className="contactoMensajesInfo">No tienes mensajes.</p>
      ) : null}

      {displayMessage === true ? (
        <MensajesArea
          updateComponent={updateComponent}
          idReceptor={emisario}
          nombreEmisario={nombreEmisario}
        />
      ) : (
        <p></p>
      )}
      {!displayMessage && filteredMessages.length > 0 ? (
        filteredMessages.map((one, index) => {
          return (
            <IonItem>
              <MDBContainer className="frontCommandCard">
                <Button
                  key={index}
                  type="button"
                  aria-label={one}
                  value={idUnicos[index]}
                  onClick={(e) => {
                    clicOnMessages(e);
                  }}
                >
                  {emailToNameMap[one] || one}
                </Button>
                <IonIcon size="large" icon={mail}></IonIcon>

                <Avatar alt="Remy Sharp" src={""} />
              </MDBContainer>
              
            </IonItem>
          );
        })
      ) : (
        <p> </p>
      )}
    </div>
  );
}
