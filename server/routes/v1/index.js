import express from 'express';
import { create as createAlert } from '../../controller/alert-controller.js';
import { register } from '../../controller/tourist-controller.js';

// Export a function that takes io and returns the router
export default (io) => {
    const router = express.Router();

    router.post('/register', register);
    router.post('/alert', (req, res) => createAlert(req, res, io));

    return router;
}