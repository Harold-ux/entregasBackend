import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    avatar: {
      type: String,
      default:
        "https://pic.onlinewebfonts.com/thumbnails/icons_508630.svg",
    },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

schema.methods.populateUserProduct = function () {
  return this.populate("product_id", "-_id title price image")
             .populate("user_id", "-_id name email avatar");
};

const User = model(collection, schema);
export default User;
