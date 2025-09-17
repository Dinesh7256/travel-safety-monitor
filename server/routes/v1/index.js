import express from 'express';
import touristRouter from './tourist-routes.js';
import alertRouter from './alert-routes.js';

const router = express.Router();

// router.use('/auth', authRouter); // Your existing auth routes (commented out, file missing)
router.use('/', touristRouter); // Routes like /register
router.use('/', alertRouter);   // Routes like /alert

export default router;