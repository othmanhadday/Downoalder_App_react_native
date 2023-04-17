import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import WebView from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import { webActions } from "../../../store/web_search";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function TabItem({ item, navigation, tab }) {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const dispatch = useDispatch();

  const goToWeb = () => {
    dispatch(webActions.setTab(item.id));
    dispatch(webActions.SwitchHomeScreen(1));
  };

  const deleteItem = () => {
    dispatch(webActions.deleteTab(item));
  };
  return (
    <View
      style={[
        {
          marginVertical: 10,
          marginHorizontal: 5,
          width: screenWidth / 2.1,
          height: screenHeight / 3,
          borderRadius: 10,
        },
        item.id == tab.id
          ? { backgroundColor: "#EE6D28" }
          : { backgroundColor: "#c3c3c3" },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          marginRight: 15,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 4,
            marginLeft: 5,
            paddingVertical: 5,
            flexDirection: "row",
          }}
        >
          {!item.iconURI ? (
            <Ionicons
              name="logo-chrome"
              size={20}
              color="black"
              style={{ marginLeft: 5 }}
            />
          ) : (
            <Image
              style={{ marginHorizontal: 5, width: 20, height: 20 }}
              source={{
                uri: item.iconURI,
              }}
            />
          )}
          <Text numberOfLines={1} style={{ flex: 4 }} onPress={goToWeb}>
            {item.title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={deleteItem}
          style={{ flex: 1, justifyContent: "center", textAlign: "center" }}
        >
          <Text style={{ color: "white" }}>X</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 7,
        }}
      >
        <Pressable
          onPress={goToWeb}
          style={{
            flex: 1,
            margin: 5,
            borderRadius: 10,
          }}
        >
          {item.screenShot ? (
            <Image
              style={{ flex: 1 }}
              source={{
                uri: item.screenShot,
              }}
            />
          ) : (
            <View style={{ flex: 1, backgroundColor: "#fff" }}></View>
          )}
        </Pressable>
      </View>
    </View>
  );
}
