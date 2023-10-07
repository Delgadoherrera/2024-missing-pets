import React, { useEffect, useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import { MDBContainer } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Avatar, Input, Typography } from "@mui/material";
import { Button } from "primereact/button";
import ModalEditPet from "./ModalEditPet";
import ModalFindMyPet from "./ModalFindMyPet";
import ModalAddMyPet from "./ModalAddMyPet";
import ActionSheet from "./simple/ActionSheet";
import FrontCommand from "./simple/UserPetCommandCard";
import { Pet } from "../interfaces/types";
import OffScreen from "./simple/OffScreen";
import {
  isOpen,
  mapOpen,
  petSelected,
  selectCount,
  userPet,
} from "../features/dataReducer/dataReducer";
import { IonButton, IonContent, IonItem, IonText } from "@ionic/react";
import { InputText } from "primereact/inputtext";

export default function InteractiveList() {
  const myPets = useSelector(userPet);
  const dispatch = useDispatch();
  const pet = useSelector(
    (petSelected: any) => petSelected.counter.petSelected
  );
  const isMapOpen = useSelector((isOpen: any) => isOpen.counter.isOpened);
  const showMap = useSelector((mapOpen: any) => mapOpen.counter.showMap);
  const [showAdditionals, setShowAdditionals] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [showGMaps, setShowGMap] = useState(isMapOpen);
  const [showAddPet, setShowAddPet] = useState(true);
  const [editPet, setEditPet] = useState(false);
  const [putAdoption, setPutAdoption] = useState(false);
  const [actionSheet, setActionSheet] = useState(false);
  const [quitAdoption, setQuitAdoption] = useState(false);
  const [deletePet, setDeletePet] = useState(false);
  const [addPet, setAddPet] = useState(false);
  const [stopSearch, setStopSearch] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [petsToMap, setPetsToMap] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPets, setFilteredPets] = useState([]);
  const [showOffScreen, setShowOffScreen] = useState(false);

  useEffect(() => {
    setPetsToMap(myPets);
  }, [myPets, dispatch]);

  useEffect(() => {
    if (actionSheet === false) {
      setQuitAdoption(false);
      setPutAdoption(false);
      setDeletePet(false);
      setStopSearch(false);
      setIsSelected(false);
      setShowGMap(false);
      setShowAdditionals(null);
      setShowOffScreen(false);
    }
  }, [actionSheet]);

  useEffect(() => {
    if (showMap === false) {
      setShowGMap(false);
      setActionSheet(false);
    }
  }, [showMap]);

  useEffect(() => {
    if (isSelected === false) {
      setShowAdditionals(null);
      setShowOffScreen(false);
    }
  }, []);

  useEffect(() => {
    // Filtra las mascotas que coinciden con el término de búsqueda
    const filtered = myPets.filter((pet: any) =>
      pet.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("filtered", filtered);
    setFilteredPets(filtered);
  }, [myPets, searchTerm]);
  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };
  const handleAction = (index: any, pet: any, action: any) => {
    switch (action) {
      case "petLost":
        console.log("petLOST");
        setShowAddPet(false);
        setShowGMap(true);
        setActionSheet(true);
        dispatch(isOpen(true));
        dispatch(mapOpen(true));
        break;
      case "editPet":
        setEditPet(true);
        setActionSheet(true);
        break;
      case "adoptPet":
        console.log("adoptPet");
        setPutAdoption(true);
        setActionSheet(true);
        break;
      case "quitAdoptPet":
        console.log("quitAdoptPet");
        setQuitAdoption(true);
        setActionSheet(true);
        break;
      case "deletePet":
        console.log("deletePet");
        setDeletePet(true);
        setActionSheet(true);
        break;
      case "stopSearch":
        console.log("stopSearch");
        setStopSearch(true);
        setActionSheet(true);
        break;
      default:
        break;
    }

    setIsSelected(true);
  };
  function capitalizeFirstLetter(str: any) {
    // Verifica si la cadena está vacía o es nula
    if (!str) {
      return "";
    }

    // Convierte la primera letra a mayúscula y el resto de la cadena a minúscula
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const handleShowAdditionals = (pet: any) => {
    dispatch(petSelected(pet));
    setShowOffScreen(true);
  };
  const Additionals = (index: any) => {
    return (
      <p> a</p>
      /*       <div className="additionalsUserPets" key={index}>
          <img
            src={`data:image/jpeg;base64,${pet!.fotoMascota}`}
            alt={pet!.nombre}
          ></img>
          <div className="buttonsAdditionals">
            {pet!.status === 0 ? (
              <Button
                size="medium"
                onClick={() => {
                  handleAction(index, pet, "petLost");
                }}
              >
                Mascota perdida
              </Button>
            ) : null}
            {pet!.status === 1 ? (
              <Button
                size="medium"
                onClick={() => {
                  handleAction(index, pet, "stopSearch");
                }}
              >
                Quitar de busqueda
              </Button>
            ) : null}
            <Button
              size="medium"
              onClick={() => {
                handleAction(index, pet, "editPet");
              }}
            >
              Editar
            </Button>
            {pet!.status === 4 ? (
              <Button
                size="medium"
                onClick={() => {
                  handleAction(index, pet, "quitAdoptPet");
                }}
              >
                Quitar de adopción
              </Button>
            ) : (
              pet!.status !== 1 && (
                <Button
                  size="medium"
                  onClick={() => {
                    handleAction(index, pet, "adoptPet");
                  }}
                >
                  Poner en adopción
                </Button>
              )
            )}
            <Button
              size="medium"
              onClick={() => {
                handleAction(index, pet, "deletePet");
              }}
            >
              Eliminar
            </Button>
          </div>
          <div className="petDetailAdditionals">
            <IonText>
              <b>Nombre:</b> {capitalizeFirstLetter(pet.nombre)}
            </IonText>
            <IonText>
              <b> Tipo:</b> {capitalizeFirstLetter(pet.tipoMascota)}
            </IonText>
            <IonText>
              <b>Color primario:</b> {capitalizeFirstLetter(pet.colorPrimario)}
            </IonText>
            <IonText>
              <b>Color secundario:</b>{" "}
              {capitalizeFirstLetter(pet.colorSecundario)}
            </IonText>
            <IonText>
              <b> Peso aproximado:</b> {pet.pesoAproximado}
            </IonText>
  
            <IonText style={{ textAlign: "center", width: "80%" }}>
              <b> Descripción:</b> {capitalizeFirstLetter(pet.descripcion)}
            </IonText>
          </div>
        </div> */
    );
  };

  const activeFrontMap = (pet: any) => {
    setActionSheet(true);
    setShowGMap(true);
    dispatch(isOpen(true));
    dispatch(petSelected(pet));
    dispatch(mapOpen(true));
  };

  if (showOffScreen) {
    return <OffScreen close={setShowOffScreen} />;
  }

  return (
    <>
      <IonContent className="addPetUserPets">
        {!isSelected && (
          <div className="buscarUserPets">
            <div className="addPetButtonContainer">
              <Button
                className="buttonAddMyPet"
                onClick={() => {
                  setAddPet(true);
                  setActionSheet(true);
                }}
              >
                Agregar mascota
              </Button>
            </div>
            <InputText
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: "100%", height: "60px", padding: "12px" }}
            />
          </div>
        )}

        <MDBContainer
          fluid
          style={{
            margin: 2,
            display: "flex",
            justifyContent: "space-around",
            padding: 0,
            borderRadius: "50px",
          }}
        >
          {/*           {!isSelected && (
            <div className="addPetButtonContainer">
              <Button
                className="buttonAddMyPet"
                onClick={() => {
                  setAddPet(true);
                  setActionSheet(true);
                }}
              >
                Agregar mascota
              </Button>
            </div>
          )} */}
        </MDBContainer>

        {actionSheet && addPet && <ModalAddMyPet setAddPet={setAddPet} />}

        <>
          {Array.isArray(filteredPets) &&
            filteredPets.map((pet: any, index: any) => {
              return (
                <div key={index}>
                  <MDBContainer
                    fluid
                    style={{
                      margin: 2,
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                    className="petsContainer"
                    key={index}
                    onClick={() => {
                      handleShowAdditionals(pet);
                    }}
                  >
                    <FrontCommand pet={pet} activeFrontMap={activeFrontMap} />

                    {/*     <Button
                        onClick={() => {
                          handleShowAdditionals(pet);
                        }}
                      >
                        <MenuOutlinedIcon />
                      </Button> */}
                  </MDBContainer>
                  {showAdditionals === index && <Additionals />}
                </div>
              );
            })}
        </>
      </IonContent>
    </>
  );
}
