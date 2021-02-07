export function getAllRecipes() {
  return fetch("https://slurp-recipe-api.herokuapp.com/recipeapi/dishes", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {return response.json()})
    .catch((error) => {
      console.error(error);
    });
}

export function saveDish(dish){
  console.log(dish)
  console.log('sending...')
  return fetch("https://slurp-recipe-api.herokuapp.com/recipeapi/dishes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body:  JSON.stringify(dish)
  })
    .then((response) => {return response.json()})
    .catch((error) => {
      console.error(error);
    });
}


export function getRestaurantData(latitude, longitude) {
  return fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?query&location=" + latitude + "," + longitude + "&radius=8000&type=restaurant&key=AIzaSyCjmxwurEe_FlrGyG1kkmLuI6RkgMCqFxE", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
        return responseJson
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getMapDataForCuisine(latitude, longitude, cuisine) {
  return fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?query=" + cuisine + "&location=" + latitude + "," + longitude + "&radius=8000&type=restaurant&key=AIzaSyCjmxwurEe_FlrGyG1kkmLuI6RkgMCqFxE", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
        return responseJson
    })
    .catch((error) => {
      console.error(error);
    });
}


