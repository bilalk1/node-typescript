
var express = require("express"),
    router = express.Router()
    card = require('./card.routes'),
    user = require('./user.routes')
    router
        .use('/card', card)
        .use('/user', user)

module.exports = router;