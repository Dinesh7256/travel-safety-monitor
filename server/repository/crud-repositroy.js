
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
            const result = await this.model.destroy({ where: { id } });
            return result;
        } catch (error) {
            console.log("Something went wrong in crud repo");
            throw error;
        }
    }

    async get(id) {
        try {
            return await this.model.findByPk(id);
        } catch (error) {
            console.log("Something went wrong in crud repo");
            throw error;
        }
    }

    async getAll() {
        try {
            const result = await this.model.findAll();
            return result;
        } catch (error) {
            console.log("Something went wrong in crud repo");
            throw error;
        }
    }

    async update(id, data) {
        try {
            await this.model.update(data, { where: { id } });
            const updated = await this.model.findByPk(id);
            return updated;
        } catch(error) {
            console.log("Something went wrong in crud repo");
            throw error;
        }
    }

}
export default CrudRepository;