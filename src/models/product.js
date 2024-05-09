import { Schema, Types, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    thumb: { type: String, require: true },
    images: { type: Array },
    category: [{ type: Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
