import { getAllRecipes } from './requests';

const dbService = {
    async fetchRecipes(){
        const recipes = await getAllRecipes();
        return recipes;
    }
} 

export default dbService;