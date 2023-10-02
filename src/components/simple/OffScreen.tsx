import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Pet } from "../../interfaces/types";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { Col, Container, Image, Row, Stack } from "react-bootstrap";

interface FrontCommandProps {
  close: any;
}
const OffScreen: React.FC<FrontCommandProps> = ({
  close,
}: {
  close: (value: any) => void;
}) => {
  console.log("close", close);
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    close(false);
  };
  const handleShow = () => setShow(true);
  const pet = useSelector(
    (petSelected: any) => petSelected.counter.petSelected
  );
  /*   const [allPets, setAllPets] = React.useState<Pet | null>(null);
   */
  console.log("petselectes", pet);

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
              />
            </Col>
          </Row>
        </Container>

        <Offcanvas.Body>
          {pet.descripcion}
          <Stack gap={2} className="col-md-5 mx-auto">
            <Button variant="secondary">Mascota perdida</Button>
            <Button variant="outline-secondary">Poner en adopcion</Button>
            <Button variant="outline-secondary">Editar</Button>
            <Button variant="outline-secondary">Eliminar</Button>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffScreen;
