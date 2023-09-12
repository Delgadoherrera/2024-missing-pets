import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useEffect, useState, useRef } from "react";
import { Redirect, Route } from "react-router";
import Tab1 from "../pages/Tab1";
import Tab2 from "../pages/Tab2";
import Tab3 from "../pages/Tab3";
import { ellipse, square, triangle } from "ionicons/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { PetServiceWeb } from "../services/PetServiceWeb";
import dogIcon from "../assets/SVG/8542014_dog_puppy_pet_icon.svg"; // Importa y convierte el SVG en un componente React
import catIcon from "../assets/SVG/8541576_cat_pet_animal_icon.svg";
import dogFill from "../assets/SVG/9023321_dog_fill_icon.svg";
import msg from "../assets/SVG/4230512_chat_communication_message_icon.svg";

import {
  userPets,
  userData,
  petSelected,
  formValue,
  petLost,
  refresh,
  refreshThis,
  positionValue,
  adoptPets,
} from "../features/dataReducer/dataReducer";
import axios from "axios";
import Chat from "../pages/Chat";
const RoutingComp: React.FC = () => {
  const swiperRef = useRef(null);
  const [userPet, setUserPet] = useState([]);
  const [pets, setPets] = useState([]);
  const { user }: any = useAuth0();
  const [petDistance, setPetDistance] = useState(4);
  const [adoptDistance, setAdoptDistance] = useState(4);
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });
  const getMyPets = new PetServiceWeb();
  const dispatch = useDispatch();
  const doRefresh = useSelector(refresh);

  console.log("petDistance", petDistance);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        await axios
          .get("https://backend.missingpets.art/mascotas/mascotasEnAdopcion", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
              distanceSlider: adoptDistance,
            },
          })
          .then((res) => {
            dispatch(adoptPets(res.data.data || {}));
            dispatch(
              positionValue({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
              })
            );
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, [adoptDistance, dispatch, doRefresh]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        await axios
          .get("https://backend.missingpets.art/mascotas/mascotasPerdidas", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
              distanceSlider: petDistance,
            },
          })
          .then((res) => {
            setPets(res.data.data);
            dispatch(petLost(res.data.data || {}));
            dispatch(
              positionValue({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
              })
            );
          });
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, [petDistance, dispatch, doRefresh]);

  useEffect(() => {
    if (!doRefresh) {
      console.log("BUSCANDO DATA");
      dispatch(userData(user || {}));
      getMyPets.getMyPets(user.email).then((data) => {
        setUserPet(data);
        dispatch(userPets(data || []));
      });
    }

    if (doRefresh) {
      getMyPets.getMyPets(user.email).then((data) => {
        setUserPet(data);
        dispatch(userPets(data || []));
      });
      dispatch(refreshThis(false));
    }
  }, [doRefresh]);

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 setPetDistance={setPetDistance} />
          </Route>
          <Route exact path="/tab2">
            <Tab2 setPetDistance={setAdoptDistance} />
          </Route>
          <Route exact path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/chat">
            <Chat />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={catIcon} />
            <IonLabel>Perdidas</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={dogIcon} size="xl" />
            <IonLabel>En adopción</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={dogFill} />
            <IonLabel>Mis mascotas</IonLabel>
          </IonTabButton>
          <IonTabButton tab="chat" href="/chat">
            <IonIcon aria-hidden="true" icon={msg} />
            <IonLabel>Mensajes</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default RoutingComp;
