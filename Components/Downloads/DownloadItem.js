import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { download_videos_action } from "../../store/download_videos";

export default function DownloadItem({ item, setClose }) {
  const width = Dimensions.get("window").width;
  const dispatch = useDispatch();

  const playVideo = async () => {
    setClose(false);
    dispatch(download_videos_action.setVideo(item));
  };

  return (
    <TouchableOpacity
      onPress={playVideo}
      style={{
        flex: 1,
        backgroundColor: "white",
        borderColor: "orange",
        borderWidth: 1,
        marginTop: 20,
        marginHorizontal: 10,
        borderRadius: 10,
        flexDirection: "row",
      }}
    >
      <Image
        source={{ uri: item.uri_image }}
        style={{
          height: 90,
          width: 90,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      />

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <Text style={{ marginLeft: 10, marginTop: 5 }}>{item.filename}</Text>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 5,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <Ionicons name="play-circle" size={20} color={"#EE6D28"} />
            <Text>
              {Math.floor(item.duration / 60)}:{Math.floor(item.duration % 60)}
            </Text>
          </View>

          <Text style={{ marginRight: 5 }}>
            {moment(JSON.parse(item.date)).format("MMMM DD YYYY, HH:mm a")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
