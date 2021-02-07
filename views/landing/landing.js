import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-elements";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: null,
      isLoading: false,
      currentRecipe: null,
      previouslySelectedRecipes: [],
    };
  }

  async componentDidMount() {}

  render() {
    const { navigation } = this.props;

    return (
      <View styles={styles.container}>
        <View style={styles.buttonGroupContainer}>
        <Button
            title="Find a Restaurant"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitleStyle}
            onPress={() => navigation.navigate("Restaurants")}
            icon={<Icon name="noodles" size={50} color="#d16f64" />}
          />
          <Button
            title="Find a Dish to Cook"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitleStyle}
            onPress={() => navigation.navigate("Randomiser")}
            icon={<Icon name="pot-steam" size={50} color="#d16f64" />}
          />
          <Button
            title="Bookmarks"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitleStyle}
            onPress={() => navigation.navigate("List")}
            icon={<Icon name="book-outline" size={50} color="#d16f64" />}
          />
          <Button
            title="Manage Dishes"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitleStyle}
            onPress={() => navigation.navigate("List")}
            icon={<Icon name="pencil" size={50} color="#d16f64" />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    textAlign: "center",
    fontSize: 24,
    marginTop: 50,
  },
  buttonGroupContainer: {
    display: "flex",
    flexDirection: "column",
    // flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  button: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '100%'
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '25%',
    borderBottomWidth: 1,
    borderRadius: 5,
    borderColor: "#d6d6d6",
    backgroundColor: 'white'
  },
  buttonTitleStyle: {
    color: "black",
  },
});

export default Main;
