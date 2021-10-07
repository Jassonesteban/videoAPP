const canal = require('../models/canal');
const User = require('../models/user');
const Video = require('../models/video');

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

const ExisteCanalById = async(id) => {
    const ExisteCanal = await canal.findById(id);

    if(!ExisteCanal){
        throw new Error(`El id no existe`);
    }
}

const ExisteVideoById = async(id) => {
    const Existevideo = await Video.findById(id);

    if(!Existevideo){
        throw new Error(`El id no existe`);
    }
}

module.exports = {
    EmailExiste,
    ExisteUserById,
    ExisteCanalById,
    ExisteVideoById
}