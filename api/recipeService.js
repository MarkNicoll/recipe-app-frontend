import { getAllRecipes } from "./requests";

const recipeService = {
  async fetchRecipes() {
    const recipes = await getAllRecipes();
    return recipes;
  },
};



export default recipeService;
