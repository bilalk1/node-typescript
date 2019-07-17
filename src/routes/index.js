
const express = require('express');
const router = express.Router();
const mdw = require('../middlewares');



let authorized = require('./authorized');
let ununauthorized = require('./unauthorized')
router.use(function (req, res, next) {
    if (req.method == "OPTIONS") {
        res.send(200);
    } else {
        next();
    }
});
router.use(ununauthorized, mdw.basicAuthentication, authorized);

module.exports = router;