
import express, { Router } from 'express';
import controller from '../../controllers';
import  auth from '../../middlewares/index'

const router: Router = express.Router();
router
    .post('', auth.authorization.superAdmin, controller.card.postCard)

export = router;