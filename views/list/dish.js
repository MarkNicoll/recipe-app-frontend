import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import recipeService from "../../api/recipeService";

function Dish({ route, navigation }) {
  const { dish } = route.params;
  const [name, setName] = useState(dish ? dish.name : null);
  const [notes, setNotes] = useState(notes ? dish.notes : null);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          label="Name"
          placeholder="Dish name"
          defaultValue={dish.name}
          style={styles.nameInput}
          onChangeText={(value) => setName(value)}
        />
        <Input
          label="Notes"
          placeholder="Notes"
          defaultValue={dish.notes}
          inputStyle={styles.notesInput}
          onChangeText={(value) => setName(value)}
        />
      </View>
      <View style={styles.buttonBox}>
        <Button
          style={styles.button}
          raised={true}
          title="Save"
          buttonStyle={styles.button}
          buttonTitleStyle={styles.buttonTitleStyle}
          containerStyle={styles.buttonContainer}
          onPress={() => recipeService.saveDish(dish)}
        />
      </View>
      <View style={styles.buttonBox}>
        <Button
          style={styles.cancelButton}
          raised={true}
          title="Cancel"
          buttonStyle={styles.cancelButton}
          buttonTitleStyle={styles.buttonTitleStyle}
          containerStyle={styles.cancelButtonContainer}
          onPress={() => this.handleOnRandomClick()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  buttonBox: {
    width: "96%",
    alignSelf: "center",
  },
  inputContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: 1,
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
  cancelButton: {
    padding: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
    backgroundColor: "#f07167",
  },

  buttonTitleStyle: {
    color: "black",
  },
  buttonContainer: {
    marginTop: 1,
    marginBottom: 1,
    backgroundColor: "#f07167",
  },
  cancelButtonContainer: {
    marginTop: 1,
    marginBottom: 1,
    backgroundColor: "#f2f2f2",
  },
  notesInput: {
    height: 300,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Dish;
