const { Router } = require('express');
const { check } = require('express-validator');
const { cargarVideo, InsertarVideo, mostrarVideo, InsertarVideoCloud } = require('../controllers/uploads');
const { coleccionPermitida } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarArchivoSubir } = require('../middlewares/validar-video');
const router = Router();


router.post('/', validarArchivoSubir, cargarVideo);
/*
router.put ('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionPermitida(c, ['videoFiles'])),
    validarCampos
], InsertarVideoCloud);
*/

router.put ('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionPermitida(c, ['videoFiles'])),
    validarCampos
], InsertarVideo);


router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionPermitida(c, ['videoFiles'])),
    validarCampos
], mostrarVideo);



module.exports = router;