// /**********************************************************************
//  * Copyright (c) 2018 eActivate Manager , all rights reserved
//  * Proprietary and Confidential Information
//  *
//  * This source file is the property of eActivate Manager, and
//  * may not be copied or distributed in any isomorphic form without
//  * the prior written consent of eActivate Manager.
//  *
//  *
//  * Author: Bilal Iftikhar
//  */

let express = require('./config/express');
let {config} = require('./config/config.js');
app = express();
app.set('port', config.development.node_port);
const http = require('http');
const server = http.createServer(app)
    .listen(app.get('port'), function (err) {
        if (err) {
            console.log("Failed to start server!");
            console.dir(err);
        } else {
            console.log("Server is up and listening on port : ", app.get('port'));
        }
    });
