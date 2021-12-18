var express = require('express');
var router = express.Router();
require('dotenv').config();
const API_KEY = process.env.API_KEY;
const API_KEY2 = process.env.API_KEY2;
const API_KEY3 = process.env.API_KEY3;
const axios = require('axios');
const { Recipe, Diet } = require('../db');

const fetchAmount = 100;

router.get('/', async (req,res)=>{

    let { name } = req.query;

    if (!name) return res.status(400).send({message: 'No se recibio el nombre de la receta'});

    const arr = name.split(" ");      // capitalizamos las primeras letras para prolijidad y mejor filtrado
    
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    name = arr.join(" ");
    

    try{
        var recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&number=${fetchAmount}&addRecipeInformation=true`)
    }catch(e){
        res.sendStatus(500).send('Problemas con el servidor de Spoonacular');
    }
    
    let result = [];

    for(let i = 0;i < recipes.data.results.length; i++){   // itera la cantidad de veces que recetas tengas

        result[i] = {
            title: recipes.data.results[i].title,
            image: recipes.data.results[i].image,
            diet: recipes.data.results[i].diets,
            id: recipes.data.results[i].id,
            rating: recipes.data.results[i].spoonacularScore
        };

    }

    let dbRecipes = await Recipe.findAll({include: Diet});

    if (dbRecipes.length){

        dbRecipes.forEach(r=>{     // para cada receta encontrada

            if (r.dataValues.title.includes(name)){   // si contiene la palabra a buscar

                let allDietsArray = [];

                for(let i = 0; i < r.dataValues.Diets.length; i++){     // iteramos sobre todas las dietas de esta receta
                    allDietsArray.push(r.dataValues.Diets[i].dataValues.name);   // y guardamos los nombres en un array
                }

                result.unshift({          // le pusheamos la receta de la base de datos a los resultados.
                    title: r.dataValues.title,
                    image: r.dataValues.image,
                    diet: allDietsArray,
                    id: -Math.abs(r.dataValues.id),
                    rating: r.dataValues.rating,
                    healthScore: r.dataValues.healthScore
                });
            }
        });

    }

    res.send(result);

}); 

module.exports = router;