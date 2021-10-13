const { Router }  = require('express');
const { check } = require('express-validator');
const {LoginUser} = require('../controllers/login');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/', [
    check('correo', 'el correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], LoginUser );


module.exports = router;