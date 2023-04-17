import React, { useEffect, useState } from "react";
import {
  Linking,
  Button,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { webActions } from "../store/web_search";
import Ionicons from "react-native-vector-icons/Ionicons";
import { historic_action } from "../store/historic_store";

export default function CustomHeader({ navigation }) {
  let tab = useSelector((state) => state.web_search.tab);
  let data = useSelector((state) => state.web_search.data);
  const home_screen = useSelector((state) => state.web_search.home_screen);

  const dispatch = useDispatch();
  let [text, setText] = useState("");

  useEffect(() => {
    if (tab.url != "about:blank") {
      setText(tab?.url);
    }
  }, [tab?.url]);

  const handleTextChange = (inputText) => {
    setText(inputText);
  };

  const handleSubmit = () => {
    if (text.includes("https://") || text.includes("http://")) {
      Linking.canOpenURL(text).then((supported) => {
        if (!supported) {
          console.log(`Unable to handle URL: ${text}`);
        } else {
          dispatch(webActions.setURLTab({ id: tab.id, url: text, title: "" }));
        }
      });
    } else {
      text = "www.google.com/search?q=" + text;
      dispatch(webActions.setURLTab({ id: tab.id, url: text, title: "" }));
    }
    Keyboard.dismiss();
  };

  const goToTabs = () => {
    home_screen == 1
      ? dispatch(webActions.SwitchHomeScreen(2))
      : dispatch(webActions.SwitchHomeScreen(1));
  };

  return (
    <>
      {home_screen == 1 ? (
        <View style={styles.header}>
          <TouchableOpacity
            onPress={goToTabs}
            title="1"
            style={{
              borderColor: "gray",
              borderWidth: 3,
              paddingHorizontal: 7,
              paddingVertical: 3,
              marginBottom: 5,
              borderRadius: 5,
            }}
          >
            <Text>{data.length}</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            onChangeText={handleTextChange}
            onSubmitEditing={handleSubmit}
            value={text}
            keyboardType="url"
            selectTextOnFocus={true}
            style={styles.input}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: "#EE6D28",
              width: 35,
              height: 35,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="send"
              size={20}
              color="white"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 50,
    paddingBottom: 10,
  },
  input: {
    flex: 40,
    height: 40,
    paddingVertical: 5,
    alignSelf: "center",
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 5,
  },
});

  