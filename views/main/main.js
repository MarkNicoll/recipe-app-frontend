import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import testData from '../../test_data/testData';
import dbService from '../../api/dbService';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: null
        }
        this.loadTestRecipe = this.loadTestRecipe.bind(this);
      }


      loadTestRecipe(){
          const recipes = dbService.fetchRecipes();
          this.setState({
              recipe: recipes[0]
          })
      }

  render() {
    return (
      <View >
        <Text>{this.state.recipe?.name}</Text>

        <Button
          title="Add some friends"
          onPress={() =>
            this.loadTestRecipe()
          }
        />
      </View>
    );
  }
}
  
export default Main;