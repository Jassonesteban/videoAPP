const { response, request } = require('express');


const UsersGet = (req = request, res = response) => {

    res.json({
        msg: 'Successfull get Users'
    });
}

const UsersPut = (req, res = response) => {
    const {id} = req.params;

        res.status(201).json({
            msg: 'Successfull update user',
            id
        });
}

const UsersDelete = (req, res = response) => {
    res.status(202).json({
        msg: 'Successful delete user'
    });
}

const UsersPost = (req = request, res = response) => {
    const user = req.body;
    res.status(201).json({
        msg: 'Successfull insert User',
        user
    });
}


module.exports = {
    UsersGet,
    UsersPost,
    UsersPut,
    UsersDelete
}