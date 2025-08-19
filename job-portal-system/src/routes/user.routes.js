import express from 'express';
import { register, login, getProfile, getAllUsers, getUserById } from '../controllers/user.controller.js';
import { auth, employerAuth } from '../middlewares/auth.js';

const router = express.Router();

// POST routes
router.post('/register', register);
router.post('/login', login);

// GET routes
router.get('/profile', auth, getProfile);
router.get('/users', employerAuth, getAllUsers);
router.get('/users/:id', auth, getUserById);

export default router;