const { response, request } = require('express');
const Video = require('../models/video');

// get all videos - not pagination 
const AllVideos = async (req = request, res = response) => {
    const query = { isAvailable: true };

    const [total, videos] = await Promise.all([
        Video.countDocuments(query),
        Video.find(query)
    ]);

    res.json({
        msg: 'Successfull get canals',
        total,
        videos
    });
}

//Post Video
const PostVideo = async (req = request, res = response) => {
    const { Nombre, FechaPublicacion, Description, URL } = req.body;
    const video = new Video({ Nombre, FechaPublicacion, Description, URL });
    await video.save();

    res.status(201).json({
        msg: 'Success video upload',
        video
    });
}

const FindVideoById = async (req = request, res = response) => {
    const { id } = req.params;
    const [video] = await Promise.all([
        Video.findById(id).populate('Canal', 'Nombre')
    ]);

    res.status(200).json({
        msg: "Video found",
        video
    });
}

//Update video 
const PutVideoInfo = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, ...video } = req.body;

    const UpdateVideo = await Video.findByIdAndUpdate(id, video).populate('Canal', 'Nombre');
    res.json({
        ok: true,
        msg: 'Update sucessfull',
        UpdateVideo
    });
}

const DeleteVideo = async (req = request, res = response) => {

    const { id } = req.params;

    //borrar por estado, no fisicamente
    const inactive = await Video.findByIdAndUpdate(id, { isAvailable: false });

    res.status(201).json({
        msg: 'Video down',
        inactive
    });
}

module.exports = {
    AllVideos,
    PostVideo,
    FindVideoById,
    PutVideoInfo,
    DeleteVideo
}