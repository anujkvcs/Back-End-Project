import express from 'express';
import { applyForJob, getUserApplications, deleteApplication } from '../controllers/application.controller.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/apply/:jobId', auth, applyForJob);
router.get('/my-applications', auth, getUserApplications);
router.delete('/:id', auth, deleteApplication);

export default router;