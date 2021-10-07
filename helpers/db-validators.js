const User = require('../models/user');

const EmailExiste = async(Correo = '') => {
    const existEmail = await User.findOne({Correo});

    if(existEmail){
        throw new Error(`El correo ya esta asociado a una cuenta`);
    }
}

const ExisteUserById = async(id) => {
    const ExistUser = await User.findById(id);

    if(!ExistUser){
        throw new Error(`El id no existe`);
    }
}

module.exports = {
    EmailExiste,
    ExisteUserById
}