import React, { useState } from "react";
import { useEffect } from "react";
import { Text, Touchable, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { historic_action } from "../../store/historic_store";

export default function HistoricHeader({ navigation }) {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  const [showDeleteHead, setShowDeleteHead] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  let totalSelectedList = useSelector(
    (state) => state.historic_store.totalSelectedList
  );

  const dispatch = useDispatch();

  return (
    <View
      style={{
        backgroundColor: "#EE6D28",
        height: height / 10,
        alignItems: "flex-end",
        padding: 10,
      }}
    >
      {showDeleteHead == false ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{ flex: 1, fontSize: 24, fontWeight: "900", color: "#000" }}
          >
            Historic
          </Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(historic_action.toggleShowDeleteCheckbox());
              setShowDeleteHead(true);
            }}
          >
            <Ionicons name="trash" size={25} />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            flex: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              dispatch(historic_action.toggleShowDeleteCheckbox());
              setShowDeleteHead(false);
            }}
          >
            <Ionicons name="arrow-back" size={30} />
          </TouchableOpacity>
          <Text
            style={{
              flex: 1,
              fontSize: 24,
              marginLeft: width / 10,
              fontWeight: "600",
              color: "#000",
            }}
          >
            {totalSelectedList} Selected
          </Text>
          <TouchableOpacity
            onPress={() => {
              setSelectAll(selectAll == true ? false : true);
              dispatch(historic_action.selectAllcheckbox(selectAll));
            }}
            style={{
              height: 25,
              width: 25,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#fff",
              marginHorizontal: 10,
              borderWidth: 3,
              borderStyle: "dotted",
            }}
          >
            <View
              style={{
                height: 15,
                width: 15,
                borderColor: "#fff",
                borderWidth: 2,
              }}
            ></View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              dispatch(historic_action.deletecheckedData());
            }}
          >
            <Ionicons name="trash" color={"#fff"} size={25} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
