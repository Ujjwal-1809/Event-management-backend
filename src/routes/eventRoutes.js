import express from 'express';
import { handleCreateEvents, handleDeleteEvent, handleGetEvents, viewEvent } from '../controllers/eventController.js';
import { protectRoute } from '../middleware/protectRoutes.js';

const router = express.Router();

router.post('/events', protectRoute, handleCreateEvents);  
router.get('/events', protectRoute, handleGetEvents);
router.get('/events/:id', protectRoute, viewEvent);
router.delete('/events/:id', protectRoute, handleDeleteEvent);

export default router;