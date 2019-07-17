
require('./mongooseConn.js');
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
let routes = require('../routes');

module.exports = () => {
    let app: Application = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    if (process.env.NODE_ENV == "development") {
        app.use(morgan('short'));
    }
    else {
        app.use(compression());
    }
    // CORS -> Cross Origin Resource Sharing 
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Scope,Authorization, Accept-Encoding, Accept-Language');
        next();
    });
    app.use(morgan("dev"));
    app.get('/', (req, res) => res.status(200).json({
        message: " App is working "
    }));
    app.use(express.static('public'));
    app.use(routes);
    return app;
}
