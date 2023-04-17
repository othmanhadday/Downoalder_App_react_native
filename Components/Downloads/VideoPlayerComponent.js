import { Audio, Video } from "expo-av";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { Dimensions } from "react-native";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function VideoPlayerComponent({ video,setClose }) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const videoRef = useRef();

  const handleFullscreen = async () => {
    if (videoRef.current) {
      await videoRef.current.presentFullscreenPlayer();
    }
  };

  const [isPlaying, setIsPlaying] = useState(true);


  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", backgroundColor:"#656b6f" }}>
      <TouchableOpacity onPress={handleFullscreen}>
        <Video
          ref={videoRef}
          source={{
            uri: video.uri,
          }}
          style={{
            width: width / 4,
            height: height / 16,
            backgroundColor: "black",
          }}
          resizeMode="contain"
          useNativeControls={false}
          shouldPlay
          isLooping
        />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ marginHorizontal: 10, color:"#fff" }}
          onPress={handleFullscreen}
        >
          <Text style={{  color:"#fff" }}>{video.filename}</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 5,
          }}
        >
          <TouchableOpacity
            style={{ marginRight: 5 }}
            onPress={handlePlayPause}
          >
            {isPlaying ? (
              <Ionicons name="pause" size={width / 15} color={"#fff"} />
            ) : (
              <Ionicons name="play" size={width / 15} color={"#fff"} />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setClose(true)}>
            <Ionicons name="close-outline" size={width / 10} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
