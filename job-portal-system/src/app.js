import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

// Routes
import jobRoutes from './routes/job.routes.js';
import userRoutes from './routes/user.routes.js';
import applicationRoutes from './routes/application.routes.js';

const app = express();

// Middleware
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

// Static files
app.use('/uploads', express.static('uploads'));

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Job Portal Management System API',
        version: '1.0.0',
        endpoints: {
            jobs: '/api/v1/jobs',
            users: '/api/v1/users',
            applications: '/api/v1/applications'
        }
    });
});

// API Routes
app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/applications', applicationRoutes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

export default app;