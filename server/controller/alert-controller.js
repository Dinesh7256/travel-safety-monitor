import AlertService from '../service/alert-service.js';

const alertService = new AlertService();

export const create = async (req, res, io) => {
    try {
        const newAlert = await alertService.createAlert({
            touristId: req.body.touristId,
            location: req.body.location
        });
        // Emit the new alert to all connected clients
        if (io) {
            io.emit('new-alert', newAlert);
            console.log('Emitting new-alert event with data:', newAlert);
        }
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new alert',
            data: { alertId: newAlert._id },
            err: {}
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong creating the alert',
            data: {},
            success: false,
            err: err
        });
    }
}
