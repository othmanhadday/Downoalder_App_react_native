import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { FlatList } from "react-native";
import { View } from "react-native";
import { useSelector } from "react-redux";
import HistoricScreenItem from "./HistoricScreenItem";

export default function HistoricScreen({ navigation }) {
  const historic_list = useSelector(
    (state) => state.historic_store.historic_list
  );

/*  const [data, setData] = useState([]);
  useEffect(() => {
    const reversedList = [...list].reverse();

    setData((prevStates) => prevStates.reverse());
  }, []);*/

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={historic_list}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.5}
        onEndReached={() => {}}
        renderItem={({ item }) => (
          <HistoricScreenItem navigation={navigation} item={item} />
        )}
      />
    </View>
  );
}
