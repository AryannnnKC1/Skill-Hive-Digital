import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      validate: {
        validator: (v: string) => /^[A-Za-z\s]+$/.test(v),
        message: 'Full name can only contain letters and spaces',
      },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      validate: {
        validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
        message: 'Please enter a valid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'student'],
      default: 'user',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;