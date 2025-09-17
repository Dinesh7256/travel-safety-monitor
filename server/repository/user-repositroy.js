// File not needed for /register and /alert APIs. You can delete this file.


import User from '../models/user.js';

import CrudRepository from './crud-repositroy.js';

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async findBy(data){
        try{
            const response  = await User.findOne(data);
            return response;
        }
        catch(error){
            console.log("Something went wrong in user repo");
            throw error;
        }
    }
}

export default new UserRepository();
