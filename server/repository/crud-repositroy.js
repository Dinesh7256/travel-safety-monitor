
class CrudRepository {
  constructor(model) {
    this.model = model;
  } 

 async create(data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            console.log("Something went wrong in crud repo");
            throw error;
        }
    }

    async destroy(id) {
        try {
            const result = await this.model.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.log("Something went wrong in crud repo");
            throw error;
        }
    }

    async get(id) {
        try {
            // Use findByPk for Sequelize models, findById for Mongoose models
            if (typeof this.model.findByPk === 'function') {
                return await this.model.findByPk(id);
            } else if (typeof this.model.findById === 'function') {
                return await this.model.findById(id);
            } else {
                throw new Error('Model does not support findByPk or findById');
            }
        } catch (error) {
            console.log("Something went wrong in crud repo");
            throw error;
        }
    }

    async getAll() {
        try {
            const result = await this.model.find({});
            return result;
        } catch (error) {
            console.log("Something went wrong in crud repo");
            throw error;
        }
    }

    async update(id, data) {
        try {
            const result = await this.model.findByIdAndUpdate(id, data, {new: true});
            return result;
        } catch(error) {
            console.log("Something went wrong in crud repo");
            throw error;
        }
    }

}
export default CrudRepository;