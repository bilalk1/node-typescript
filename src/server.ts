
import express, { Application, Request, Response, NextFunction } from 'express';
// import http from 'http';
let { config } = require('./config/config.js');
const app: Application = express();
app.set('port', config.development.node_port);
const http = require('http');
const server = http.createServer(app)
    .listen(app.get('port'), function (err: Error) {
        if (err) {
            console.log("Failed to start server!");
            console.dir(err);
        } else {
            console.log("Server is up and listening on port : ", app.get('port'));
        }
    });
