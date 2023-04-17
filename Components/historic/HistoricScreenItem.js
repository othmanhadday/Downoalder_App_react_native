import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Image } from "react-native";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { historic_action } from "../../store/historic_store";
import { webActions } from "../../store/web_search";

export default function HistoricScreenItem({ item, navigation }) {
  const [daysPassed, setDaysPassed] = useState(null);
  let showDeleteCheckbox = useSelector(
    (state) => state.historic_store.showDeleteCheckbox
  );
  let tab = useSelector((state) => state.web_search.tab);

  const dispatch = useDispatch();

  const goToWeb = () => {
    dispatch(webActions.addNewTab());
    dispatch(
      webActions.setURLTab({ id: tab.id, url: item.url, title: item.title })
    );
    navigation.navigate("Home");
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        marginVertical: 5,
        borderRadius: 20,
        padding: 10,
      }}
    >
      <TouchableOpacity
        onPress={goToWeb}
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <Image
          source={{ uri: item.iconURI }}
          style={{ height: 20, width: 20, marginHorizontal: 5 }}
        />
        <View style={{ flex: 1, marginLeft: 10, alignItems: "flex-start" }}>
          <Text>{item.title}</Text>
          <Text numberOfLines={1}>{item.url}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ marginHorizontal: 10, fontSize: 10 }}>
            {moment(JSON.parse(item.date)).format("HH:mm")}
          </Text>

          <Text style={{ marginHorizontal: 10, fontSize: 12 }}>
            {moment(JSON.parse(item.date)).format("DD/MM")}
          </Text>
        </View>

        {!item.checked && showDeleteCheckbox && (
          <TouchableOpacity
            onPress={() => {
              dispatch(historic_action.selectOnecheckbox(item));
            }}
          >
            <Ionicons
              name="square-outline"
              size={30}
              color="#EE6D28"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        )}
        {item.checked && showDeleteCheckbox && (
          <TouchableOpacity
            onPress={() => {
              dispatch(historic_action.selectOnecheckbox(item));
            }}
          >
            <Ionicons
              name="checkbox"
              size={30}
              color="#EE6D28"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
}

export const showCheckboxComponent = () => {
  console.log("showDeleteCheckbox");
  console.log(showDeleteCheckbox);
};
