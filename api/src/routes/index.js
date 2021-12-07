const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getter = require('./getter');
const poster = require('./poster');
const types = require('./types');
const getId = require('./getId');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', getter);
router.use('/types', types);
router.use('/recipe', poster);
router.use('/recipes', getId);

router.get('*', (req,res)=>{    // caso que la ruta indicada no este como '/dsifhasidbflasf'

    res.status(404).send('Esta ruta no existe');

})


module.exports = router;
