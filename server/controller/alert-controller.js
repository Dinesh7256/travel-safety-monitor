import AlertService from '../service/alert-service.js';

const alertService = new AlertService();

export const create = async (req, res) => {
    try {
        const response = await alertService.createAlert({
            touristId: req.body.touristId,
            location: req.body.location
        });
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new alert',
            data: { alertId: response._id },
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
