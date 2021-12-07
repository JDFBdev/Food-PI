const initialState = {
    recipesLoaded: [],
    recipeDetail: {}
  };

  function rootReducer(state = initialState, action) {
    if (action.type === "GET_RECIPES") {
        return {
          ...state,
          recipesLoaded: action.payload
        };
    }
    if (action.type === "GET_RECIPE_DETAILS") {
        return {
          ...state,
          recipeDetail: action.payload            // uso action cuando trabajo con la data que se me pasa. Uso state cuando trabajo con el estado
        };
    }
    return state;
  }
  
  export default rootReducer;