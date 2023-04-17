import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image, Text } from "react-native";
import { Dimensions } from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { webActions } from "../../../store/web_search";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function FirstPage() {
  let tab = useSelector((state) => state.web_search.tab);
  const dispatch = useDispatch();

  const onPressToSiteWeb = (url) => {
    dispatch(webActions.setURLTab({ id: tab.id, url: url }));
  };

  return (
    <View style={{ backgroundColor: "#e3e2e2", height: height / 3.5 }}>
      <View style={{ flexDirection: "row", marginVertical: 25 }}>
        <TouchableOpacity
          onPress={() => {
            onPressToSiteWeb("https://www.facebook.com");
          }}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/facebook.png")}
          />
          <Text style={styles.text}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onPressToSiteWeb("https://www.instagram.com");
          }}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/instagram.png")}
          />
          <Text style={styles.text}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onPressToSiteWeb("https://www.whatsapp.com");
          }}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/whatsapp.png")}
          />
          <Text style={styles.text}>WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onPressToSiteWeb("https://www.twitter.com");
          }}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/twitter.png")}
          />
          <Text style={styles.text}>Twitter</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginVertical: 25 }}>
        <TouchableOpacity
          onPress={() => {
            onPressToSiteWeb("https://www.vimeo.com");
          }}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/vimeo.png")}
          />
          <Text style={styles.text}>Vimeo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onPressToSiteWeb("https://www.dailymotion.com");
          }}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/daily.png")}
          />
          <Text style={styles.text}>Dailymotion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onPressToSiteWeb("https://www.tubidy.com");
          }}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/tubidy.png")}
          />
          <Text style={styles.text}>Tubidy</Text>
        </TouchableOpacity>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    marginTop: 5,
  },
  image: {
    width: width / 9,
    height: width / 9,
  },
});
