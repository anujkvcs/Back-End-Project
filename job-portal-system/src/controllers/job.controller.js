import Job from '../models/Job.js';
import { ApiResponse } from '../utils/response.js';

export const createJob = async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json(new ApiResponse(201, job, 'Job created successfully'));
    } catch (error) {
        res.status(400).json(new ApiResponse(400, null, error.message));
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const { search, location, experience } = req.query;
        let query = { status: 'active' };
        
        if (search) {
            query.$text = { $search: search };
        }
        if (location) {
            query.location = location;
        }
        if (experience) {
            query.experience = { $lte: parseInt(experience) };
        }

        const jobs = await Job.find(query);
        res.json(new ApiResponse(200, jobs, 'Jobs retrieved successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json(new ApiResponse(404, null, 'Job not found'));
        }
        res.json(new ApiResponse(200, job, 'Job retrieved successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json(new ApiResponse(404, null, 'Job not found'));
        }
        res.json(new ApiResponse(200, null, 'Job deleted successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};