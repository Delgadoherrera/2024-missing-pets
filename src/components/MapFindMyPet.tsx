import {
  IonContent,
  IonPage,
  useIonModal,
  useIonViewWillEnter,
  IonButton,
  IonItem,
  useIonViewDidEnter,
  useIonViewDidLeave,
} from "@ionic/react";
import { GoogleMap } from "@capacitor/google-maps";
import { useRef, useState, useEffect } from "react";
import {
  newMarkerValue,
  positionValue,
  isOpen,
  openModal,
  showMap,
  position as getPosition,
} from "../features/dataReducer/dataReducer";
import { useSelector, useDispatch } from "react-redux";
import "./Maps.css";

const Home = () => {
  const [forceRender, setForceRender] = useState(false);
  const showMaps: any = useSelector(showMap);
  const dispatch = useDispatch();
  const key = "AIzaSyAWhXxfT0fS3H6QYCOLGSE-QHzeKVWG1Y0";
  let newMap: any;
  const mapRef = useRef(null);
  const position = useSelector(getPosition);

  const markers = [
    {
      lat: position.latitude,
      lng: position.longitude,
    },
  ];

  console.log('markers',markers)
  useEffect(() => {
    if (showMaps) {
      const createMap = async () => {
        if (!mapRef.current) return;

        newMap = await GoogleMap.create({
          id: "google-map",
          element: mapRef.current,
          apiKey: key,
          config: mapConfig,
        });

        newMap.setOnMarkerClickListener((marker: any) => markerClick(marker));
        newMap.setOnMarkerDragEndListener((marker: any) => dragMarker(marker));

        addMapMarkers();
      };
      createMap();
    }

    return () => {
      if (newMap) {
        console.log("destroying");
        newMap.destroy();
      }
    };
  }, [position]);

  const [mapConfig, setMapConfig] = useState({
    zoom: 14,
    center: {
      lat: position.latitude,
      lng: position.longitude,
    },
  });

  const markerClick = (marker: any) => {
    /* Lógica para cuando se hace clic en un marcador */
  };

  const dragMarker = (marker: any) => {
    dispatch(newMarkerValue(marker || 10));
  };

  const addMapMarker = async (marker: any) => {
    await newMap.addMarker({
      coordinate: {
        lat: marker.lat,
        lng: marker.lng,
      },
      draggable: true,
      tintColor: {
        r: 160,
        g: 75,
        b: 30,
        a: 100,
      },
    });
    dispatch(newMarkerValue(marker || 10));
  };

  var filterMarkers: any = [];

  const addMapMarkers = () =>
    markers.forEach((markerId: any) => {
      if (!filterMarkers[markerId]) {
        filterMarkers[markerId] = true;
        addMapMarker(markerId);
      }
    });

  return <capacitor-google-map ref={mapRef} id="map"></capacitor-google-map>;
};

export default Home;
