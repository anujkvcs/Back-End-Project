import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
    try {
        const event = await Event.create({
            ...req.body,
            createdBy: req.user.id
        });
        res.status(201).json({ success: true, data: event });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const { date, location, status = 'approved' } = req.query;
        let query = { status };
        
        if (date) query.date = { $gte: new Date(date) };
        if (location) query.location = new RegExp(location, 'i');

        const events = await Event.find(query).populate('createdBy', 'name');
        res.json({ success: true, data: events });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const registerForEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        if (event.registeredUsers.includes(req.user.id)) {
            return res.status(400).json({ success: false, message: 'Already registered' });
        }

        if (event.registeredUsers.length >= event.capacity) {
            return res.status(400).json({ success: false, message: 'Event is full' });
        }

        event.registeredUsers.push(req.user.id);
        await event.save();

        res.json({ success: true, message: 'Registered successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const cancelRegistration = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        event.registeredUsers = event.registeredUsers.filter(
            userId => userId.toString() !== req.user.id
        );
        await event.save();

        res.json({ success: true, message: 'Registration cancelled' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const approveEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { status: 'approved' },
            { new: true }
        );
        res.json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('createdBy', 'name')
            .populate('registeredUsers', 'name email');
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getMyEvents = async (req, res) => {
    try {
        const events = await Event.find({ createdBy: req.user.id })
            .populate('registeredUsers', 'name email');
        res.json({ success: true, data: events });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getEventRegistrations = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('registeredUsers', 'name email role');
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.json({ success: true, data: event.registeredUsers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};