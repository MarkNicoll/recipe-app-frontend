import React from "react";
import { StyleSheet, Text, View, Vibration } from "react-native";
import * as Animatable from "react-native-animatable";
import { Button, CheckBox } from "react-native-elements";
import testData from "../../test_data/testData";
import dbService from "../../api/dbService";

const total = 5;
const speedIncrement = 10;
let speed = 20;
let counter = 0;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: null,
      isLoading: false,
      currentRecipe: null,
      previouslySelectedRecipes: [],
      shouldAnimate: false,
    };

    this.loadRecipes = this.loadRecipes.bind(this);
    this.selectRecipe = this.selectRecipe.bind(this);
    this.handleRandomise = this.handleRandomise.bind(this);
  }

  async componentDidMount() {
    const recipes = await this.loadRecipes();

    this.setState({
      originalRecipes: [...recipes],
      recipes: recipes,
      isLoading: false,
      gettingNewDish: false,
    });
  }
  s;

  loadRecipes() {
    this.setState({
      isLoading: true,
    });

    return dbService.getDishData();
  }

  spin() {
    if (counter < total) {
      this.view_2.shake(80).then((endState) => {
        counter++;
        speed = speed + speedIncrement;
        endState.finished && this.spin();
      });
    } else {
      counter = 0;
      speed = 50;
      this.view_2.fadeOut(50);
      this.selectRecipe();
    }
  }

  handleRandomise() {
    this.setState({
      gettingNewDish: true,
    });

    this.spin();
  }

  selectRecipe() {
    const { recipes, previouslySelectedRecipes, originalRecipes } = this.state;
    let updatedPreviouslySelectedRecipes = [...previouslySelectedRecipes];
    let availableRecipes = [...recipes];

    this.view_2.bounceIn(1000);

    if (recipes.length === 1) {
      availableRecipes = [...originalRecipes];
      updatedPreviouslySelectedRecipes = [];
    }

    const randomRecipe =
      availableRecipes[Math.floor(Math.random() * availableRecipes.length)];

    updatedPreviouslySelectedRecipes.push(randomRecipe);
    availableRecipes = availableRecipes.filter(
      (recipe) => recipe.id !== randomRecipe.id
    );

    this.setState({
      recipes: availableRecipes,
      currentRecipe: randomRecipe,
      previouslySelectedRecipes: updatedPreviouslySelectedRecipes,
      shouldAnimate: true,
      gettingNewDish: false,
    });
  }

  handleViewRef = (ref) => (this.view = ref);
  handleViewRef_2 = (ref) => (this.view_2 = ref);

  render() {
    const { isLoading, currentRecipe, gettingNewDish } = this.state;
    let recipeContainerStyle;
    let dish;

    if (gettingNewDish) {
      recipeContainerStyle = {
        width: "100%",
        height: "40%",
        backgroundColor: "white",
        marginTop: 1,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#d6d6d6",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      };
    } else {
      recipeContainerStyle = {
        width: "100%",
        height: "40%",
        backgroundColor: "white",
        marginTop: 1,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#d6d6d6",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      };
    }

    if (currentRecipe?.name) {
      dish = currentRecipe.name;
    } else {
      dish = "Get Started!";
    }

    return (
      <View style={styles.container}>
        <Animatable.View
          style={styles.animationContainer}
          ref={this.handleViewRef}
        >
          <View style={recipeContainerStyle}>
            <Animatable.Text ref={this.handleViewRef_2}>
              <Text style={styles.recipeTitle}>{dish}</Text>
            </Animatable.Text>
          </View>
        </Animatable.View>
        {!isLoading ? (
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonBox}>
              <Button
                style={styles.button}
                raised={true}
                title="Randomise!"
                buttonStyle={styles.button}
                buttonTitleStyle={styles.buttonTitleStyle}
                containerStyle={styles.buttonContainer}
                onPress={this.handleRandomise}
              />
            </View>
            <View styles={styles.checkboxGroup}>
              <CheckBox
                center
                title="Filter one goes here"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={this.state.checked}
                containerStyle={styles.checkboxContainer}
                checkedColor="#f07167"
              />
              <CheckBox
                center
                title="Filter one goes her"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={this.state.checked}
                containerStyle={styles.checkboxContainer}
                checkedColor="#f07167"
              />
              <CheckBox
                center
                title="Filter one goes her"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={this.state.checked}
                containerStyle={styles.checkboxContainer}
                checkedColor="#f07167"
              />
            </View>
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  recipeTitle: {
    fontSize: 24,
  },
  animationContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBox: {
    width: "88%",
    alignSelf: "center",
  },
  button: {
    padding: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
    backgroundColor: "#00afb9",
  },
  buttonTitleStyle: {
    color: "black",
  },
  buttonContainer: {
    marginTop: 1,
    marginBottom: 1,
    backgroundColor: "#f2f2f2",
  },
  buttonsContainer: {
    width: "100%",
  },
  checkboxGroup: {
    marginTop: 20,
    width: "100%",
  },
  checkboxContainer: {
    height: 70,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
});

export default Main;
