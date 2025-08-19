import User from '../models/User.js';

export const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = user.generateToken();
        res.status(201).json({ success: true, data: { user, token } });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = user.generateToken();
        res.json({ success: true, data: { user, token } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};