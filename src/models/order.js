import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    userId: { type: String, require: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, require: true },
    address: { type: String, require: true },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

export const Oder = model('Oder', orderSchema);
