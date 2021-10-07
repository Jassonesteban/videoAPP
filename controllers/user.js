const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');



//get users
const UsersGet = async (req = request, res = response) => {

    const users = await User.find();

    res.json({
        msg: 'Successfull get Users',
        users
    });
}


//getUsers pagination
const UsersGetPagination = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { Estado: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

res.json({
    msg: 'Successfull get Users',
    total,
    users
});
}


const UsersPut = async (req, res = response) => {
    const { id } = req.params;

    const { Password, IsGoogle, Correo, ...resto } = req.body;

    if (Password) {
        //encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        resto.Password = bcrypt.hashSync(Password, salt);
    }

    const UserDB = await User.findByIdAndUpdate(id, resto);

    res.status(201).json({
        msg: 'Successfull update user',
        UserDB
    });
}

const UsersDelete = async(req= request, res = response) => {

    const {id} = req.params;

    //borrar el dato fisicamente
    //const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {Estado: false});

    res.status(202).json({
        msg: 'Successfull delete user',
        user
    });
}

const UsersPost = async (req = request, res = response) => {
    const { Nombre, Apellidos, Correo, Password } = req.body;

    const user = new User({ Nombre, Apellidos, Correo, Password });

    //encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    user.Password = bcrypt.hashSync(Password, salt);

    //guardar en la BD
    await user.save();

    res.status(201).json({
        msg: 'Successfull insert User',
        user
    });
}


module.exports = {
    UsersGet,
    UsersPost,
    UsersPut,
    UsersDelete,
    UsersGetPagination
}