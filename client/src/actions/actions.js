const axios = require('axios');

export function getRecipes(titulo) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/recipes?name=${titulo}`)
        .then(response => response.json())
        .then(json => {
        dispatch({ type: "GET_RECIPES", payload: json });
        });
    };
}

export function getRecipeDetail(idRecipe) {     
    return function(dispatch) {         // store.dispatch()
        fetch(`http://localhost:3001/recipes/${idRecipe}`)
        .then(response => response.json())
        .then(data => {                         // guarda aca la data que le mande a buscar
        dispatch({ type: "GET_RECIPE_DETAILS", payload: data });     // paso la data que busque a la redux function
        });
    };
}

export default function postRecipe(postData) {
    axios({
        url: 'http://localhost:3001/recipe',
        method: 'post',
        data: postData
    })
}