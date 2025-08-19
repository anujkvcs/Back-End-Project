import express from 'express';
import { createJob, getAllJobs, getJobById, deleteJob } from '../controllers/job.controller.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', auth, createJob);
router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.delete('/:id', auth, deleteJob);

export default router;