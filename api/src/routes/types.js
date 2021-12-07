var express = require('express');
var router = express.Router();

const { Recipe, Diet } = require('../db');

router.get('/', async (req,res)=>{

    let allDiets = await Diet.findAll();

    if(!allDiets.length){
        allDiets = await Diet.bulkCreate([   // agregamos todas las dietas
            {name: 'Gluten Free'},
            {name: 'Ketogenic'},
            {name: 'Vegetarian'},
            {name: 'Lacto-Vegetarian'},
            {name: 'Ovo-Vegetarian'},
            {name: 'Vegan'},
            {name: 'Pescetarian'},
            {name: 'Paleo'},
            {name: 'Primal'},
            {name: 'Dairy Free'},
            {name: 'Low FODMAP'},
            {name: 'Whole30'}
        ]);
        res.json(allDiets);
    }
    else {
        res.json(allDiets);
    }
   
});



module.exports = router;