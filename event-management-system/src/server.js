import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

// Bypass SSL certificate validation
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

dotenv.config();

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/event-management';

mongoose.connect(MONGODB_URI, {
    tlsAllowInvalidCertificates: true,
    ssl: true
})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Event Management Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Database connection error:', err));