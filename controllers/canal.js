const { response, request } = require('express');
const Canal = require('../models/canal');

// get all canals - not pagination 
const AllCanals = async (req = request, res = response) => {
    const query = {IsActive: true};

    const [total, canals] = await Promise.all([
            Canal.countDocuments(query),
            Canal.find(query)
    ]);

    res.json({
        msg: 'Successfull get canals',
        total,
        canals
    });
}

//Post Canal
const PostCanal = async(req = request, res = response) => {
    const {Nombre, Description, Owner} = req.body;
    const canal = new Canal({Nombre, Description, Owner});
    await canal.save();

    res.status(201).json({
        msg: 'Success canal created',
        canal
    });
}

const FindCanalById = async (req = request, res = response) => {
    const {id} = req.params;
    const [canal] = await Promise.all([
        Canal.findById(id).populate('Owner', 'Nombre')
    ]);

    res.status(200).json({
        msg: "Canal found",
        canal
    });
}

//Get canals - pagination
const GetAllCanals = async (req = request, res = response) => {

    //filtros de busqueda 
    const {Limite = 5, desde = 0} = req.query;
    const query = {IsActive: true};

    const [total, canals] = await Promise.all([
        Canal.countDocuments(query),
        Canal.find(query).skip(Number(desde)).limit(Number(Limite))
    ]);

    res.status(200).json({
        msg: 'Canals available',
        total,
        canals
    });
}

//Update Canal 
const PutCanalInfo = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, ...canal } = req.body;

    const UpdateCanal = await Canal.findByIdAndUpdate(id, canal).populate('Owner', 'Nombre');
    res.json({
        ok: true,
        msg: 'Update sucessfull',
        UpdateCanal
    });
}

const InactivateCanal = async (req = request, res = response) => {

    const {id} = req.params;

    //borrar por estado, no fisicamente
    const inactive = await Canal.findByIdAndUpdate(id, {IsActive: false});

    res.status(201).json({
        msg: 'Canal inactive',
        inactive
    });
}


module.exports = {
    PostCanal,
    FindCanalById,
    GetAllCanals,
    PutCanalInfo,
    InactivateCanal,
    AllCanals
}