import express from 'express';
import { create } from '../../controller/alert-controller.js';

const router = express.Router();

router.post('/alert', create);

export default router;
