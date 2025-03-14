// Code with all generic classes for data management, whether users or products.

// Generic Class for Data Management

import { faker } from "@faker-js/faker";
import fs from "fs/promises";

class Manager {
  constructor(model, path) {
    this.model = model; // Function that generates a new object
    this.path = path;
    this.init()
      .then(() => console.log(`Initialization complete at ${this.path}`))
      .catch(console.error);
  }

  async init() {
    try {
      await fs.access(this.path);
      console.log(`The file already exists: ${this.path}`);
    } catch {
      console.error(`File not found... creating a new one: ${this.path}`);
      await fs.writeFile(this.path, JSON.stringify([]));
      console.log(`File created at: ${this.path}`);
    }
  }

  async read() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading the file: ${this.path}`, error);
      return null;
    }
  }

  async write(data) {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile(this.path, jsonData);
    } catch (error) {
      console.error(`Error writing to the file: ${this.path}`, error);
    }
  }

  async create() {
    try {
      const newItem = this.model(); // Generates a new object using the passed function
      const data = await this.read();
      data.push(newItem);
      await this.write(data);
      console.log("New item created:", newItem);
      return newItem;
    } catch (error) {
      console.error("Error creating the new item:", error);
      throw error;
    }
  }
}

// User Implementation

/* const userModel = () => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    password: "hola1234",
    avatar: faker.image.avatar(),
    role: faker.helpers.arrayElement(["user", "admin", "premium"]),
  });
  
  const usersManager = new Manager(userModel, "data/fs/files/users.json");
  export default usersManager;
 */

// Product Implementation

const productModel = () => ({
  _id: faker.database.mongodbObjectId(),
  title: faker.commerce.productName(),
  price: faker.commerce.price({ min: 10, max: 500, dec: 2 }),
  stock: faker.number.int({ min: 0, max: 1000 }),
  photo: faker.image.url(),
  category: faker.helpers.arrayElement([
    "none",
    "cellphones",
    "computers",
    "accessories",
  ]),
});

const productsManager = new Manager(productModel, "./src/data/fs/files/products.json");
export default productsManager;

// Implementation and executions

(async () => {
/*    const newUser = await usersManager.create();
    console.log("User created:", newUser); */

  const newProduct = await productsManager.create();
  console.log("Product created:", newProduct);

/*    const allUsers = await usersManager.read();
    console.log("Stored users:", allUsers); */

  const allProducts = await productsManager.read();
  console.log("Stored products:", allProducts);
})();
