const { Router } = require('express');
const { check } = require('express-validator');
const { AllVideos, PostVideo, FindVideoById, PutVideoInfo, DeleteVideo } = require('../controllers/video');

const { ExisteVideoById } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.get('/', AllVideos);

//router.get('paged/', GetAllCanals);

router.post('/', [
    check('Nombre', 'El nombre es requerido').not().isEmpty(),
    check('Description', 'Describe tu canal').not().isEmpty(),
    validarCampos
], PostVideo);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(ExisteVideoById),
    validarCampos
], PutVideoInfo);

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(ExisteVideoById),
    validarCampos
], DeleteVideo);

//Get canal by id
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(ExisteVideoById),
    validarCampos
], FindVideoById);


module.exports = router;