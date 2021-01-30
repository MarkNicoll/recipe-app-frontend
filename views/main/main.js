import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { cloneDeep, sample } from 'lodash';
import testData from "../../test_data/testData";
import dbService from "../../api/dbService";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: null,
      isLoading: false,
      currentRecipe: null,
      previouslySelectedRecipes: [],
    };

    this.loadRecipes = this.loadRecipes.bind(this);
    this.selectRecipe = this.selectRecipe.bind(this);
  }

  async componentDidMount() {
    const recipes = await this.loadRecipes();
    this.setState({
      recipes: recipes,
      isLoading: false,
    });
  }

  loadRecipes() {
    this.setState({
      isLoading: true,
    });

    return dbService.fetchRecipes();
  }

  selectRecipe() {
    const { recipes, previouslySelectedRecipes } = this.state;
    let updatedPreviouslySelectedRecipes = [...previouslySelectedRecipes];
    let availableRecipes = [...recipes];

    if (recipes.length === 1) {
      availableRecipes = [...previouslySelectedRecipes];
      updatedPreviouslySelectedRecipes = [];
    }

    const randomRecipe = availableRecipes[Math.floor(Math.random() * recipes.length)];
    updatedPreviouslySelectedRecipes.push(randomRecipe);
    availableRecipes = availableRecipes.filter((recipe) => recipe.id !== randomRecipe.id);
    
    this.setState({
      recipes: availableRecipes,
      currentRecipe: randomRecipe,
      previouslySelectedRecipes: updatedPreviouslySelectedRecipes,
    });
  }

  render() {
    const { recipes, isLoading, currentRecipe } = this.state;

    return (
      <View style={styles.container}>
        {!isLoading ? (
          <View>
            <View style={styles.recipeBox}>
              <Text>{currentRecipe ? currentRecipe.name : "Get Started!"}</Text>
            </View>

            <Button
              style={styles.button}
              title="Randomise!"
              onPress={() => this.selectRecipe()}
            />
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recipeBox: {
    padding: 100,
  },
  button: {},
});

export default Main;
