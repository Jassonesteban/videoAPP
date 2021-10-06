const {Router} = require('express');
const { UsersGet, UsersPost, UsersPut, UsersDelete } = require('../controllers/user');

const router = Router();

router.get('/', UsersGet);

router.post('/',UsersPost );

router.put('/:id',UsersPut );

router.delete('/',UsersDelete );

module.exports = router;