import { useState } from "react";
import { Button, IconButton } from "@mui/material";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Pet } from "../../interfaces/types";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { Col, Container, Image, Row, Stack } from "react-bootstrap";
import Switch from "@mui/material/Switch";
import { mic } from "ionicons/icons";
import photoIcon from "../../assets/SVG/photo-pro-svgrepo-com.svg";
import { IonContent, IonIcon, IonNote, IonPage, IonToggle } from "@ionic/react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ActionSheetExample from "./ActionSheet";
import ModalEditPet from "../ModalEditPet";
import ModalFindMyPet from "../ModalFindMyPet";
import { mapOpen } from "../../features/dataReducer/dataReducer";

interface FrontCommandProps {
  close: any;
}
const OffScreen: React.FC<FrontCommandProps> = ({
  close,
}: {
  close: (value: any) => void;
}) => {
  const [show, setShow] = useState(true);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [putAdoption, setPutAdoption] = useState(false);
  const [quitAdoption, setQuitAdoption] = useState(false);
  const [deletePet, setDeletePet] = useState(false);
  const [editPet, setEditPet] = useState(false);
  const showMap = useSelector((mapOpen: any) => mapOpen.counter.showMap);
  const isMapOpen = useSelector((isOpen: any) => isOpen.counter.isOpened);
  const [showGMaps, setShowGMap] = useState(isMapOpen);
  const [stopSearch, setStopSearch] = useState(false);
  const pet = useSelector(
    (petSelected: any) => petSelected.counter.petSelected
  );
  const islost = pet.status === 1 ? true : false;
  const [checked, setChecked] = useState(islost);
  const dispatch = useDispatch();
  const handleClose = (e: any) => {
    setShow(false);
    close(false);
    setPutAdoption(false);
  };

  const handleSwitch = (e: any) => {
    console.log("eeee", e);
    if (e) {
      setShowGMap(true);
      dispatch(mapOpen(true));
    }
    if (!e) {
      setStopSearch(true);
    }
  };

  if (editPet) {
    console.log("islost", islost);
    return (
      <ModalEditPet
        setEditPet={setEditPet}
        pet={pet}
        handleUpdateComps={close}
      />
    );
  }

  if (deletePet) {
    return (
      <ActionSheetExample
        setShowActionSheet={close}
        action={"delete"}
        header={"Eliminar mascota"}
        petToDelete={pet}
        cancelAction={setDeletePet}
      />
    );
  }

  if (quitAdoption) {
    return (
      <ActionSheetExample
        setShowActionSheet={handleClose}
        action={"quitAdoptPet"}
        header={"Quitar de adopción"}
        petToDelete={pet}
        cancelAction={setQuitAdoption}
      />
    );
  }
  if (stopSearch) {
    return (
      <ActionSheetExample
        setShowActionSheet={handleClose}
        action={"stopSearch"}
        header={"Dejar de buscar?"}
        petToDelete={pet}
        cancelAction={setQuitAdoption}
      />
    );
  }

  if (putAdoption) {
    return (
      <ActionSheetExample
        action={"adoptPet"}
        header={"Poner en adopción"}
        petToDelete={pet}
        setShowActionSheet={handleClose}
        cancelAction={setPutAdoption}
      />
    );
  }
  if (showGMaps) {
    return (
      <IonContent>
        <ModalFindMyPet
          setShowSearchMyPet={close}
          close={setShowGMap}
          data={pet}
        />
        ;
      </IonContent>
    );
  }
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{pet.nombre} </Offcanvas.Title>
        </Offcanvas.Header>
        <Container>
          <Row>
            <Col xs={12} md={2}>
              <Image
                src={`data:image/jpeg;base64,${pet!.fotoMascota}`}
                rounded
                className="pictureDetailOffscreen"
              />
            </Col>
          </Row>
        </Container>

        <Offcanvas.Body className="offCanvasBody">
          <Stack gap={2} className="col-md-5 mx-auto">
            <div className="petLostSwitch">
              Mascota perdida
              <div className="switchLostPetContainer">
                <b> NO </b>
                <IonToggle
                  {...label}
                  checked={checked}
                  onIonChange={(e) => handleSwitch(e.detail.checked)}
                />
                <b>SI</b>
              </div>
            </div>
            {/*             <Button variant="outlined">Mascota perdida</Button>
             */}
            <div className="buttonsMyPetsOffScreen">
              {pet.status !== 4 ? (
                <Button variant="outlined" onClick={() => setPutAdoption(true)}>
                  Poner en adopcion
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => setQuitAdoption(true)}
                >
                  Quitar de adopción
                </Button>
              )}

              <Button variant="outlined" onClick={() => setEditPet(true)}>
                Editar
              </Button>
              <Button variant="outlined" onClick={() => setDeletePet(true)}>
                Eliminar
              </Button>
            </div>
          </Stack>
          <div className="addMorePicMyPetDetail">
            <IconButton>
              <AddAPhotoIcon />
              <IonNote>Agregar mas fotos</IonNote>
            </IconButton>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffScreen;
