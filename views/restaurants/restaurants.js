import React from "react";
import MapView from "react-native-maps";
import * as WebBrowser from "expo-web-browser";
import { Marker } from "react-native-maps";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button, CheckBox } from "react-native-elements";
import dbService from "../../api/dbService";

class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalRestaurantData: null,
      restaurantData: null,
      randomRestaurant: null,
      filters: {
        cuisine: null,
        price: null,
        names: ["Domino's Pizza"],
        types: ["point_of_interest", "landmark"],
      },
      selectedCheckbox: null,
      region: null,
    };

    this.handleCheckboxSelected = this.handleCheckboxSelected.bind(this);
    this.getRandomRestaurant = this.getRandomRestaurant.bind(this);
    this.handleOnRandomClick = this.handleOnRandomClick.bind(this);
    this.getPriceLevel = this.getPriceLevel.bind(this);
    this.handleOpenBrowser = this.handleOpenBrowser.bind(this);
  }

  async componentDidMount() {
    const { filters } = this.state;
    let originalRestaurantData = await dbService.getRestaurantData();
    let restaurantData = [...originalRestaurantData];

    restaurantData = restaurantData.filter((restaurant) => {
      if (!filters.names.find((name) => name === restaurant.name)) {
        return restaurant;
      }
    });

    const randomRestaurant =
      originalRestaurantData[Math.floor(Math.random() * originalRestaurantData.length)];

    const region = {
      latitude: randomRestaurant.geometry.location.lat,
      longitude: randomRestaurant.geometry.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.004,
    };

    this.setState({
      originalRestaurantData: restaurantData,
      region,
      randomRestaurant,
      restaurantData,
    });
  }

  handleCheckboxSelected(selection) {
    const { filters } = this.state;

    filters.cuisine = selection;

    this.setState({
      selectedCheckbox: selection,
      filters,
    });
  }

  getRandomRestaurant(restaurantData) {
    const randomRestaurant =
      restaurantData[Math.floor(Math.random() * restaurantData.length)];

    return randomRestaurant;
  }

  async handleOnRandomClick() {
    const { restaurantData, originalRestaurantData } = this.state;
    let newrestaurantData;

    if(newrestaurantData?.length === 1){
      newrestaurantData = [...originalRestaurantData]
    }else{
      newrestaurantData = [...restaurantData];
    }

    const randomRestaurant = await this.getRandomRestaurant(newrestaurantData);

    newrestaurantData = newrestaurantData.filter(function (item) {
      return item.name !== randomRestaurant.name;
    });

    const region = {
      latitude: randomRestaurant.geometry.location.lat,
      longitude: randomRestaurant.geometry.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.004,
    };

    this.mapView.animateToRegion(region, 1000);

    this.setState({ randomRestaurant, region, restaurantData: newrestaurantData });
  }

  getPriceLevel(price) {
    switch (price) {
      case 0:
        return "Free";
      case 1:
        return "€";
      case 2:
        return "€€";
      case 3:
        return "€€€";
      case 4:
        return "€€€€";
      default:
        return "N/A";
    }
  }

  handleOpenBrowser() {
    const { randomRestaurant } = this.state;
    WebBrowser.openBrowserAsync(
      "https://www.google.com/search?q=" + randomRestaurant.name + "&" + randomRestaurant.formatted_address
    );
  }

  render() {
    const { randomRestaurant, originalRestaurantData, selectedCheckbox, region } = this.state;
    const priceLevel = this.getPriceLevel(randomRestaurant?.price_level);

    return (
      <View style={styles.container}>
        {region && (
          <MapView
            ref={(ref) => (this.mapView = ref)}
            style={styles.map}
            initialRegion={region}
          >
            <Marker coordinate={region} />
          </MapView>
        )}

        <View style={styles.mapOverlay}>
        <View style={styles.overlayRow}>
          <View style={styles.nameColumn}>
            <Text style={styles.name}>{randomRestaurant?.name}</Text>

            </View>
            <View style={styles.openButtonColumn}>
            <Button
              raised={true}
              title="Open in browser"
              buttonStyle={styles.openButton}
              titleStyle={styles.openButtonTitleStyle}
              containerStyle={styles.openButtonContainer}
              onPress={() => this.handleOpenBrowser()}
            />
           </View>
          </View>
          <View style={styles.overlayRow}>
            <View style={styles.ratingsBox}>
              <Text style={styles.title}>Google User Rating</Text>
              <Text style={styles.rating}>{randomRestaurant?.rating}</Text>
            </View>
            <View style={styles.costBox}>
              <Text style={styles.title}>Price Range</Text>
              <Text style={styles.cost}>{priceLevel}</Text>
            </View>
          </View>
          <View style={styles.overlayRow}>
            <View style={styles.addressRow}>
            {/* <Text style={styles.title}>Address: </Text> */}
            <Text>{randomRestaurant?.vicinity}</Text>
            </View>
          </View>
          {/* <View style={styles.overlayRow}>
            <Text style={styles.title}>Open now: </Text>
            <Text>{randomRestaurant?.open_now ? "Yes" : "No"}</Text>
          </View> */}
           <View style={styles.buttonsContainer}>
          <View style={styles.buttonBox}>
            <Button
              style={styles.button}
              raised={true}
              title="Randomise!"
              buttonStyle={styles.button}
              buttonTitleStyle={styles.buttonTitleStyle}
              containerStyle={styles.buttonContainer}
              onPress={() => this.handleOnRandomClick()}
            />
          </View>
         
        </View>
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
  map: {
    width: 400,
    height: 300,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#00afb9",
    position: "relative",
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
  buttonBox: {
    width: "100%",
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
  mapOverlay: {
    display: "flex",
    flexDirection: "column",
    height: "30%",
    width: "99%",
    padding: 5,
  },
  overlayRow: {
    display: "flex",
    flexDirection: "row",
    padding: 2,
    justifyContent: 'center',
    margin: 2,
    backgroundColor: "white",
    width: '98%',
    height: '33%'

  },
  title: {
  },
  browserButton: {
    textDecorationLine: "underline",
    color: "blue",
  },
  nameColumn: {
    fontSize: 15,
    flexDirection: 'column',
    height: '100%',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  openButtonColumn: {
    alignContent: 'center',
    fontSize: 15,
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    padding: 5
  },
  ratingsBox: {
    height: "40%",
    width: "49%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "1%",
    backgroundColor: "#f7f7f7",
  },
  costBox: {
    height: "40%",
    width: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    margin: "1%",
  },
  cost: {
    fontSize: 18,
    padding: 5,
  },
  rating: {
    fontSize: 20,
    padding: 5,
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
  addressRow: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Restaurants;
