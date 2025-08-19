import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Job description is required']
    },
    requirements: [{
        type: String,
        trim: true
    }],
    skills: [{
        type: String,
        trim: true
    }],
    experience: {
        type: Number,
        required: [true, 'Experience requirement is required'],
        min: 0
    },
    salary: {
        type: Number,
        required: [true, 'Salary is required'],
        min: 0
    },
    location: {
        type: String,
        enum: ['remote', 'hybrid', 'onsite'],
        required: [true, 'Job location type is required']
    },
    vacancy: {
        type: Number,
        required: [true, 'Number of vacancies is required'],
        min: 1
    },
    status: {
        type: String,
        enum: ['active', 'closed', 'draft'],
        default: 'active'
    }
}, {
    timestamps: true
});

jobSchema.index({ title: 'text', description: 'text', skills: 'text' });

export default mongoose.model('Job', jobSchema);