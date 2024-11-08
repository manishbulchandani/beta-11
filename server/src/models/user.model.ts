import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isPasswordMatch(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  nodes: mongoose.Types.ObjectId[];
  onboarding: boolean;
  collegeOrInstituteName: string;
  bio: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    nodes: [{
      types: Schema.Types.ObjectId,
      ref: 'TimelineNode'
    }],
    onboarding: {
      type: Boolean,
      required: true,
      default: false
    },
    collegeOrInstituteName: String,
    bio: String
  },
  { timestamps: true }
);

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET_ACCESS!,
    { expiresIn: "15m" }
  );
};

UserSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET_REFRESH!,
    { expiresIn: "7d" }
  );
};

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
