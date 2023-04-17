import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createAsyncThunk,
  createSlice,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { getData, mergeData, setData, storeData } from "./storageData";

const historic_slice = createSlice({
  name: "historic_store",
  initialState: {
    showDeleteCheckbox: false,
    totalSelectedList: 0,
    historic_list: [],
    nextId: 1,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),

  reducers: {
    initializeData(state, action) {
      let payload = action.payload;
      state.historic_list = payload.historics
        ? payload.historics
        : state.historic_list;

      state.nextId = payload.nextId_historic
        ? payload.nextId_historic
        : state.nextId;
      console.log(state.nextId);
    },
    addHistoric(state, action) {
      let payload = action.payload;
      if (payload.iconURI) {
        state.historic_list.push({
          id: state.nextId,
          url: payload.url,
          title: payload.title,
          iconURI: payload.iconURI,
          date: JSON.stringify(new Date()),
          checked: false,
        });
        state.nextId = parseInt(state.nextId) + parseInt(1);
        mergeData("nextId_historic", state.nextId);
        mergeData("historic", state.historic_list);
      }
    },
    toggleShowDeleteCheckbox(state, action) {
      state.showDeleteCheckbox = !state.showDeleteCheckbox;
    },
    selectAllcheckbox(state, action) {
      var payload = action.payload;
      state.historic_list.forEach((obj) => (obj.checked = payload));
      state.totalSelectedList = countSelected(state.historic_list);
    },
    selectOnecheckbox(state, action) {
      const payload = action.payload;
      state.historic_list.forEach((obj) =>
        obj.id == payload.id
          ? (obj.checked = !payload.checked)
          : (obj.checked = obj.checked)
      );

      state.totalSelectedList = countSelected(state.historic_list);
      mergeData("historic", state.historic_list);
    },
    deletecheckedData(state, action) {
      state.historic_list = state.historic_list.filter((item) => !item.checked);
      state.totalSelectedList = countSelected(state.historic_list);
      mergeData("historic", state.historic_list);
    },
  },
});

const countSelected = (list) => {
  var i = 0;
  i = list.filter((obj) => obj.checked).length;
  return i;
};



export const historic_action = historic_slice.actions;
export default historic_slice;
