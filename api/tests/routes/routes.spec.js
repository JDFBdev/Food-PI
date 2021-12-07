/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Milanea a la napolitana',
  summary: 'Comida argentina'
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));

  describe('GET /recipes', () => {

    it('should get 200', () =>
      agent.get('/recipes?name=pizza').expect(200)
    );

    it('should get a recipe within an object within an array', () =>
      agent.get('/recipes?name=sushi').expect([{"title":"Japanese Sushi","image":"https://spoonacular.com/recipeImages/648506-312x231.jpg","diet":["gluten free","dairy free","pescatarian"],"id":648506,"rating":84},{"title":"Make It Quick Italian Shrimp Rolls","image":"https://spoonacular.com/recipeImages/650651-312x231.jpg","diet":["pescatarian"],"id":650651,"rating":67}])
    );

    it('should get a message when query not passes', () =>
      agent.get('/recipes').expect({'message': "No se recibio el nombre de la receta"})
    );

    it('should get an empty object when recipes are nout found', () =>
      agent.get('/recipes?name=sefsefdf').expect([])
    );

  });

  describe('GET /recipes/id', () => {

    it('should get 200', () =>
      agent.get('/recipes/200').expect(200)
    );

    it('should get a recipe detail', () =>
      agent.get('/recipes/200').expect({
        "title": "Chicken Caesar Salad With Anchovy-caesar Vinaigrette And Garlic",
        "image": "https://spoonacular.com/recipeImages/200-556x370.jpg",
        "diet": [],
        "id": 200,
        "rating": 91,
        "summary": "Chicken Caesar Salad With Anchovy-caesar Vinaigrette And Garlic might be just the main course you are searching for. This recipe makes 4 servings with <b>852 calories</b>, <b>55g of protein</b>, and <b>47g of fat</b> each. For <b>$4.88 per serving</b>, this recipe <b>covers 53%</b> of your daily requirements of vitamins and minerals. It is a <b>pretty expensive</b> recipe for fans of American food. This recipe is liked by 3 foodies and cooks. A mixture of worcestershire sauce, chicken breasts, worcestershire sauce, and a handful of other ingredients are all it takes to make this recipe so delicious. To use up the granulated sugar you could follow this main course with the <a href=\"https://spoonacular.com/recipes/strawberry-lavender-shortcakes-758236\">Strawberry-Lavender Shortcakes</a> as a dessert. All things considered, we decided this recipe <b>deserves a spoonacular score of 91%</b>. This score is super. Try <a href=\"https://spoonacular.com/recipes/chicken-caesar-salad-with-garlic-croutons-and-light-caesar-dressing-626015\">Chicken Caesar Salad with Garlic Croutons {and Light Caesar Dressing}</a>, <a href=\"https://spoonacular.com/recipes/caesar-salad-with-anchovy-wrapped-garlic-and-savory-lemon-sabayon-221\">Caesar Salad with Anchovy Wrapped Garlic and Savory Lemon Sabayon</a>, and <a href=\"https://spoonacular.com/recipes/kale-caesar-salad-+-caesar-vinaigrette-719259\">Kale Caesar Salad + Caesar Vinaigrette</a> for similar recipes.",
        "steps": "Preheat the oven to 425 F.                                  Blend anchovies, 2 cloves of the minced garlic, lemon juice, mustard, sugar, 6 tablespoons of the finely grated Parmesan, and the Worcestershire sauce until smooth.                                  With the blender running, stream in 1/2 cup olive oil until the dressing is thick and fully emulsified.                                  Brush chicken breasts with a few tablespoons of the dressing and grill or broil until cooked through. Cool and slice or chop.                                  Wash and dry lettuce, then cut it however you like (I prefer chopping it into 1-inch pieces).                                  Open baguette by cutting it in half, cut each half into 1-inch croutons, and toss it with 2 tablespoons olive oil and 1 clove minced garlic. Bake in the preheated oven until crunchy, about 10 minutes (be careful to make sure the garlic doesn't burn!). Sprinkle the remaining 2 tablespoons of finely grated Parmesan on top of the croutons, then put back in oven until the cheese is melted.                                  Assemble the salad by dressing the romaine to taste, mixing in the croutons and the grilled chicken, and topping with shaved Parmesan. Enjoy!",
        "healthScore": 77
    }));

    it('should get error when id not found', () =>
    agent.get('/recipes/202').expect(500)
    );

  });




});
