import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    categoryName: { type: String, require: true },
  },
  { timestamps: true }
);

export const Category = model("Category", categorySchema);
