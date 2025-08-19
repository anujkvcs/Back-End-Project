import express from 'express';
import { register, login, getUsers, getUserById } from '../controllers/auth.controller.js';
import { auth, adminAuth } from '../middlewares/auth.js';

const router = express.Router();

// POST routes
router.post('/register', register);
router.post('/login', login);

// GET routes
router.get('/users', adminAuth, getUsers);
router.get('/users/:id', auth, getUserById);
router.get('/profile', auth, getUserById);

export default router;