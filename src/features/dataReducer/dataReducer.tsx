import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  userData: any;
}

interface PetSelectedData {
  petSelected: any;
}

interface DataState {
  dataUserPets: any;
  file: string;
  value: any;
  dataUser: UserData;
  counterPetSelected: PetSelectedData;
  counterDataForm: any;
  lostPets: any;
  refreshThisSelector: boolean;
  isOpened: boolean;
  newMarkerValue: number[];
}

const initialUserData: UserData = {
  userData: "",
};

const initialPetSelectedData: PetSelectedData = {
  petSelected: {},
};

const initialState: DataState = {
  dataUserPets: [],
  file: "",
  value: {},
  dataUser: initialUserData,
  counterPetSelected: initialPetSelectedData,
  counterDataForm: {},
  lostPets: {},
  refreshThisSelector: false,
  isOpened: false,
  newMarkerValue: [],
};

const dataReducer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    positionValue: (state, action: PayloadAction<any>) => {
      console.log("state,action", state, action);
      state.value = action.payload;
    },
    imageValue: (state, action: PayloadAction<any>) => {
      state.file = action.payload.base64String;
    },
    newMarkerValue: (
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>
    ) => {
      console.log("newMarker", state, action);
      state.newMarkerValue = [
        action.payload.latitude,
        action.payload.longitude,
      ];
    },
    userPets: (state, action: PayloadAction<any>) => {
      state.dataUserPets = action.payload;
    },
    userData: (state, action: PayloadAction<any>) => {
      state.dataUser.userData = action.payload;
    },
    petLost: (state, action: PayloadAction<any>) => {
      state.lostPets = action.payload;
    },
    petSelected: (state, action: PayloadAction<any>) => {
      state.counterPetSelected.petSelected = action.payload;
    },
    formValue: (state, action: PayloadAction<any>) => {
      state.counterDataForm = action.payload;
    },
    refreshThis: (state, action: PayloadAction<boolean>) => {
      console.log("state,action", state, action);
      state.refreshThisSelector = action.payload;
    },
    isOpen: (state, action: PayloadAction<boolean>) => {
      console.log("action payload is open", action.payload);
      state.isOpened = action.payload;
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
} = dataReducer.actions;

export const selectCount = (state: { counter: DataState }) =>
  state.counter.file;
export const userPet = (state: { counter: DataState }) =>
  state.counter.dataUserPets;
export const usersData = (state: { counter: DataState }) =>
  state.counter.dataUser.userData;
export const counterPetSelected = (state: { counter: DataState }) =>
  state.counter.counterPetSelected.petSelected;
export const counterDataForm = (state: { counter: DataState }) =>
  state.counter.counterDataForm;
export const lostPets = (state: { counter: DataState }) =>
  state.counter.lostPets;
export const refresh = (state: { counter: DataState }) =>
  state.counter.refreshThisSelector;
export const openModal = (state: { counter: DataState }) =>
  state.counter.isOpened;
export const position = (state: { counter: DataState }) => state.counter.value;
export const markerValue = (state: { counter: DataState }) =>
  state.counter.newMarkerValue;

export default dataReducer.reducer;
