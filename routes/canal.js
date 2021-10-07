const { Router } = require('express');
const { check } = require('express-validator');
const { GetAllCanals, AllCanals, PostCanal, PutCanalInfo, InactivateCanal, FindCanalById } = require('../controllers/canal');

const {ExisteCanalById } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.get('/', AllCanals);

router.get('paged/', GetAllCanals);

router.post('/', [
    check('Nombre', 'El nombre es requerido').not().isEmpty(),
    check('Description', 'Describe tu canal').not().isEmpty(),
    validarCampos
], PostCanal);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(ExisteCanalById),
    validarCampos
], PutCanalInfo);

router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(ExisteCanalById),
    validarCampos
], InactivateCanal);

//Get canal by id
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(ExisteCanalById),
    validarCampos
], FindCanalById);


module.exports = router;