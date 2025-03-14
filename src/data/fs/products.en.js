import { faker } from "@faker-js/faker";
import fs from "fs/promises";

const path = "./src/data/fs/files/products.json";

class ProductsManager {
  constructor() {
    this.path = path;
    this.init()
      .then(() => console.log("Initialization complete"))
      .catch(console.error);
  }

  async init() {
    try {
      await fs.access(this.path);
      console.log(this.path);
    } catch (error) {
      console.error("File not found... creating a new one.");
      await fs.writeFile(this.path, JSON.stringify([]));
      console.log(`File created at: ${this.path}`);
    }
  }

  async write(data) {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile(this.path, jsonData);
    } catch (error) {
      console.error("Error writing to the file:", error);
    }
  }

  async create(data) {
    try {
      const _id = faker.database.mongodbObjectId();
      const newProduct = {
        _id,
        ...data,
      };
      const dataOfFile = await this.read();
      dataOfFile.push(newProduct);
      await this.write(dataOfFile);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      let data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading the file:", error);
      return [];
    }
  }

  async read(category) {
    try {
      let all = await this.read();
      if (category) {
        all = all.filter((each) => each.category === category);
      }
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readById(id) {
    try {
      const all = await this.read();
      const one = all.find((each) => each._id === id);

      // Si no se encuentra el producto, lanzar un error 404
      if (!one) {
        const error = new Error("Product not found");
        error.status = 404;
        throw error;
      }

      return one;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(id, newdata) {
    try {
      const all = await this.read();
      const index = all.findIndex((product) => product._id === id);
      if (index === -1) {
        const error = new Error(`Product with ID ${id} not found`);
        error.status = 404;
        throw error;
      }
      all[index] = { ...all[index], ...newdata };
      await this.write(all);
      return all[index];
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id) {
    try {
      const all = await this.read();
      const index = all.findIndex((each) => each._id === id);
      if (index === -1) {
        const error = new Error(`Product with ID ${id} not found`);
        error.status = 404;
        throw error;
      }
      const [deleted] = all.splice(index, 1);
      await this.write(all);
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductsManager();
export default productsManager;
