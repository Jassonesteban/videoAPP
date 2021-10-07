const {Schema, model} = require('mongoose');

const VideoSchema = Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    FechaPublicacion: {
        type: String,
        required: [true, 'La fecha es requerida']
    },
    ContLikes: {
        type: Number,
        default: 0
    },
    ContDislikes: {
        type: Number,
        default: 0
    },
    Description: {
        type: String,
        required: [true, 'La descripcion es requerida']
    },
    Comments: {
        type: String,
    },
    Canal: {
        type: Schema.Types.ObjectId,
        ref: 'Canal',
        required: true
    },
    URL: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        default: true
    }

});

VideoSchema.methods.toJSON = function() {
    const {__v, _id, ...video} = this.toObject();
    video.Vid = _id;
    return video;
}

module.exports = model('Video', VideoSchema);