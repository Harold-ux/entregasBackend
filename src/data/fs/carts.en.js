import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const cartsFile = "./src/data/fs/files/carts.json"; 

class CartManager {
  constructor() {
    this.carts = [];
    this.loadCarts();
  }

  // Load carts from the file
  async loadCarts() {
    try {
      const data = await fs.readFile(cartsFile, "utf-8");
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = []; // If the file does not exist, start with an empty array
    }
  }

  // Save carts to the file
  async saveCarts() {
    await fs.writeFile(cartsFile, JSON.stringify(this.carts, null, 2), "utf-8");
  }

  // Create a new empty cart
  async createCart() {
    const newCart = { id: uuidv4(), products: [] };
    console.log("New cart created:", newCart); // Verify if it is created correctly
    this.carts.push(newCart);
    await this.saveCarts();
    return newCart;
  }

  // Get all carts
  async getCarts() {
    return this.carts;
  }

  // Find a cart by ID
  async getCartById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  // Add a product to a cart
  async addProductToCart(cartId, product) {
    const cart = this.carts.find((cart) => cart.id === cartId);
    console.log("Cart found:", cart);
    if (!cart) return null;

    const existingProduct = cart.products.find(
      (p) => p.product === product.product
    );
    console.log("Existing product:", existingProduct);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      cart.products.push(product);
    }

    await this.saveCarts();
    return cart;
  }

  // Update a cart
  async updateCart(cartId, updatedCart) {
    const cartIndex = this.carts.findIndex((cart) => cart.id === cartId);
    if (cartIndex !== -1) {
      this.carts[cartIndex] = updatedCart;
      await this.saveCarts();
      return updatedCart;
    }
    return null;
  }
}

export default new CartManager();
