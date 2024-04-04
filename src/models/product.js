import { Schema, Types, model } from 'mongoose';

const productSchema = new Schema(
  {
    productName: { type: String, require: true },
    description: { type: String, require: true },
    productImgs: { type: Array },
    // price: { type: Number, require: true },
    // quantity: { type: Number, default: 0 },
    category: [{ type: Types.ObjectId, ref: 'Category' }],
  },
  { timestamps: true }
);

export const Product = model('Product', productSchema);
