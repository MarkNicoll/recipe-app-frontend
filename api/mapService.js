import { getRestaurantData, getMapDataForCuisine } from "./requests";

const mapService = {
  async fetchRestaurantData(latitude, longitude) {
    const cuisines = ["sushi", "indian", "fine+dining", "traditonal", "pizza", "korean", "middle+eastern", "top+rated"]
    let result;
    let restaurantData = [];

    for(let i = 0; i < cuisines.length; i++){
      result = await getMapDataForCuisine(latitude, longitude, cuisines[i]);
      restaurantData = [...restaurantData, ...result.results]
    }
    
    return restaurantData;
  },
};



export default mapService;