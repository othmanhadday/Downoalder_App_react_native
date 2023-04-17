import { StatusBar } from "expo-status-bar";
import {  StyleSheet } from "react-native";
import { Provider } from "react-redux";
import MainContainer from "./Components/MainContainer";

import store from "./store";



export default function App() {


  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
