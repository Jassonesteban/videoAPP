const {Schema, model} = require('mongoose');


const UserSchema = Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    Apellidos: {
        type: String,
        required: [true, 'El apellido es requerido']
    },
    Correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    Password: {
        type: String,
        required: [true, 'La contraseña es requerido']
    },
    ImgProfile: {
        type: String
    },
    Estado: {
        type: Boolean,
        default: true
    },
    IsGoogle: {
        type: Boolean,
        default: false
    }
});

module.exports = model('User', UserSchema);