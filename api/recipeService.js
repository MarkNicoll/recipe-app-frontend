import { ToastAndroid } from "react-native";
import { getAllRecipes, saveDish } from "./requests";

const recipeService = {
  async fetchRecipes() {
    const recipes = await getAllRecipes();
    return recipes;
  },

  async saveDish(dish){
    const result = await saveDish(dish)
    if(result){
      getAllRecipes();
      console.log(result)
      ToastAndroid.show("Save successful", ToastAndroid.SHORT)
    }else{
      ToastAndroid.show("Error", ToastAndroid.SHORT)
    }
  }
};





export default recipeService;
