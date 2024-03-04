import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, require: true, trim: true, unique: true },
    password: { type: String, require: true, select: false, trim: true, minlength: 6 },
    email: { type: String, trim: true, unique: true },
    phone: { type: Number, trim: true },
    address: { type: String, trim: true },
    roles: {
      type: [
        {
          type: String,
          enum: ['user', 'admin', 'staff'],
        },
      ],
      default: ['user'],
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User = model('User', userSchema);
