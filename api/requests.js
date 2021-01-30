export function getAllRecipes() {
  return fetch("https://slurp-recipe-api.herokuapp.com/recipeapi/dishes", {
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
