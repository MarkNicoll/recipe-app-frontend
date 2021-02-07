import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Location from "expo-location";
import dbService from "./api/dbService";
import mapService from "./api/mapService";
import recipeService from "./api/recipeService";
import Landing from "./views/landing/landing";
import Main from "./views/main/main";
import List from "./views/list/list";
import Dish from "./views/list/dish";
import Restaurants from "./views/restaurants/restaurants";

const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const existingLocationData = await dbService.getLocationData();

    if (location.coords !== existingLocationData?.coords) {
      console.log("Setting new location...");
      dbService.saveLocationToLocalDB(location);

      const mapData = await mapService.fetchRestaurantData(
        location.coords.latitude,
        location.coords.longitude
      );

      dbService.saveRestaurantDataToLocalDB(mapData);
    }

    const dishData = await recipeService.fetchRecipes();
    dbService.saveDishDataToLocalDB(dishData);
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              cardStyle: { backgroundColor: "#f2f2f2" },
            }}
          >
            <Stack.Screen
              options={{
                headerTitleStyle: {
                  color: "white",
                  fontWeight: "bold",
                },
                headerStyle: { backgroundColor: "#00afb9" },
              }}
              name="Home"
              component={Landing}
            />
            <Stack.Screen
              options={{
                headerTitleStyle: {
                  color: "white",
                  fontWeight: "bold",
                },
                headerStyle: { backgroundColor: "#00afb9" },
              }}
              name="Randomiser"
              component={Main}
            />
            <Stack.Screen
              options={{
                headerTitleStyle: {
                  color: "white",
                  fontWeight: "bold",
                },
                headerStyle: { backgroundColor: "#00afb9" },
              }}
              name="List"
              component={List}
            />
            <Stack.Screen name="Restaurants" component={Restaurants} />
            <Stack.Screen name="Edit Dish" component={Dish} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

export default App;
