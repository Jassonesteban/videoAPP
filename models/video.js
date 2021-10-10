const {Schema, model} = require('mongoose');
const date = require('date-and-time');
const now = new Date();

const VideoSchema = Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    FechaPublicacion: {
        type: String,
        default: date.format(now, 'dddd, MMM DD YYYY')
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
    isAvailable: {
        type: Boolean,
        default: true
    },
    url: {
        type: String
    }

});

VideoSchema.methods.toJSON = function() {
    const {__v, _id, ...video} = this.toObject();
    video.Vid = _id;
    return video;
}

module.exports = model('Video', VideoSchema);