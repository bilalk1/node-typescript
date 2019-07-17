
const express = require('express');
const router = express.Router();
let controller = require('../../controllers').card;

router
    .post('/status', controller.postCardStatus) // Status Activate | Just Update Status of card to Activate True
    .get('/status', controller.getCardStatus)
    .post('/pin',controller.postCardPin)
module.exports = router;