import React, { useEffect, useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import { MDBContainer } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "./UserPets.css";
import { Avatar, Button, Typography } from "@mui/material";
import ModalEditPet from "./ModalEditPet";
import ModalFindMyPet from "./ModalFindMyPet";
import ModalAddMyPet from "./ModalAddMyPet";
import ActionSheet from "./simple/ActionSheet";
import FrontCommand from "./simple/UserPetCommandCard";
import { Pet } from "../interfaces/types";

export default function InteractiveList(data: any) {
  const myPets: Pet[] = data.data.data.userPet;
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const dispatch = useDispatch();
  const pet = selectedPet;
  const [showAdditionals, setShowAdditionals] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [showGMaps, setShowGMap] = useState(false);
  const [showAddPet, setShowAddPet] = useState(true);
  const [editPet, setEditPet] = useState(false);
  const [putAdoption, setPutAdoption] = useState(false);
  const [actionSheet, setActionSheet] = useState(false);
  const [quitAdoption, setQuitAdoption] = useState(false);
  const [deletePet, setDeletePet] = useState(false);
  const [addPet, setAddPet] = useState(false);
  const [stopSearch, setStopSearch] = useState(false);

  useEffect(() => {
    if (actionSheet === false) {
      setQuitAdoption(false);
      setPutAdoption(false);
      setDeletePet(false);
      setStopSearch(false);
      setIsSelected(false);
      setShowAdditionals(null);
      setShowGMap(false);
    }
  }, [actionSheet]);

  useEffect(() => {
    if (isSelected === false) {
      setShowAdditionals(null);
    }
  }, []);

  const handleAction = (index: any, pet: any, action: any) => {
    console.log("actions", pet, action);
    switch (action) {
      case "petLost":
        console.log("petLOST");
        setShowAddPet(false);
        setShowGMap(true);
        break;
      case "editPet":
        setEditPet(true);
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

  const handleShowAdditionals = (index: any, pet: any) => {
    setIsSelected(true);
    setSelectedPet(pet);
    setShowAdditionals((prevIndex) => (prevIndex === index ? null : index));
  };
  const Additionals = (index: any) => {
    return (
      <div className="additionalsUserPets" key={index}>
        <img
          src={`data:image/jpeg;base64,${pet!.fotoMascota}`}
          alt={pet!.nombre}
        ></img>
        <div>
          {pet!.status === 0 ? (
            <Button
              size="medium"
              onClick={() => {
                handleAction(index, pet, "petLost");
                setActionSheet(true);
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
      </div>
    );
  };

  return (
    <>
      {addPet && <ModalAddMyPet setAddPet={setAddPet} />}
      <MDBContainer
        fluid
        style={{
          margin: 2,
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "rgba(0, 0, 0, 0.075)",
        }}
      >
        {!isSelected && (
          <Button
            className="buttonAddMyPet"
            onClick={() => {
              setAddPet(true);
            }}
          >
            Agregar mascota
          </Button>
        )}
      </MDBContainer>

      {isSelected ? (
        <>
          {editPet && <ModalEditPet setEditPet={setEditPet} />}
          {actionSheet && putAdoption && (
            <ActionSheet
              setShowActionSheet={setActionSheet}
              action={"adoptPet"}
              header={"Poner en adopción"}
              petToDelete={pet}
            />
          )}
          {actionSheet && quitAdoption && (
            <ActionSheet
              setShowActionSheet={setActionSheet}
              action={"quitAdoptPet"}
              header={"Quitar de adopción"}
              petToDelete={pet}
            />
          )}
          {actionSheet && deletePet && (
            <ActionSheet
              setShowActionSheet={setActionSheet}
              action={"delete"}
              header={"Eliminar mascota"}
              petToDelete={pet}
            />
          )}
          {actionSheet && stopSearch && (
            <ActionSheet
              setShowActionSheet={setActionSheet}
              action={"stopSearch"}
              header={"¿Dejamos de buscar?"}
              petToDelete={pet}
            />
          )}
          {actionSheet && showGMaps && (
            <ModalFindMyPet setShowSearchMyPet={setActionSheet} data={pet} />
          )}

          <MDBContainer
            fluid
            style={{
              margin: 2,
              display: "flex",
              justifyContent: "space-around",
              backgroundColor: "rgba(0, 0, 0, 0.075)",
            }}
            className="petsContainer"
          >
            <Avatar
              style={{ width: "50px", height: "50px" }}
              className="userPetsPhoto"
              src={
                pet!.fotoMascota !== ""
                  ? `data:image/jpeg;base64,${pet!.fotoMascota}`
                  : ""
              }
            >
              {pet!.fotoMascota && <FolderIcon />}
            </Avatar>
            <FrontCommand pet={pet as Pet} />

            <Button
              onClick={() => {
                setIsSelected(false);
              }}
            >
              <MenuOutlinedIcon />
            </Button>
          </MDBContainer>

          <Additionals />
        </>
      ) : (
        <>
          {Array.isArray(myPets) &&
            myPets.map((pet: any, index: any) => {
              return (
                <div key={index}>
                  <MDBContainer
                    fluid
                    style={{
                      margin: 2,
                      display: "flex",
                      justifyContent: "space-around",
                      backgroundColor: "rgba(0, 0, 0, 0.075)",
                    }}
                    className="petsContainer"
                    key={index}
                  >
                    <Avatar
                      style={{ width: "50px", height: "50px" }}
                      className="userPetsPhoto"
                      src={
                        pet.fotoMascota !== ""
                          ? `data:image/jpeg;base64,${pet.fotoMascota}`
                          : ""
                      }
                    >
                      {!pet.fotoMascota && <FolderIcon />}
                    </Avatar>
                    <FrontCommand pet={pet} />
                    <Button
                      onClick={() => {
                        handleShowAdditionals(index, pet);
                      }}
                    >
                      <MenuOutlinedIcon />
                    </Button>
                  </MDBContainer>
                  {showAdditionals === index && isSelected && <Additionals />}
                </div>
              );
            })}
        </>
      )}
    </>
  );
}
