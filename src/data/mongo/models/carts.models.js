import { Schema, model, Types } from "mongoose";

const collection = "carts";
const schema = new Schema(
  {
    product_id: { type: Types.ObjectId, ref: "products", required: true },
    user_id: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    quantity: { type: Number, default: 1 },
    state: {
      type: String,
      default: "reserved",
      enum: ["reserved", "paid", "delivered"],
      index: true,
    },
  },
  { timestamps: true }
);

schema.pre("find", function () {
  this.populate("product_id", "-_id title price image");
  this.populate("user_id", "-_id name email avatar");
});

schema.pre("findOne", function () {
  this.populate("product_id", "-_id title price image");
  this.populate("user_id", "-_id name email avatar");
});

schema.pre("findOneAndUpdate", function () {
  this.populate("product_id", "-_id title price image");
  this.populate("user_id", "-_id name email avatar");
});

schema.pre("findOneAndDelete", function () {
  this.populate("product_id", "-_id title price image");
  this.populate("user_id", "-_id name email avatar");
});

const Cart = model(collection, schema);

export default Cart;