import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import testData from "../../test_data/testData";
import dbService from "../../api/dbService";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
    };
    this.loadTestRecipe = this.loadTestRecipe.bind(this);
  }

  async loadTestRecipe() {
    const recipes = await dbService.fetchRecipes();
    console.log(recipes)
    this.setState({
      recipe: recipes[0],
    });
  }

  render() {
      console.log(this.state.recipe)
    return (
      <View style={styles.container}>
          <View style={styles.recipeBox}>
        <Text>TEST PAGE</Text>
        </View>

        <Button
        style={styles.button}
          title="TEST PAGE"
          onPress={() => this.loadTestRecipe()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex:1
    },
    recipeBox: {
        padding:100
        
    },
    button: {
    }
})

export default Main;
