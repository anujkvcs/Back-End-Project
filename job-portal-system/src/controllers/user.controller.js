import User from '../models/User.js';
import { ApiResponse } from '../utils/response.js';

export const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = user.generateToken();
        
        res.status(201).json(new ApiResponse(201, { user, token }, 'User registered successfully'));
    } catch (error) {
        res.status(400).json(new ApiResponse(400, null, error.message));
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json(new ApiResponse(401, null, 'Invalid credentials'));
        }

        const token = user.generateToken();
        res.json(new ApiResponse(200, { user, token }, 'Login successful'));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(new ApiResponse(200, user, 'Profile retrieved successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const { role } = req.query;
        const query = role ? { role } : {};
        const users = await User.find(query).select('-password');
        res.json(new ApiResponse(200, users, 'Users retrieved successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json(new ApiResponse(404, null, 'User not found'));
        }
        res.json(new ApiResponse(200, user, 'User retrieved successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};