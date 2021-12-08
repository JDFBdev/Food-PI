var express = require('express');
var router = express.Router();


const { Recipe, Diet } = require('../db');

router.post('/', async (req,res)=>{
    
    console.log(req.body);

    let { title, summary, rating, healthScore, steps, diets, image } = req.body;
    
    
    const arr = title.split(" ");   // Capitalizamos las primeras letras para proligidad y mejor filtrado

    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    title = arr.join(" ");

    let newRecipe;
     
    try{
        newRecipe = await Recipe.create({     // creamos la nueva receta
            title,
            summary,
            rating,
            healthScore,
            steps,
            image
        });

        let allDiets = await Diet.findAll();

        if(!allDiets.length){
            allDiets = await Diet.bulkCreate([   // agregamos todas las dietas
                {name: 'gluten free'},
                {name: 'ketogenic'},
                {name: 'vegetarian'},
                {name: 'lacto ovo vegetarian'},
                {name: 'Ovo-Vegetarian'},
                {name: 'vegan'},
                {name: 'pescatarian'},
                {name: 'paleo'},
                {name: 'primal'},
                {name: 'dairy free'},
                {name: 'fodmap'},
                {name: 'whole'}
            ]);
        
        }
            

        const newDiet = await Diet.findAll({    //  buscamos la dieta
            where: {
                name: diets
            }
        });

        await newRecipe.addDiets(newDiet);    // las linkeamos

        res.json(newRecipe);

    }
    catch(e){
        console.log(e);
        res.json(e);
    } 

});

module.exports = router;