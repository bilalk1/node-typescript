import express, { Router } from 'express';
import cardRoute from './card.routes'

let router: Router = express.Router();

router
        .use('/card', cardRoute)

export = router;