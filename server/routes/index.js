import express from 'express';
import v1Routes from './v1/index.js';

// Export a function that takes io and returns the router
export default (io) => {
	const router = express.Router();
	router.use('/v1', v1Routes(io));
	return router;
}