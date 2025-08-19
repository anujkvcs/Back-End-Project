import express from 'express';
import { createEvent, getAllEvents, registerForEvent, cancelRegistration, approveEvent } from '../controllers/event.controller.js';
import { auth, adminAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', auth, createEvent);
router.get('/', getAllEvents);
router.post('/:id/register', auth, registerForEvent);
router.delete('/:id/register', auth, cancelRegistration);
router.patch('/:id/approve', adminAuth, approveEvent);

export default router;