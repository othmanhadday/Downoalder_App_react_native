import { configureStore } from "@reduxjs/toolkit";
import download_videos_slice from "./download_videos";
import historic_slice from "./historic_store";
import webSlice from "./web_search";

const store = configureStore({
  reducer: {
    web_search: webSlice.reducer,
    download_videos: download_videos_slice.reducer,
    historic_store: historic_slice.reducer,
  },
});

export default store;
