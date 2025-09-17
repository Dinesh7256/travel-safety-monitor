import Alert from '../models/alert.js';
import CrudRepository from './crud-repositroy.js';

class AlertRepository extends CrudRepository {
    constructor() {
        super(Alert);
    }
}

export default AlertRepository;
