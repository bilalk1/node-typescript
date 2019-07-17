
import express, { Router } from 'express';
import controller from '../../controllers';
const auth = require('../../middlewares').authorization;

const router: Router = express.Router();
router
    .post('', auth.superAdmin, controller.card.postCard)

export = router;