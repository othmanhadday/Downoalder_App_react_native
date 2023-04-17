import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./Screens/HomeScreen";
import CustomerHeader from "./CustomHeader";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { webActions } from "../store/web_search";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Downloads from "./Downloads/Downloads";
import HistoricScreen from "./historic/HistoricScreen";
import HistoricHeader from "./historic/HistoricHeader";
import { historic_action } from "../store/historic_store";

const home_screen = "Home";
const historicScreen = "Historic";
const download_screen = "Downloads";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function MainContainer() {
  /*
    REACT Redux 
  */
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const initializeData = async () => {
    try {
      let historics = await AsyncStorage.getItem("historic");
      let nextId_historic = await AsyncStorage.getItem("nextId_historic");
      let parsedHistorics = await JSON.parse(historics);
      await dispatch(
        historic_action.initializeData({
          historics: parsedHistorics,
          nextId_historic: JSON.parse(nextId_historic),
        })
      );
    } catch (error) {
      alert(error);
    }
  };
  useEffect(async () => {
    if (show) {
      initializeData();
      try {
        let tabItem = await AsyncStorage.getItem("tabItem");
        let tabs = await AsyncStorage.getItem("tabs");
        let nextId_web = await AsyncStorage.getItem("nextId_web");
        let parsedTabItem = await JSON.parse(tabItem);
        let parsedTabs = await JSON.parse(tabs);
        //AsyncStorage.clear();

        await dispatch(
          webActions.initializeData({
            tabItem: parsedTabItem,
            tabs: parsedTabs,
            nextId: nextId_web,
          })
        );
        setShow(false);
      } catch (error) {
        alert(error);
      }
    }
  }, []);

  function HomeTabs() {
    return (
      <Tab.Navigator
        initialRouteName={home_screen}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === home_screen) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === historicScreen) {
              iconName = focused ? "list" : "list-outline";
            } else if (rn === download_screen) {
              iconName = focused ? "download" : "download-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "grey",
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { height: 70, marginTop: 10 },
        }}
      >
        <Tab.Screen
          name={home_screen}
          options={({ navigation }) => ({
            headerTitle: "Home",
            header: () => <CustomerHeader navigation={navigation} />,
          })}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              e.preventDefault();
              dispatch(webActions.SwitchHomeScreen(1));
              navigation.navigate("Home");
            },
          })}
          component={HomeScreen}
        ></Tab.Screen>
        <Tab.Screen
          options={({ navigation }) => ({
            headerTitle: "Home",
            header: () => <HistoricHeader navigation={navigation} />,
          })}
          name={historicScreen}
          component={HistoricScreen}
        ></Tab.Screen>
        <Tab.Screen name={download_screen} component={Downloads}></Tab.Screen>
      </Tab.Navigator>
    );
  }

  return (
    <>
      {!show && (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="HomeScreen"
              component={HomeTabs}
            />
            {
              // <Stack.Screen name="TabsScreen" component={TabsScreen} />
            }
          </Stack.Navigator>
        </NavigationContainer>
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
});
