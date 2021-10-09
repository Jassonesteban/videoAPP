const express = require('express');
const cors = require('cors');

const {dbConnection} = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.canalPath = '/api/canal';
        this.videoPath = '/api/video';
        this.UploadVideo = '/api/uploads';


        //conexion a la base de datos
        this.conectionDB();

        //Middlewares
        this.middlewares(); 

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectionDB() {
        await dbConnection();
    }

    middlewares() {
        //cors 
        this.app.use(cors());
        //directorio publico
        this.app.use(express.static('public'));

        //parseo y lectura del body
        this.app.use(express.json());

        //file upload, carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user'));
        this.app.use(this.canalPath, require('../routes/canal'));
        this.app.use(this.videoPath, require('../routes/video'));
        this.app.use(this.UploadVideo, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server in port', this.port);
        });
    }

}

module.exports = Server;