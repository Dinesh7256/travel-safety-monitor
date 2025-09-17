import Tourist from '../models/tourist.js';
import CrudRepository from './crud-repositroy.js';

class TouristRepository extends CrudRepository {
    constructor() {
        super(Tourist);
    }
}

export default TouristRepository;
