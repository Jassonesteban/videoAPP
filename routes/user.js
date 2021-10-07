const { Router } = require('express');
const { check } = require('express-validator');
const { UsersGet, UsersPost, UsersPut, UsersDelete, UsersGetPagination } = require('../controllers/user');
const { EmailExiste, ExisteUserById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', UsersGetPagination);

router.post('/', [
    check('Correo', 'El correo no es valido, verifique!').isEmail(),
    check('Nombre', 'El nombre es requerido').not().isEmpty(),
    check('Password', 'La contraseña debe ser de 6 caractres').isLength({ min: 6 }),
    check('Correo').custom(EmailExiste),
    validarCampos
], UsersPost);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(ExisteUserById),
    validarCampos
], UsersPut);

router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(ExisteUserById),
    validarCampos
],
 UsersDelete);

module.exports = router;