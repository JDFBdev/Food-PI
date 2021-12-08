const initialState = {
    recipesAux: [],
    recipesLoaded: [],
    recipeDetail: {}
  };

  function rootReducer(state = initialState, action) {
    if (action.type === "GET_RECIPES") {
        return {
          ...state,
          recipesLoaded: action.payload, recipesAux: action.payload
        };
    }
    if (action.type === "GET_RECIPE_DETAILS") {
        return {
          ...state,
          recipeDetail: action.payload            // uso action cuando trabajo con la data que se me pasa. Uso state cuando trabajo con el estado
        };
    }
    if (action.type === "FILTER_AZ") {
      const recipes = state.recipesLoaded;
      return {
        ...state,
        recipesLoaded: recipes.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
      };
    }
    if (action.type === "FILTER_ZA") {
      const recipes = state.recipesLoaded;
      return {
        ...state,
        recipesLoaded: recipes.sort((a,b) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0))
      };
    }
    if (action.type === "FILTER_MAX") {
      const recipes = state.recipesLoaded;
      return {
        ...state,
        recipesLoaded: recipes.sort((a,b) => (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0))
      };
    }
    if (action.type === "FILTER_MIN") {
      const recipes = state.recipesLoaded;
      return {
        ...state,
        recipesLoaded: recipes.sort((a,b) => (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0))
      };
    }
    if (action.type === "FILTER_DIET") {
      const recipes = state.recipesAux.filter(r=>{ return r.diet.includes(action.payload); })
      return {
        ...state,
        recipesLoaded: recipes
      };
    }
    return state;
  }
  
  export default rootReducer;