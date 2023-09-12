import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import AppBar from "../components/simple/AppBar";
import Mensajes from "../components/chat/mensajes";
const Chat = (data: any) => {
  return (
    <IonPage>
      <AppBar />
      <Mensajes></Mensajes>
    </IonPage>
  );
};

export default Chat;
