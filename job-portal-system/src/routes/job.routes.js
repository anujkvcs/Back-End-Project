import express from 'express';
import { createJob, getAllJobs, getJobById, deleteJob, getMyJobs, updateJob } from '../controllers/job.controller.js';
import { auth, employerAuth } from '../middlewares/auth.js';

const router = express.Router();

// POST routes
router.post('/', employerAuth, createJob);

// GET routes
router.get('/', getAllJobs);
router.get('/my-jobs', employerAuth, getMyJobs);
router.get('/:id', getJobById);

// PUT routes
router.put('/:id', employerAuth, updateJob);

// DELETE routes
router.delete('/:id', employerAuth, deleteJob);

export default router;