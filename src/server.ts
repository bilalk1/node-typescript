
import express from './config/express';
import { Application } from 'express';
import config from './config/config';
import http, { Server } from 'http';

const app: Application = express();
app.set('port', config.development.node_port);
const server: Server =
    http.createServer(app)
        .listen(app.get('port'));

