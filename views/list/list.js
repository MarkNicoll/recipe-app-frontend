import React from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
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

    recipes.sort(function(a, b) {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });

    this.setState({
      recipes,
    });
  }

  render() {
    const { recipes } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>All Dishes</Text>
      <FlatList
        data={recipes}
        renderItem={({ item }) =>  <View style={styles.listItem}><Text style={styles.item}>{item.name}</Text></View>}
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
    display: 'flex',
    textAlign: 'center',
    height: 40,
    fontSize: 20,
  },
  item: {
    padding: 10,
    fontSize: 16,
    height: 44,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 2,
    height: 60,
    backgroundColor: "white"
  }
});

export default List;
