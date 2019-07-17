
import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import routes from '../routes';


export = () => {

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
    app.use(function (req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Scope,Authorization, Accept-Encoding, Accept-Language');
        next();
    });
    app.use(morgan("dev"));
    app.get('/', (req: Request, res: Response) => res.status(200).json({
        message: " App is working "
    }));
    app.use(express.static('public'));
    app.use(routes);
    return app;
}
