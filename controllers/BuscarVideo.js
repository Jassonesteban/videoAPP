const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const Video = require('../models/video');

const coleccionesPermitidas = [
    'video'
];

const BuscarVideo = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const VideoUser = await Video.findById(termino);
        return res.json({
            results: (VideoUser) ? [VideoUser] : [] //ternario
        });
    }

    const regex = new RegExp(termino, 'i');

    const videos = await Video.find({ Nombre: regex });

    res.json({
        results: videos
    });
}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: "No existe esa categoria"
        });
    }

    switch (coleccion) {
        case 'video':
            BuscarVideo(termino, res);
            break;
        default:
            res.status(500).json({
                msg: "Ups, ha ocurrido un error, lo sentimos"
            });

    }
}

module.exports = {
    buscar
}