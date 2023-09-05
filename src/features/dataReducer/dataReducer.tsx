import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

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
  showMap: boolean;
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
  showMap: true,
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
    mapOpen: (state, action: PayloadAction<boolean>) => {
      console.log("MAP OPEN?", action.payload);
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
  mapOpen
} = dataReducer.actions;

const selectCounterState = (state: { counter: DataState }) => state.counter;

export const selectCount = createSelector(
  [selectCounterState],
  (counter) => counter.file
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
  (counter) => counter.counterPetSelected.petSelected
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
