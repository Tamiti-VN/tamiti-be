import { Schema, Types, model } from "mongoose";

const cartSchema = new Schema(
  {
    userId: { type: String, require: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = model("Cart", cartSchema);
