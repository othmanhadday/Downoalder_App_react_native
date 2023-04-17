import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, TextInput } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Dimensions } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Platform } from "react-native";
import Modal from "react-native-modal";
import { Image } from "react-native";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useDispatch, useSelector } from "react-redux";
import { download_videos_action } from "../../../store/download_videos";

export default function BottomSlide({
  urlVideo,
  textNameVideo,
  refBottomSlide,
  setTextNameVideo,
  closeBottmSilde,
}) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setImage(null);
    getImageOfVideo();
  }, [urlVideo]);

  const getImageOfVideo = async () => {
    if (urlVideo) {
      try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(urlVideo, {
          time: 1000,
        });
        setImage(uri);
      } catch (e) {
        alert("Could not Download this video");
        setImage(null);
        console.log("Could not generate thumbnail. setDataSource failed:");
      }
    }
  };

  const inputNameVideoRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalStyle, setModalStyle] = useState({});

  const handlePressEditNameVideo = () => {
    inputNameVideoRef.current.focus();
  };
  const handleTextChange = (newText) => {
    setTextNameVideo(newText);
  };

  const downloadVideo = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      closeBottmSilde();
      await setModalStyle({
        color: "#ea6729",
        text: "Downloading ...",
      });
      setModalVisible(true);
      dispatch(
        download_videos_action.onDownloadVideo({
          name: textNameVideo,
          uri_image: image,
        })
      );
      const folderPath = `${FileSystem.documentDirectory}`;
      const fileUri = folderPath + textNameVideo + ".mp4";
      const downloadResult = await FileSystem.downloadAsync(urlVideo, fileUri);
      if (downloadResult.status === 200) {
        const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
        setModalVisible(false);
        await setModalStyle({
          color: "#03895d9c",
          text: "Done",
        });
        setModalVisible(true);
        dispatch(download_videos_action.videoDownloadedSuccess(asset));
        return asset;
      } else {
        alert("Failed to download video");
        throw new Error("Failed to download video");
      }
    } else {
      const status = await MediaLibrary.requestPermissionsAsync();

      const message = Platform.select({
        ios: "Please open Settings, navigate to the app and grant permission to access the media library.",
        android:
          "Please open the app settings and grant permission to access the media library.",
      });

      Alert.alert("Permission Required", message, [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Open Settings",
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]);
    }
  };

  return (
    <>
      <RBSheet
        ref={refBottomSlide}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={height / 2.5}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          },
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View
          style={{
            flex: 1,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 100,
                width: 100,
                margin: 20,
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "red",
              }}
            >
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ height: 100, width: 100 }}
                />
              )}
              {!image && <ActivityIndicator />}
            </View>
            <TextInput
              style={{
                height: 40,
                width: "80%",
                borderColor: "gray",
                padding: 10,
              }}
              ref={inputNameVideoRef}
              onChangeText={handleTextChange}
              value={textNameVideo}
              placeholder="Type something here"
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <TouchableOpacity
              onPress={closeBottmSilde}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Ionicons
                name="close-circle-outline"
                size={40}
                color={"#EE6D28"}
              />
              <Text style={{ color: "#EE6D28", fontSize: 14 }}>close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePressEditNameVideo}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Ionicons name="create" size={40} color={"#EE6D28"} />
              <Text style={{ color: "#EE6D28", fontSize: 14 }}>rename</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={downloadVideo}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Ionicons name="download-outline" size={40} color={"#EE6D28"} />
              <Text style={{ color: "#EE6D28", fontSize: 14 }}>Download</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
      <WrapperComponent
        text={modalStyle.text}
        color={modalStyle.color}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );

  function LoadingIndicatorView() {
    return (
      <>
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color="#009b88" size="large" />
        </View>
      </>
    );
  }
}

function WrapperComponent({ isModalVisible, setModalVisible, color, text }) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="slideInUp"
        animationOut="fadeOutDown"
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        backdropOpacity={0.5}
        style={{ marginBottom: height / 6.5, justifyContent: "flex-end" }}
      >
        <View
          style={{
            width: width / 2,
            height: 35,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: color,
            flexDirection: "row",
            borderRadius: 10,
          }}
        >
          <Ionicons name="download-outline" size={30} color={"#fff"} />
          <Text style={{ color: "#fff", fontSize: 16, marginTop: 6 }}>
            {text}
          </Text>
        </View>
      </Modal>
    </View>
  );
}
