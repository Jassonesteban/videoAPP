const {Schema, model} = require('mongoose');

const CanalSchema = Schema ({
    Nombre: {
        type: String,
        required: [true, 'Ponle nombre a tu canal']
    },
    contSuscriptors: {
        type: Number,
        default: 0
    },
    Description: {
        type: String,
        required: [true, 'Describe tu canal']
    },
    IsActive: {
        type: Boolean,
        default: true
    },
    Owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

CanalSchema.methods.toJSON = function() {
    const {__v, _id, ...canal} = this.toObject();
    canal.Cid = _id;
    return canal;
}

module.exports = model('Canal', CanalSchema);