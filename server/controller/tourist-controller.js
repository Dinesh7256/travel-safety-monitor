import TouristService from '../service/tourist-service.js';

const touristService = new TouristService();

export const register = async (req, res) => {
    try {
        const response = await touristService.register({
            name: req.body.name,
            documentId: req.body.documentId,
        });
        return res.status(201).json({
            success: true,
            message: 'Successfully registered a new tourist',
            data: response,
            err: {}
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong during registration',
            data: {},
            success: false,
            err: err
        });
    }
}
