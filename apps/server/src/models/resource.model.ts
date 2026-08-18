import mongoose from 'mongoose'

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ['Course', 'Article', 'Video', 'Certification'],
    },

    provider: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      required: true,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },

    careerFields: {
      type: [String],
      default: [],
    },

    skills: {
      type: [String],
      default: [],
    },

    careerIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Career',
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Resource', resourceSchema)