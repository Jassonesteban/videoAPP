
const { request, response } = require("express");
const path = require('path');
const { uploadVideo } = require("../helpers/upload-video");
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const Video = require('../models/video');


const cargarVideo = async(req = request, res = response) => {

    try {
        const nombre = await uploadVideo(req.files, undefined, 'videos');
        res.json({
            nombre
        });
    } catch (error) {
        res.status(400).json({
            msg
        })
    }
    
}

const InsertarVideo = async(req = request, res = response) => {

    const {id, coleccion} = req.params;

    let modelo;

    switch(coleccion){
        case 'videoFiles':
            modelo = await Video.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: 'No existe un video con ese id'
                });
            }
        break;
        default:
            return res.status(500).json({
                msg: 'Ups, ocurrio un error inesperado'
            });
    }
    const nombre = await uploadVideo(req.files, undefined, coleccion);
    modelo.url = nombre;
    await modelo.save();

    res.json(modelo);

}

const mostrarVideo = async(req = request, res = response) => {
    
    const {id, coleccion} = req.params;

    let modelo;

    switch(coleccion){
        case 'videoFiles':
            modelo = await Video.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: 'No existe un video con ese id'
                });
            }
        break;
        default:
            return res.status(500).json({
                msg: 'Ups, ocurrio un error inesperado'
            });
    }
    //const nombre = await uploadVideo(req.files, undefined, coleccion);

    const pathVideo = path.join(__dirname, '../uploads', coleccion, modelo.url);
    if(pathVideo){
        return res.sendFile(pathVideo);
    }
    //modelo.url = nombre;
    //await modelo.save();

    res.json({msg: 'Faltan argumentos'});
}


const InsertarVideoCloud = async(req = request, res = response) => {

    const {id, coleccion} = req.params;

    let modelo;

    switch(coleccion){
        case 'videoFiles':
            modelo = await Video.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: 'No existe un video con ese id'
                });
            }
        break;
        default:
            return res.status(500).json({
                msg: 'Ups, ocurrio un error inesperado'
            });
    }

    const {tempFilePath} = req.files.video;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    const nombre = await uploadVideo(req.files, undefined, coleccion);
    modelo.url = secure_url;
    await modelo.save();


    res.json(modelo);

}


module.exports = {
    cargarVideo,
    InsertarVideo,
    mostrarVideo,
    InsertarVideoCloud
}