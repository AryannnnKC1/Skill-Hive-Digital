import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
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
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
      validate: {
        validator: (v: string) => v === '' || /^\d{7,15}$/.test(v),
        message: 'Phone number must be 7–15 digits',
      },
    },
    dateOfBirth: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      enum: ['', 'Male', 'Female', 'Non-binary', 'Prefer not to say'],
      default: '',
    },
    avatar: {
      type: String,
      trim: true,
      default: '',
    },
    bio: {
      type: String,
      trim: true,
      default: '',
      maxlength: [500, 'Bio must be 500 characters or fewer'],
    },
    educationLevel: {
      type: String,
      enum: ['', 'High School', "Bachelor's", "Master's", 'PhD', 'Diploma', 'Other'],
      default: '',
    },
    institution: {
      type: String,
      trim: true,
      default: '',
    },
    major: {
      type: String,
      trim: true,
      default: '',
    },
    graduationYear: {
      type: String,
      trim: true,
      default: '',
    },
    skills: {
      type: String,
      trim: true,
      default: '',
    },
    careerGoal: {
      type: String,
      trim: true,
      default: '',
    },
    preferredIndustry: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);

export default StudentProfile;
