import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
    touristId: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    status: {
        type: String,
        enum: ['active', 'acknowledged', 'resolved'],
        default: 'active'
    }
}, { timestamps: true });

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;
