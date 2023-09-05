import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { petSelected } from "../../features/dataReducer/dataReducer";
import { Pet } from "../../interfaces/types";

interface FrontCommandProps {
  pet: Pet;
}

const FrontCommand: React.FC<FrontCommandProps> = ({ pet }) => {
  return (
    <MDBContainer className="rangeContainer">
      {pet.status === 4 ? <p> En adopcion</p> : null}
      {pet.status === 1 ? <Button> Buscando...</Button> : null}
    </MDBContainer>
  );
};

export default FrontCommand;
