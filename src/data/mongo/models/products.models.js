// models/Product.js
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const productSchema = new Schema(
  {
    title: { type: String, required: true, index: true },
    category: {
      type: String,
      default: "none",
      enum: ["none", "cellphones", "computers", "accessories", "shoes"],
      index: true,
    },
    image: {
      type: String,
      default: "https://static.thenounproject.com/png/1247947-200.png",
    },
    stock: { type: Number, default: 10, min: 0 },
    price: { type: Number, default: 10, min: 0 },
    availability: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Aplica el plugin de paginación
productSchema.plugin(mongoosePaginate);

// Método para hacer populate con la colección de "user_id"
productSchema.methods.populateUser = function () {
  return this.populate("user_id", "-_id name email avatar");
};

const Product = model(collection, productSchema);

export default Product;
