
const express = require('express');
const router = express.Router();
let controller = require('../../controllers').card;
const auth = require('../../middlewares').authorization;

router
    .post('', auth.superAdmin, controller.postCard)
    .get('/counts', auth.admin, controller.countCard)
    .get('', auth.admin, controller.getCard)
    .put('', auth.superAdmin, controller.updateCard)
    .post('/send-otp', auth.admin, controller.sendOtp)
    .put('/status', auth.admin, controller.updateCardStatus) // Status  Update | Update Status of card  | Not use Post call here. Post will also update status but generate a qr code which is extra operation 
    .delete('/:id', auth.superAdmin, controller.deleteCard)

module.exports = router;