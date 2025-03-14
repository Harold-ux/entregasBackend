import { faker } from "@faker-js/faker";

class ProductsManager {
  #all = [];

  create = () => {
    try {
      const _id = faker.database.mongodbObjectId();
      const title = faker.commerce.productName();
      const price = faker.commerce.price({ min: 10, max: 500, dec: 2 });
      const stock = faker.number.int({ min: 0, max: 1000 });
      const photo = faker.image.url();
      const category = faker.helpers.arrayElement([
        "none",
        "cellphones",
        "computers",
        "accessories",
      ]);

      const newProduct = {
        _id,
        title,
        price,
        stock,
        photo,
        category,
      };

      this.#all.push(newProduct);

      return newProduct;
    } catch (error) {
      throw error;
    }
  };

  read = () => {
    try {
      return this.#all;
    } catch (error) {
      throw error;
    }
  };

  readById = (id) => {
    try {
      const product = this.#all.find((p) => p._id === id);
      return product;
    } catch (error) {
      throw error;
    }
  };
}

const productsManager = new ProductsManager();

export default productsManager;
