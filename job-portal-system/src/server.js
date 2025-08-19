import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

// Bypass SSL certificate validation
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/job-portal';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Job Portal Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Database connection error:', err));