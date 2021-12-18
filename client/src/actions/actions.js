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

// export function getRecipeDetail(idRecipe) {     
//     return async function(dispatch) {         // store.dispatch()
//         fetch(`http://localhost:3001/recipes/${idRecipe}`)
//         .then(response => response.json())
//         .then(data => {                         // guarda aca la data que le mande a buscar
//         dispatch({ type: "GET_RECIPE_DETAILS", payload: data });     // paso la data que busque a la redux function
//         });
//     };
// }

export function getRecipeDetail(idRecipe) {     
    return async function(dispatch) {         // store.dispatch()
        let promise = await axios.get(`http://localhost:3001/recipes/${idRecipe}`)
        let response = promise.data;
        dispatch({ type: "GET_RECIPE_DETAILS", payload: response });
    };
}

export default function postRecipe(postData) {
    axios({
        url: 'http://localhost:3001/recipe',
        method: 'post',
        data: postData
    })
}

export function filterAZ() {   

    return function(dispatch) {         // store.dispatch()
        dispatch({ type: "FILTER_AZ" });
    };
}

export function filterZA() {     
    return function(dispatch) {         // store.dispatch()
        dispatch({ type: "FILTER_ZA" }); 
    };
}

export function filterMAX() {     
    return function(dispatch) {         // store.dispatch()
        dispatch({ type: "FILTER_MAX" });
    };
}

export function filterMIN() {     
    return function(dispatch) {         // store.dispatch()
        dispatch({ type: "FILTER_MIN" });
    };
}

export function filterDiet(data) {     
    return function(dispatch) {         // store.dispatch()
        dispatch({ type: "FILTER_DIET", payload: data });
    };
}

export function clearDetail() {     
    return({ type: "CLEAR_DETAIL"});
}
