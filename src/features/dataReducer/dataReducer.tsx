import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

interface UserData {
  userData: any;
}

interface DataState {
  dataUserPets: any;
  file: string;
  value: any;
  dataUser: UserData;
  petSelected: {};
  counterDataForm: any;
  lostPets: any;
  refreshThisSelector: boolean;
  isOpened: boolean;
  newMarkerValue: number[];
  showMap: boolean;
  nearAdoptPet: any;
}

const initialUserData: UserData = {
  userData: "",
};
const initialState: DataState = {
  dataUserPets: [],
  file: "",
  value: {},
  dataUser: initialUserData,
  counterDataForm: {},
  lostPets: {},
  refreshThisSelector: false,
  isOpened: false,
  newMarkerValue: [],
  showMap: true,
  petSelected: {},
  nearAdoptPet: [],
};

const dataReducer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    positionValue: (state, action: PayloadAction<any>) => {
      console.log("Posicion del usuario:", action.payload);
      state.value = action.payload;
    },
    imageValue: (state, action: PayloadAction<any>) => {
      state.file = action.payload.base64String;
    },
    newMarkerValue: (
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>
    ) => {
      state.newMarkerValue = [
        action.payload.latitude,
        action.payload.longitude,
      ];
    },
    userPets: (state, action: PayloadAction<any>) => {
      console.log("Mascotas de usuario:", action.payload);
      state.dataUserPets = action.payload;
    },
    adoptPets: (state, action: PayloadAction<any>) => {
      console.log("Mascotas para adoptar:", action.payload);
      state.nearAdoptPet = action.payload;
    },
    userData: (state, action: PayloadAction<any>) => {
      console.log("User data:", action.payload);
      state.dataUser.userData = action.payload;
    },
    petLost: (state, action: PayloadAction<any>) => {
      console.log("Mascotas perdidas cercanas:", action.payload);
      state.lostPets = action.payload;
    },
    petSelected: (state, action: PayloadAction<any>) => {
      console.log("Mascota seleccionada:", action.payload);
      state.petSelected = action.payload;
    },
    formValue: (state, action: PayloadAction<any>) => {
      console.log("FORMVALUES", action.payload);
      state.counterDataForm = action.payload;
    },
    refreshThis: (state, action: PayloadAction<boolean>) => {
      console.log("REFRESH DISPATCHED", action.payload);
      state.refreshThisSelector = action.payload;
    },
    isOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpened = action.payload;
    },
    mapOpen: (state, action: PayloadAction<boolean>) => {
      state.showMap = action.payload;
    },
  },
});

export const {
  userPets,
  userData,
  petSelected,
  formValue,
  petLost,
  refreshThis,
  isOpen,
  imageValue,
  positionValue,
  newMarkerValue,
  mapOpen,
  adoptPets,
} = dataReducer.actions;

const selectCounterState = (state: { counter: DataState }) => state.counter;

export const selectCount = createSelector(
  [selectCounterState],
  (counter) => counter.file
);
export const adoptPet = createSelector(
  [selectCounterState],
  (counter) => counter.nearAdoptPet
);
export const userPet = createSelector(
  [selectCounterState],
  (counter) => counter.dataUserPets
);
export const usersData = createSelector(
  [selectCounterState],
  (counter) => counter.dataUser.userData
);
export const counterPetSelected = createSelector(
  [selectCounterState],
  (counter) => counter.petSelected
);

export const counterDataForm = createSelector(
  [selectCounterState],
  (counter) => counter.counterDataForm
);

export const lostPets = createSelector(
  [selectCounterState],
  (counter) => counter.lostPets
);

export const refresh = createSelector(
  [selectCounterState],
  (counter) => counter.refreshThisSelector
);

export const openModal = createSelector(
  [selectCounterState],
  (counter) => counter.isOpened
);

export const position = createSelector(
  [selectCounterState],
  (counter) => counter.value
);

export const markerValue = createSelector(
  [selectCounterState],
  (counter) => counter.newMarkerValue
);

export const showMap = createSelector(
  [selectCounterState],
  (counter) => counter.showMap
);
export default dataReducer.reducer;
