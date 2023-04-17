import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { download_videos_action } from "../../store/download_videos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DownloadItem from "./DownloadItem";
import VideoPlayerComponent from "./VideoPlayerComponent";
import { useState } from "react";

export default function Downloads() {
  let video_list = useSelector((state) => state.download_videos.video_list);
  let video = useSelector((state) => state.download_videos.video);

  const dispatch = useDispatch();
  useEffect(() => {
    getVideoList();
  }, []);

  const getVideoList = async () => {
    try {
      let video_list_from_storage = await AsyncStorage.getItem("video_list");
      let parsed_video_list = await JSON.parse(video_list_from_storage);
      await dispatch(
        download_videos_action.initializeData({
          video_list: parsed_video_list,
        })
      );
    } catch (error) {
      alert(error);
    }
  };

  const [close, setClose] = useState(false);

  useEffect(() => {
    console.log(close);
  }, [close]);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={video_list}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.5}
        onEndReached={() => {}}
        renderItem={({ item }) => (
          <DownloadItem
            setClose={setClose}
            item={item}
          />
        )}
      />

      {video.uri && !close && (
        <View>
          <VideoPlayerComponent
            video={video}
            width={video.width}
            height={video.height}
            setClose={ setClose}
          />
        </View>
      )}
    </View>
  );
}
