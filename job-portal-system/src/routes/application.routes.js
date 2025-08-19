import express from 'express';
import { applyForJob, getUserApplications, deleteApplication, getJobApplications, getApplicationById, updateApplicationStatus } from '../controllers/application.controller.js';
import { auth, employerAuth } from '../middlewares/auth.js';

const router = express.Router();

// POST routes
router.post('/apply/:jobId', auth, applyForJob);

// GET routes
router.get('/my-applications', auth, getUserApplications);
router.get('/job/:jobId', employerAuth, getJobApplications);
router.get('/:id', auth, getApplicationById);

// PUT routes
router.put('/:id/status', employerAuth, updateApplicationStatus);

// DELETE routes
router.delete('/:id', auth, deleteApplication);

export default router;