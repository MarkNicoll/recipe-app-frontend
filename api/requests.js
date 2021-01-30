
export function getAllRecipes() {
    fetch('http://10.0.2.2:8000/recipeapi/dishes',
        {
            method: 'GET'
        }
    ).then(response => {
    return response})
    .catch(error => {
      console.error(error);
    });
}
