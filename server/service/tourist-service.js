import TouristRepository from '../repository/tourist-repository.js';
import crypto from 'crypto';

class TouristService {
    constructor() {
        this.touristRepository = new TouristRepository();
    }

    async register(data) {
        try {
            const docHash = crypto.createHash('sha256').update(data.documentId).digest('hex');
            const tourist = await this.touristRepository.create({
                name: data.name,
                document_hash: docHash,
            });
            return {
                touristId: tourist.id,
                idHash: tourist.document_hash
            };
        } catch (error) {
            console.log("Something went wrong in the tourist service layer", error);
            throw error;
        }
    }
}

export default TouristService;
