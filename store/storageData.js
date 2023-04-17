import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = (key, value) => {
  try {
    AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    alert(error);
  }
};

const getData = async (key) => {
  try {
    let user = await AsyncStorage.getItem(key);
    let parsed = JSON.parse(user);
    return parsed;
  } catch (error) {
    alert(error);
  }
};

async function mergeData(key, newValue) {
  try {
    AsyncStorage.removeItem(key);
    AsyncStorage.setItem(key, JSON.stringify(newValue));
  } catch (error) {
    alert(error);
  }
}

export { storeData, getData, mergeData };
