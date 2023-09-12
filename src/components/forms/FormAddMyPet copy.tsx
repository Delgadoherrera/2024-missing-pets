import React, { useState } from "react";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonDatetime,
  IonBackButton,
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonTextarea,
  IonRange,
  IonItem,
  IonInput,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonText,
  IonPage,
} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  formValue,
  markerValue,
  imageValue,
  userData,
  refresh,
  usersData,
  isOpen,
  refreshThis,
} from "../../features/dataReducer/dataReducer";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { PetServiceWeb } from "../../services/PetServiceWeb";
import Toast from "../Toast";

interface FormData {
  nombre: string;
  tipoMascota: string;
  peso: string;
  colorPrimario: string;
  colorSecundario: string;
  descripcion: string;
}

const App = ({ setAddPet }: { setAddPet: (value: any) => void }) => {
  const [showToast, setShowToast] = useState(false);
  const value = useSelector((formValue: any) => formValue.counter);
  console.log(value, "value");
  const uploadNewPet = new PetServiceWeb();
  const user = useSelector(usersData);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {},
  });
  const file = value.file;
  
  const onSubmit = async (data: any) => {
    dispatch(formValue(data || 10));
    uploadNewPet.addMyPet(data, file, user.email).then((data) => {
      setShowToast(true);
      dispatchAll();
      reset();
      console.log("closeitr");
      dispatch(isOpen(false));
      dispatch(refreshThis(true));
      setAddPet(false);
    });
  };

  const dispatchAll = () => {
    dispatch(imageValue({}));
    dispatch(formValue({} || 10));
  };
  return (
    <div>
      {showToast === true ? (
        <Toast
          message="Mascota cargada con éxito"
          setShowToast={setShowToast}
        />
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonItem>
          <IonLabel></IonLabel>
          <Controller
            render={({ field }) => (
              <IonInput
                placeholder={`Nombre`}
                value={field.value ?? ""} // Asegurarse de que el valor sea una cadena vacía si es null o undefined
                onIonChange={(e) => setValue("nombre", e.detail.value ?? "")} // Asegurarse de que el valor sea una cadena vacía si es null o undefined
                slot={"start"}
                aria-label="nombreInput"
              ></IonInput>
            )}
            control={control}
            name="nombre"
          />
        </IonItem>
        <IonItem>
          <IonLabel></IonLabel>
          <Controller
            render={({ field }) => (
              <IonSelect
                aria-label="tipoMascota"
                placeholder="Tipo"
                value={field.value}
                slot={"start"}
                onIonChange={(e) => setValue("tipoMascota", e.detail.value)}
                interface="action-sheet"
              >
                <IonSelectOption value="PERRO">Perro</IonSelectOption>
                <IonSelectOption value="GATO">Gato</IonSelectOption>
                <IonSelectOption value="AVE">Ave</IonSelectOption>
                <IonSelectOption value="OTRO">Otro</IonSelectOption>
              </IonSelect>
            )}
            control={control}
            name="tipoMascota"
            rules={{ required: "This is a required field" }}
          />
        </IonItem>
        <ErrorMessage
          errors={errors}
          name="tipoMascota"
          as={<div style={{ color: "red" }} />}
        />
        <IonItem>
          <IonLabel></IonLabel>
          <Controller
            render={({ field }) => (
              <IonSelect
                aria-label="pesoMascota"
                placeholder="Peso"
                value={field.value}
                slot={"start"}
                onIonChange={(e) => setValue("peso", e.detail.value)}
                interface="action-sheet"

              >
                <IonSelectOption value="1kg/5kg">1kg/5kg</IonSelectOption>
                <IonSelectOption value="5kg/10kg">5kg/10kg</IonSelectOption>
                <IonSelectOption value="10kg/20kg">10kg/20kg</IonSelectOption>
                <IonSelectOption value="20kg/30kg">20kg/30kg</IonSelectOption>
                <IonSelectOption value="30kg/40kg">30kg/40kg</IonSelectOption>
                <IonSelectOption value="40kg/50kg">40kg/50kg</IonSelectOption>
                <IonSelectOption value="50kg/70kg">50kg/70kg</IonSelectOption>
              </IonSelect>
            )}
            control={control}
            name="peso"
            rules={{ required: "This is a required field" }}
          />
        </IonItem>
        <ErrorMessage
          errors={errors}
          name="peso"
          as={<div style={{ color: "red" }} />}
        />
        <IonItem>
          <IonLabel></IonLabel>
          <Controller
            render={({ field }) => (
              <IonSelect
                aria-label="colorPrimario"
                placeholder="Color primario"
                value={field.value}
                slot={"start"}
                onIonChange={(e) => setValue("colorPrimario", e.detail.value)}
                interface="action-sheet"

              >
                <IonSelectOption value="NEGRO">Negro</IonSelectOption>
                <IonSelectOption value="BLANCO">Blanco</IonSelectOption>
                <IonSelectOption value="AMARILLO">Amarillo</IonSelectOption>
                <IonSelectOption value="ROJO">Rojo</IonSelectOption>
                <IonSelectOption value="GRIS">Gris</IonSelectOption>
                <IonSelectOption value="MARRON">Marron</IonSelectOption>
                <IonSelectOption value="VERDE">Verde</IonSelectOption>
                <IonSelectOption value="VIOLETA">Violeta</IonSelectOption>
              </IonSelect>
            )}
            control={control}
            name="colorPrimario"
            rules={{ required: "This is a required field" }}
          />
        </IonItem>
        <ErrorMessage
          errors={errors}
          name="colorPrimario"
          as={<div style={{ color: "red" }} />}
        />
        <IonItem>
          <IonLabel></IonLabel>
          <Controller
            render={({ field }) => (
              <IonSelect
                aria-label="colorSecundario"
                placeholder="Color secundario"
                value={field.value}
                slot={"start"}
                onIonChange={(e) => setValue("colorSecundario", e.detail.value)}
                interface="action-sheet"

              >
                <IonSelectOption value="NEGRO">Negro</IonSelectOption>
                <IonSelectOption value="BLANCO">Blanco</IonSelectOption>
                <IonSelectOption value="AMARILLO">Amarillo</IonSelectOption>
                <IonSelectOption value="ROJO">Rojo</IonSelectOption>
                <IonSelectOption value="GRIS">Gris</IonSelectOption>
                <IonSelectOption value="MARRON">Marron</IonSelectOption>
                <IonSelectOption value="VERDE">Verde</IonSelectOption>
                <IonSelectOption value="VIOLETA">Violeta</IonSelectOption>
              </IonSelect>
            )}
            control={control}
            name="colorSecundario"
            rules={{ required: "This is a required field" }}
          />
        </IonItem>
        <ErrorMessage
          errors={errors}
          name="colorSecundario"
          as={<div style={{ color: "red" }} />}
        />
        {/* === ION INPUT === */}

        <IonItem>
          <IonLabel></IonLabel>
          <Controller
            render={({ field }) => (
              <IonTextarea
                placeholder="Descripcion"
                value={field.value}
                slot={"start"}
                onIonChange={(e) =>
                  setValue("descripcion", e.detail.value ?? "")
                }
                aria-label="descripcion"
              ></IonTextarea>
            )}
            control={control}
            name="descripcion"
            rules={{ required: "This is a required field" }}
          />
        </IonItem>
        <ErrorMessage
          errors={errors}
          name="descripcion"
          as={<div style={{ color: "red" }} />}
        />
        <div>
          <IonButton type="submit">Enviar</IonButton>
        </div>
      </form>
    </div>
  );
};

export default App;
