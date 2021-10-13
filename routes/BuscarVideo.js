const {Router} = require('express');
const {buscar} = require('../controllers/BuscarVideo');

const router = Router();

router.get('/:coleccion/:termino', buscar);

module.exports = router;