import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { ApiResponse } from '../utils/response.js';

export const applyForJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const userId = req.user.id;

        const existingApplication = await Application.findOne({ job: jobId, user: userId });
        if (existingApplication) {
            return res.status(400).json(new ApiResponse(400, null, 'Already applied for this job'));
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json(new ApiResponse(404, null, 'Job not found'));
        }

        const application = await Application.create({
            job: jobId,
            user: userId,
            ...req.body
        });

        res.status(201).json(new ApiResponse(201, application, 'Application submitted successfully'));
    } catch (error) {
        res.status(400).json(new ApiResponse(400, null, error.message));
    }
};

export const getUserApplications = async (req, res) => {
    try {
        const applications = await Application.find({ user: req.user.id })
            .populate('job', 'title company location salary');
        res.json(new ApiResponse(200, applications, 'Applications retrieved successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
        
        if (!application) {
            return res.status(404).json(new ApiResponse(404, null, 'Application not found'));
        }

        res.json(new ApiResponse(200, null, 'Application deleted successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const getJobApplications = async (req, res) => {
    try {
        const applications = await Application.find({ job: req.params.jobId })
            .populate('user', 'name email phone')
            .populate('job', 'title company');
        res.json(new ApiResponse(200, applications, 'Job applications retrieved successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate('job', 'title company location salary');
        if (!application) {
            return res.status(404).json(new ApiResponse(404, null, 'Application not found'));
        }
        res.json(new ApiResponse(200, application, 'Application retrieved successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('user', 'name email').populate('job', 'title company');
        
        if (!application) {
            return res.status(404).json(new ApiResponse(404, null, 'Application not found'));
        }

        res.json(new ApiResponse(200, application, 'Application status updated successfully'));
    } catch (error) {
        res.status(400).json(new ApiResponse(400, null, error.message));
    }
};