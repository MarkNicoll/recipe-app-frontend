import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import dbService from "../../api/dbService";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };
  }

  async componentDidMount() {
    const recipes = await dbService.getDishData();

    recipes.sort(function (a, b) {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    this.setState({
      recipes,
    });
  }

  render() {
    const { recipes } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.openButtonColumn}></View>
        <Text style={styles.header}>All Dishes</Text>
        <View style={styles.openButtonColumn}>
            <Button
              raised={true}
              title="Add New"
              buttonStyle={styles.openButton}
              titleStyle={styles.openButtonTitleStyle}
              containerStyle={styles.openButtonContainer}
              onPress={() => navigation.navigate("Edit Dish", {
                dish: { name: "", notes: "" },
              })}
            />
           </View>
           </View>
        <FlatList
        keyExtractor={item => item.id.toString()}
          data={recipes}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text
                style={styles.item}
                onPress={() =>
                  navigation.navigate("Edit Dish", {
                    dish: item,
                  })
                }
              >
                {item.name}
              </Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  header: {
    display: "flex",
    textAlign: "center",
    height: 40,
    width: '60%',
    fontSize: 20,
    paddingTop: 5
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingBottom: 10
  },
  item: {
    padding: 10,
    fontSize: 16,
    height: 44,
  },
  listItem: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 2,
    height: 60,
    backgroundColor: "white",
  },
  openButton: {
    padding:1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
    backgroundColor: "#00afb9",
    width: 60,
    height: 40,
    fontSize: 10,
  },
  openButtonContainer: {
    marginTop: 1,
    marginBottom: 1,
    backgroundColor: "#f2f2f2",
    width: 60,
    height: 40,
  },
  openButtonTitleStyle: {
    color: "white",
    fontSize: 12
  },
  openButtonColumn: {
    width: '20%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 40
  },
});

export default List;
