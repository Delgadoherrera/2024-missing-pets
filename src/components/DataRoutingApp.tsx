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
import {
  userPets,
  userData,
  petSelected,
  formValue,
  petLost,
  refresh,
  refreshThis,
  positionValue,
} from "../features/dataReducer/dataReducer";
import axios from "axios";
const RoutingComp: React.FC = () => {
  const swiperRef = useRef(null);
  const [userPet, setUserPet] = useState([]);
  const [pets, setPets] = useState([]);
  const { user }: any = useAuth0();
  const [petDistance, setPetDistance] = useState(4);
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });
  const getMyPets = new PetServiceWeb();
  const dispatch = useDispatch();
  const doRefresh = useSelector(refresh);
  const [refreshMyPets, setRefreshMyPet] = useState(false);

  const props = {
    pets,
    user,
    state,
    userPet,
  };

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
            console.log("(res.data.data);", res.data.data);
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
  }, [petDistance, dispatch]);

  useEffect(() => {
    if (!doRefresh) {
      console.log("BUSCANDO DATA");
      dispatch(userData(user || {}));
      getMyPets.getMyPets(user.email).then((data) => {
        console.log("dataresponse", data);
        setUserPet(data);
        dispatch(userPets(data || []));
        // dispatch(petSelected(user || {}));
        // dispatch(formValue(user || {}));
      });
    }

    if (doRefresh) {
      getMyPets.getMyPets(user.email).then((data) => {
        console.log("dataresponse", data);
        setUserPet(data);
        dispatch(userPets(data || []));
        // dispatch(petSelected(user || {}));
        // dispatch(formValue(user || {}));
      });
      dispatch(refreshThis(false));
    }

    // console.log("REBUSCANDO MASCOTAS");
  }, [doRefresh]);

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 setPetDistance={setPetDistance} />
          </Route>
          <Route exact path="/tab2">
            <Tab2 setPetDistance={setPetDistance} />
          </Route>
          <Route exact path="/tab3">
            <Tab3 data={props} />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Perdidas</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>En adopción</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Mis mascotas</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default RoutingComp;
