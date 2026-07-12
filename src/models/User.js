// src/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false, 
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN', 'SUPERADMIN'],
      default: 'ADMIN',
    },
  },
  { 
    timestamps: true // Automatically creates createdAt and updatedAt fields
  }
);

// Prevent mongoose from compiling the model multiple times in Next.js development mode
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;