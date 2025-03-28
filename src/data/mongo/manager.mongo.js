class Manager {
  constructor(model) {
    this.model = model;
  }

  read = async (filter) => {
    try {
      const all = await this.model.find(filter).lean();
      return all;
    } catch (error) {
      throw new Error(`Error reading documents: ${error.message}`);
    }
  };

  readById = async (id) => {
    try {
      const one = await this.model.findById(id).lean();
      return one;
    } catch (error) {
      throw new Error(`Error reading document by ID (${id}): ${error.message}`);
    }
  };

  create = async (data) => {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw new Error(`Error creating document: ${error.message}`);
    }
  };

  updateById = async (id, data) => {
    try {
      const opts = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opts);
      return one;
    } catch (error) {
      throw new Error(`Error updating document (${id}): ${error.message}`);
    }
  };

  destroyById = async (id) => {
    try {
      const one = await this.model.findByIdAndDelete(id);
      return one;
    } catch (error) {
      throw new Error(`Error deleting document (${id}): ${error.message}`);
    }
  };

  paginate = async (filter, options) => {
    try {
      const all = await this.model.paginate(filter, options);
      return all;
    } catch (error) {
      throw new Error(`Error paginating documents: ${error.message}`);
    }
  };
}

export default Manager;
