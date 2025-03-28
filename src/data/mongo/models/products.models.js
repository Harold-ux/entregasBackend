// src/data/mongo/models/products.models.js
import { Schema, Types, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const productSchema = new Schema(
  {
    title: { type: String, required: true, index: true },
    category: {
      type: String,
      enum: ["none", "cellphones", "computers", "accessories", "clothes"],
      default: "none",
      index: true,
    },
    photo: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg",
    },
    price: { type: Number, default: 100 },
    stock: { type: Number, default: 10 },
    onsale: { type: Boolean, default: false },
    owner_id: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// plugin de paginación
productSchema.plugin(mongoosePaginate);

const Product = model(collection, productSchema);
export default Product;
