import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IProfessionalExperience extends Document {
  position: string;
  company: string;
  description: string;
}

export interface IFavTimeline {
  userId: mongoose.Types.ObjectId;
  category: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isPasswordMatch(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  nodes: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  followers: mongoose.Types.ObjectId[];
  onboarding: boolean;
  phone: number;
  address: string;
  degree: string;
  skills: string[];
  graduationYear: number;
  professionalExperiences: IProfessionalExperience[];
  collegeOrInstituteName: string;
  bio: string;
  favTimelines: IFavTimeline[];
}

const professionalExperienceSchema = new Schema<IProfessionalExperience>({
  position: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const favTimelineSchema = new Schema<IFavTimeline>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: Number,
    address: String,
    degree: String,
    graduationYear: Number,
    professionalExperiences: [professionalExperienceSchema],
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    nodes: [
      {
        type: Schema.Types.ObjectId,
        ref: "TimelineNode",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    skills: {
      type: [String],
    },
    favTimelines: [favTimelineSchema],
    onboarding: {
      type: Boolean,
      required: true,
      default: false,
    },
    collegeOrInstituteName: String,
    bio: String,
  },
  { timestamps: true }
);

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.isPasswordMatch = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function (): string {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET_ACCESS!, {
    expiresIn: "15m",
  });
};

UserSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET_REFRESH!, {
    expiresIn: "7d",
  });
};

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
