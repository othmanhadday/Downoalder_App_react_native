import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, mergeData, setData, storeData } from "./storageData";

const webSlice = createSlice({
  name: "web_search",
  initialState: {
    home_screen: 1,
    url: "",
    tab: {},
    data: [],
    nextId: 1,
  },
  reducers: {
    initializeData(state, action) {
      const payload = action.payload;
      const tabItem = payload.tabItem;
      const tabs = payload.tabs;
      const nextId = payload.nextId;
      if (tabs == null) {
        console.log("tab noit found");
        state.data.push({
          id: 1,
          title: "New tab",
          url: "",
          screenShot: "",
        });
        storeData("tabs", state.data);
      } else if (tabItem == null) {
        console.log("tab item not found");
        state.tab = {
          id: 1,
          title: "New tab",
          url: "",
          screenShot: "",
        };
        storeData("tabItem", state.tab);
      } else {
        state.tab = tabItem;
        state.data = tabs;
        state.nextId = nextId;
      }
    },
    getListOfTab(state) {},
    SwitchHomeScreen(state, action) {
      let n = action.payload;
      state.home_screen = n;
    },
    setTab(state, action) {
      let id = action.payload;
      const index = state.data.findIndex((t) => t.id === id);
      state.tab = state.data[index];
      mergeData("tabItem", state.tab);
    },
    setURLTab(state, action) {
      let payload = action.payload;
      state.tab.id = payload.id;
      state.tab.title = payload.title;
      state.tab.url = payload.url;
      if (Array.isArray(state.data)) {
        const index = state.data?.findIndex((t) => t.id === state.tab.id);
        if (index == -1) {
          state.data[0] = state.tab;
        } else {
          state.data[index] = state.tab;
          mergeData("tabItem", state.tab);
          mergeData("tabs", state.data);
        }
      } else {
      }
    },
    setImgScreenTab(state, action) {
      let payload = action.payload;
      if (payload.screenShot) {
        state.tab.screenShot = payload.screenShot;
      }
      if (payload.iconURI && typeof payload.iconURI === "string") {
        state.tab.iconURI = payload.iconURI;
      }
      if (Array.isArray(state.data)) {
        const index = state.data?.findIndex((t) => t.id === state.tab.id);
        if (index == -1) {
          state.data[0] = state.tab;
        } else {
          state.data[index] = state.tab;
          mergeData("tabItem", state.tab);
          mergeData("tabs", state.data);
        }
      } else {
      }
    },
    addNewTab(state, action) {
      console.log(state.nextId);
      const tab = {
        id: state.nextId,
        title: "New tab",
        url: "",
        screenShot: "",
      };
      state.tab = tab;
      state.data.push(tab);
      state.nextId = state.nextId + 1;
      mergeData("nextId_web", state.nextId);
      mergeData("tabItem", state.tab);
      mergeData("tabs", state.data);
    },
    deleteTab(state, action) {
      const tab = action.payload;
      if (state.data.length > 1) {
        const index = state.data.findIndex((t) => t.id === tab.id);
        console.log(index);
        if (index == 0) {
          state.data.splice(index, 1);
          state.tab = state.data[index];
          mergeData("tabItem", state.tab);
          mergeData("tabs", state.data);
        } else if (index > 0) {
          state.data.splice(index, 1);
          state.tab = state.data[index - 1];
          mergeData("tabItem", state.tab);
          mergeData("tabs", state.data);
        }
      } else {
        state.tab = {
          id: 1,
          title: "New tab",
          url: "",
          screenShot: "",
        };
        state.home_screen = 1;
        storeData("tabItem", state.tab);
      }
    },
  },
});

export const webActions = webSlice.actions;
export default webSlice;

const MaxId = (tabs) => {
  let id = 0;
  const size = tabs.length;
  id = tabs[size - 1].id + 1;
  return id;
};

const getIndexOfArray = (tabs, tab) => {
  const index = Array.from(tabs).findIndex((t) => t.id === tab.id);
  return index;
};
