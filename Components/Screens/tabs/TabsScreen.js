import React from "react";
import { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { webActions } from "../../../store/web_search";
import TabItem from "./TabItem";

export default function TabsScreen({ navigation, tab }) {
  const dispatch = useDispatch();
  let data = useSelector((state) => state.web_search.data);
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    console.log(data);
  }, []);

  addNewTab = () => {
    dispatch(webActions.SwitchHomeScreen(1));
    dispatch(webActions.addNewTab());
  };

  return (
    <View>
      <View
        style={{
          height: screenHeight / 10,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          backgroundColor: "#EE6D28",
        }}
      >
        <TouchableOpacity
          onPress={addNewTab}
          style={{
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              marginLeft: 20,
              marginBottom: 5,
              fontWeight: "bold",
              color: "white",
            }}
          >
            +
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginHorizontal: 10,
              marginBottom: 5,
              fontWeight: "bold",
              textAlignVertical: "center",
              color: "white",
            }}
          >
            New tab
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        numColumns={2}
        columnWrapperStyle={{
          width: screenWidth,
          justifyContent: "flex-start",
        }}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          // console.log("onEndReached");
        }}
        renderItem={({ item }) => (
          <TabItem navigation={navigation} item={item} tab={tab}/>
        )}
      />
    </View>
  );
}
