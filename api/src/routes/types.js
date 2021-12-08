var express = require('express');
var router = express.Router();

const { Recipe, Diet } = require('../db');

router.get('/', async (req,res)=>{

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
        res.json(allDiets);
    }
    else {
        res.json(allDiets);
    }
   
});



module.exports = router;