import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IUser extends Document {
  username: string;
  password: string;
  role: UserRole;
  isPasswordMatch(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
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
