import express from 'express';
import { createEvent, getAllEvents, getEventById, registerForEvent, cancelRegistration, approveEvent, getMyEvents, getEventRegistrations } from '../controllers/event.controller.js';
import { auth, adminAuth } from '../middlewares/auth.js';

const router = express.Router();

// POST routes
router.post('/', auth, createEvent);
router.post('/:id/register', auth, registerForEvent);

// GET routes (public)
router.get('/', getAllEvents);

// GET routes (authenticated)
router.get('/my-events', auth, getMyEvents);
router.get('/:id', getEventById);
router.get('/:id/registrations', adminAuth, getEventRegistrations);

// DELETE routes
router.delete('/:id/register', auth, cancelRegistration);

// PATCH routes
router.patch('/:id/approve', adminAuth, approveEvent);

export default router;