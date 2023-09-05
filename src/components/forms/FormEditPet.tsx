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
import { useSelector, useDispatch } from "react-redux";
import { PetServiceWeb } from "../../services/PetServiceWeb";
import Toast from "../../components/Toast";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import {
  petSelected,
  refreshThis,
  openModal,
  isOpen,
  formValue,
} from "../../features/dataReducer/dataReducer";

interface ModalEditPetProps {
  // Add your own props if needed...
}

interface FormData {
  nombre: string;
  tipoMascota: string;
  peso: string;
  colorPrimario: string;
  colorSecundario: string;
  descripcion: string;
}

const ModalEditPet = ({ setEditPet }: { setEditPet: (value: any) => void }) => {
  const [showToast, setShowToast] = useState(false);
  const value = useSelector(formValue);
  const uploadNewPet = new PetServiceWeb();
  const selectedPet = useSelector(petSelected);
  const dispatch = useDispatch();
  const petToEdit =
    selectedPet.payload?.counter?.counterPetSelected?.petSelected;
  const refresh: any = useSelector(refreshThis);
  const [editResult, setEditResult] = useState<any>(null);
  const isRefresh = refresh.payload.counter.isOpened?.isOpen;
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
    const newObject = combinarObjetos(petToEdit, data);
    try {
      const result = await uploadNewPet.editPet(petToEdit, data);
      setEditResult(result);
      setShowToast(true);
      dispatch(formValue({} || 10));
      dispatch(refreshThis(true));
      dispatch(petSelected(newObject));
      setEditPet(false);
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
    <div>
      {showToast === true ? (
        <Toast setShowToast={setShowToast} message="Mascota editada" />
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "right" }}>
        <img
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
          src={`data:image/jpeg;base64,${petToEdit?.fotoMascota}`}
          alt={petToEdit?.idMascota}
        ></img>
        <IonItem>
          <Controller
            render={({ field }) => (
              <IonInput
                placeholder={`${petToEdit?.nombre}`}
                value={field.value}
                onIonChange={(e: any) => setValue("nombre", e.detail.value)}
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
                placeholder={petToEdit?.tipoMascota}
                value={field.value}
                onIonChange={(e) => setValue("tipoMascota", e.detail.value)}
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
                placeholder={petToEdit.pesoAproximado}
                value={field.value}
                onIonChange={(e) => setValue("peso", e.detail.value)}
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
                placeholder={petToEdit.colorPrimario}
                value={field.value}
                onIonChange={(e) => setValue("colorPrimario", e.detail.value)}
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
                placeholder={petToEdit.colorSecundario}
                value={field.value}
                onIonChange={(e) => setValue("colorSecundario", e.detail.value)}
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
        </IonItem>
        <ErrorMessage
          errors={errors}
          name="colorSecundario"
          as={<div style={{ color: "red" }} />}
        />
        {/* === ION INPUT === */}
        <IonItem>
          <IonLabel>Descripcion:</IonLabel>
          <IonTextarea
            placeholder={petToEdit.descripcion}
            {...register("descripcion")}
            aria-label={petToEdit.idMascota}
          />
        </IonItem>
        {/*     <span>
        formavalue:
        {value > 0 ? value.payload.colorPrimario : null}
      </span> */}
        <ErrorMessage
          errors={errors}
          name="descripcion"
          as={<div style={{ color: "red" }} />}
        />

        <div>
          <IonButton type="submit">Aceptar edicion</IonButton>
        </div>
      </form>
    </div>
  );
};

export default ModalEditPet;
