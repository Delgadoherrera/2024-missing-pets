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
  IonBreadcrumb,
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
  IonNote,
} from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";
import { PetServiceWeb } from "../../services/PetServiceWeb";
import Toast from "../../components/Toast";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Pet } from "../../interfaces/types";
import {
  petSelected,
  refreshThis,
  openModal,
  isOpen,
  formValue,
} from "../../features/dataReducer/dataReducer";
import { Typography } from "@mui/material";

interface FormData {
  nombre: string;
  tipoMascota: string;
  peso: string;
  colorPrimario: string;
  colorSecundario: string;
  descripcion: string;
}

interface FrontCommandProps {
  pet: Pet | null;
  setEditPet: any;
  handleUpdateComps: any;
}
const ModalEditPet: React.FC<FrontCommandProps> = ({
  pet,
  setEditPet,
  handleUpdateComps,
}) => {
  const [showToast, setShowToast] = useState(false);
  const uploadNewPet = new PetServiceWeb();
  const dispatch = useDispatch();
  const refresh: any = useSelector(
    (refreshThis: any) => refreshThis.counter.refreshThisSelector
  );
  console.log("refresh", refresh);
  const [editResult, setEditResult] = useState<any>(null);
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

  const onSubmit = async (data: any) => {
    dispatch(isOpen(false));
    const newObject = combinarObjetos(pet!, data);
    try {
      const result = await uploadNewPet.editPet(pet, data);
      setEditResult(result);
      setShowToast(true);
      dispatch(formValue({} || 10));
      dispatch(refreshThis(true));
      setEditPet(false);
      await handleUpdateComps();
    } catch (error) {
      // Handle error if needed
    }
  };

  function combinarObjetos(
    objeto1: Record<string, any>,
    objeto2: Record<string, any>
  ): Record<string, any> {
    const nuevoObjeto: Record<string, any> = {};

    for (const propiedad in objeto1) {
      if (
        objeto1.hasOwnProperty(propiedad) &&
        objeto1[propiedad] !== undefined
      ) {
        nuevoObjeto[propiedad] = objeto1[propiedad];
      }
    }

    for (const propiedad in objeto2) {
      if (
        objeto2.hasOwnProperty(propiedad) &&
        objeto2[propiedad] !== undefined
      ) {
        nuevoObjeto[propiedad] = objeto2[propiedad];
      }
    }

    return nuevoObjeto;
  }

  return (
    <div className="formsContainer">
      {showToast === true ? (
        <Toast setShowToast={setShowToast} message="Mascota editada" />
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)} className="formEditPet">
        <div className="pictureModal">
          <img
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
            src={`data:image/jpeg;base64,${pet?.fotoMascota}`}
            alt={pet?.nombre}
          ></img>
        </div>

        <IonBreadcrumb>
          <Controller
            render={({ field }) => (
              <IonInput
                placeholder={`${pet?.nombre}`}
                value={field.value}
                onIonChange={(e: any) => setValue("nombre", e.detail.value)}
              ></IonInput>
            )}
            control={control}
            name="nombre"
          />
        </IonBreadcrumb>
        <IonBreadcrumb>
          <Controller
            render={({ field }) => (
              <IonSelect
                placeholder={pet?.tipoMascota}
                value={field.value}
                onIonChange={(e) => setValue("tipoMascota", e.detail.value)}
                aria-label="tipoMascota"
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
          />
        </IonBreadcrumb>
        <ErrorMessage
          errors={errors}
          name="tipoMascota"
          as={<div style={{ color: "red" }} />}
        />
        <IonBreadcrumb>
          <IonLabel></IonLabel>
          <Controller
            render={({ field }) => (
              <IonSelect
                placeholder={pet!.pesoAproximado}
                value={field.value}
                onIonChange={(e) => setValue("peso", e.detail.value)}
                aria-label="peso"
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
          />
        </IonBreadcrumb>
        <ErrorMessage
          errors={errors}
          name="peso"
          as={<div style={{ color: "red" }} />}
        />
        <IonBreadcrumb>
          <IonLabel></IonLabel>
          <Controller
            render={({ field }) => (
              <IonSelect
                placeholder={pet!.colorPrimario}
                value={field.value}
                onIonChange={(e) => setValue("colorPrimario", e.detail.value)}
                aria-label="colorPrimario"
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
          />
        </IonBreadcrumb>
        <ErrorMessage
          errors={errors}
          name="colorPrimario"
          as={<div style={{ color: "red" }} />}
        />
        <IonBreadcrumb>
          <IonLabel></IonLabel>
          <Controller
            render={({ field }) => (
              <IonSelect
                placeholder={pet!.colorSecundario}
                value={field.value}
                onIonChange={(e) => setValue("colorSecundario", e.detail.value)}
                aria-label="colorSecundario"
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
          />
        </IonBreadcrumb>
        <ErrorMessage
          errors={errors}
          name="colorSecundario"
          as={<div style={{ color: "red" }} />}
        />
        {/* === ION INPUT === */}
        <IonBreadcrumb>
          <IonTextarea
            placeholder={`Descripcion: ${pet!.descripcion}`}
            {...register("descripcion")}
            aria-label="descripcion"
          />
        </IonBreadcrumb>
        {/*     <span>
        formavalue:
        {value > 0 ? value.payload.colorPrimario : null}
      </span> */}
        <ErrorMessage
          errors={errors}
          name="descripcion"
          as={<div style={{ color: "red" }} />}
        />

        <div className="sendButton">
          <IonButton type="submit">Aceptar edicion</IonButton>
        </div>
      </form>
    </div>
  );
};

export default ModalEditPet;
