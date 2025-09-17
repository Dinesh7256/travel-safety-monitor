import AlertRepository from '../repository/alert-repository.js';
import TouristRepository from '../repository/tourist-repository.js';

class AlertService {
    constructor() {
        this.alertRepository = new AlertRepository();
        this.touristRepository = new TouristRepository();
    }

    async createAlert(data) {
        try {
            const alert = await this.alertRepository.create({
                touristId: data.touristId,
                location: {
                    type: 'Point',
                    coordinates: [data.location.lon, data.location.lat]
                }
            });
            const tourist = await this.touristRepository.get(data.touristId);
            const broadcastPayload = {
                ...alert.toObject(),
                touristName: tourist.name,
            };
            // Real-time broadcast will be added later
            return broadcastPayload;
        } catch (error) {
            console.log("Something went wrong in the alert service layer", error);
            throw error;
        }
    }
}

export default AlertService;
