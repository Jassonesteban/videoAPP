const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares() {
        //cors 
        this.app.use(cors());
        //directorio publico
        this.app.use(express.static('public'));

        //parseo y lectura del body
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor en el puerto', this.port);
        });
    }

}

module.exports = Server;