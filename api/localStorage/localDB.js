import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveRestaurantData(value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@map_data", jsonValue);
  } catch (error) {
    console.log(error);
  }
}

export async function getRestaurantData() {
  try {
    const jsonValue = await AsyncStorage.getItem('@map_data')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
  }
}

export async function getLocationData() {
  try {
    const jsonValue = await AsyncStorage.getItem('@location_data')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
  }
}

export async function saveLocationData(value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@location_data", jsonValue);
  } catch (error) {
    console.log(error);
  }
}

export async function getDishData() {
  try {
    const jsonValue = await AsyncStorage.getItem('@dish_data')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
  }
}

export async function saveDishData(value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@dish_data", jsonValue);
  } catch (error) {
    console.log(error);
  }
}
