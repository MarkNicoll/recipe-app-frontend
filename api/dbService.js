import {
  saveRestaurantData,
  getRestaurantData,
  saveLocationData,
  getLocationData,
  saveDishData,
  getDishData,
} from "./localStorage/localDB";

const dbService = {
  async saveLocationToLocalDB(data) {
    await saveLocationData(data);
  },

  async getLocationData() {
    return await getLocationData();
  },

  async getRestaurantData() {
    return await getRestaurantData();
  },

  async saveRestaurantDataToLocalDB(data) {
    await saveRestaurantData(data);
  },

  async saveDishDataToLocalDB(data) {
    await saveDishData(data);
  },

  async getDishData() {
    return await getDishData();
  },
}

export default dbService;
