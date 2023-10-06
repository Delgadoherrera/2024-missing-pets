import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { IonInput } from "@ionic/react";
import { Password } from "primereact/password";
import { Button } from "@mui/material";
import LoginButton from "../LoginButton";
import dogIcon from "../../assets/SVG/cat-symbol-svgrepo-com.svg";
// Importa y convierte el SVG en un componente React

export default function LoginForm() {
  const [value, setValue] = useState({
    usuario: "",
    password: "",
  });

  useEffect(() => {
    console.log("value", value);
  }, [value]);
  return (
    <>
      <div className="loginForm">
        <img className="imgIconHome" src={dogIcon}></img>
        <InputText
          onChange={(e) =>
            setValue({ usuario: e.target.value, password: value.password })
          }
          placeholder="Nombre de usuario"
        />
        <InputText
          onChange={(e) =>
            setValue({ password: e.target.value, usuario: value.usuario })
          }
          placeholder="Contraseña"
          type="password"
        />
        <Button>Ingresar</Button>
        <Button>Crear cuenta</Button>

        <LoginButton />
      </div>
    </>
  );
}
