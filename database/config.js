const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_ATLAS,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        });

        console.log('Database online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion hacia la base de datos');
    }

}

module.exports = {
    dbConnection
}