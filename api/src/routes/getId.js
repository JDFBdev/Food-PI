var express = require('express');
var router = express.Router();
require('dotenv').config();
const API_KEY = process.env.API_KEY;
const API_KEY2 = process.env.API_KEY2;
const API_KEY3 = process.env.API_KEY3;
const axios = require('axios');
const { Recipe, Diet } = require('../db');

const fetchAmount = 5;

router.get('/:idReceta', async (req,res)=>{

    let { idReceta } = req.params;
    
    if (!idReceta) return res.status(400).send({message: 'No se recibio el id de la receta'});

    if(idReceta > 0){

        try{
            var recipes = await axios.get(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_KEY}`)
        }catch(e){
            res.sendStatus(500).send('Problemas con el servidor de Spoonacular');
        }

        let result = {
            title: recipes.data.title,
            image: recipes.data.image,
            diet: recipes.data.diets,
            id: recipes.data.id,
            rating: recipes.data.spoonacularScore,
            summary: recipes.data.summary,
            steps: recipes.data.instructions,
            healthScore: recipes.data.healthScore
        };

        res.send(result);

    }
    else if (idReceta === 0){
        res.send('Receta inexistente en id 0');
    }
    else{

        idReceta = Math.abs(idReceta);   // si es negativa, es un id de la DB, asi que lo hacemos positivo para buscarlo
        
        let dbRecipes = await Recipe.findAll({include: Diet});

        if (dbRecipes.length){

            dbRecipes.forEach(r=>{     // para cada receta encontrada

                if (r.dataValues.id == idReceta){   // si matchea con el id a buscar

                    let allDietsArray = [];

                    for(let i = 0; i < r.dataValues.Diets.length; i++){     // iteramos sobre todas las dietas de esta receta
                        allDietsArray.push(r.dataValues.Diets[i].dataValues.name);   // y guardamos los nombres en un array
                    }

                    let result = {
                        title: r.dataValues.title,
                        image: r.dataValues.image,
                        diet: allDietsArray,
                        id: -Math.abs(r.dataValues.id),
                        rating: r.dataValues.rating,
                        summary: r.dataValues.summary,
                        steps: r.dataValues.steps,
                        healthScore: r.dataValues.healthScore
                    };
            
                    res.send(result);

                }
                else res.send('No Matching Recipes');
            });

        }
        else res.send('No Matching Recipes');

    }


});

module.exports = router;

