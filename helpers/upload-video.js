const path = require('path');
const {v4: uuidv4} = require('uuid');

const uploadVideo = (videos, extensionesValidas  = ['mp4'], carpeta = '') => {

    return new Promise((resolve, reject) => {
        const { video } = videos;

        const NameCut = video.name.split('.');
        const extension = NameCut[NameCut.length - 1];

        //validar la extension
        if (!extensionesValidas.includes(extension)) {
            return reject('No es una extension valida, solo mp4');
        }

        const NombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, NombreTemp);

        video.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(NombreTemp);
        });
    })
}

module.exports = {
    uploadVideo
}