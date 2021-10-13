const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require("../models/user");
//const { generarJWT } = require("../helpers/generar-JWT");


const LoginUser = async (req = request, res = response) => {
    const { correo, password } = req.body;

    try {

        //email existe 
        const userAuth = await User.findOne({ correo });

        if (!userAuth) {
            return res.status(400).json({
                msg: 'El correo o la contraseña no son correctos'
            });
        }

        //verificar la password
        const validPassword = bcryptjs.compareSync(password, userAuth.Password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'El correo o la contraseña no son correctos'
            });
        }

        res.status(200).json({
            msg: 'Bienvenido a VideoAPP',
            userAuth 
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Ups, algo salio mal, internal server error'
        });
    }

}

module.exports = {
    LoginUser
}