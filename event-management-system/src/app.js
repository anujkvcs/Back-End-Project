import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import eventRoutes from './routes/event.routes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: 'Event Management System API',
        endpoints: {
            auth: '/api/auth',
            events: '/api/events'
        }
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

export default app;