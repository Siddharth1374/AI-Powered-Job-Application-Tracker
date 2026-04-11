import mongoose, { Document, Schema } from "mongoose";
import { ApplicationStatus } from "../types/application";

export interface IApplication extends Document {
  user: mongoose.Types.ObjectId;
  company: string;
  role: string;
  jdText?: string;
  jdLink?: string;
  notes?: string;
  dateApplied: Date;
  status: ApplicationStatus;
  salaryRange?: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  seniority?: string;
  location?: string;
  resumeSuggestions: string[];
}

const applicationSchema = new Schema<IApplication>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    jdText: {
      type: String,
      default: ""
    },
    jdLink: {
      type: String,
      default: ""
    },
    notes: {
      type: String,
      default: ""
    },
    dateApplied: {
      type: Date,
      required: true,
      default: Date.now
    },
    status: {
      type: String,
      enum: ["Applied", "Phone Screen", "Interview", "Offer", "Rejected"],
      default: "Applied"
    },
    salaryRange: {
      type: String,
      default: ""
    },
    requiredSkills: {
      type: [String],
      default: []
    },
    niceToHaveSkills: {
      type: [String],
      default: []
    },
    seniority: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      default: ""
    },
    resumeSuggestions: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Application = mongoose.model<IApplication>(
  "Application",
  applicationSchema
);

export default Application;