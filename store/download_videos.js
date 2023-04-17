import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, mergeData, setData, storeData } from "./storageData";

const download_videos_slice = createSlice({
  name: "download_videos",
  initialState: {
    video: {},
    video_list: [],
  },
  reducers: {
    initializeData(state, action) {
      const payload = action.payload;
      const video_list = payload.video_list;
      if (video_list) {
        state.video_list = video_list;
      }
    },
    setVideo(state, action) {
      const payload = action.payload;
      state.video = payload;
    },
    onDownloadVideo(state, action) {
      const payload = action.payload;
      state.video.id = MaxId(state.video_list);
      state.video.filename = payload.name;
      state.video.uri_image = payload.uri_image;
      state.video.date = JSON.stringify(new Date());
      state.video_list.push(state.video);
      storeData("video_list", state.video_list);
    },
    videoDownloadedSuccess(state, action) {
      const payload = action.payload;
      state.video.filename = payload.filename;
      state.video.duration = payload.duration;
      state.video.uri = payload.uri;
      state.video.width = payload.width;
      state.video.height = payload.height;
      state.video.mediaType = payload.mediaType;
      const index = state.video_list?.findIndex((t) => t.id === state.video.id);
      state.video_list[index] = state.video;
      mergeData("video_list", state.video_list);
    },
  },
});

const MaxId = (videos) => {
  let id = 0;
  const size = videos.length;
  if (size == 0) {
    id = 1;
  } else {
    id = videos[size - 1].id + 1;
  }

  return id;
};

export const download_videos_action = download_videos_slice.actions;
export default download_videos_slice;
