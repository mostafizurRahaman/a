import { Schema, model } from "mongoose";
import { IUser, IUserModel } from "./user.interface";
import { UserStatus } from "./user.constants";

import configs from "../../configs";
import bcrypt from "bcrypt";
const userSchema = new Schema<IUser, IUserModel>(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      select: 0,
    },
    role: {
      type: String,
      enum: {
        values: "manager",
      },
      default: "manager",
    },
    status: {
      type: String,
      enum: {
        values: UserStatus,
      },
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//  ** Hash use password Before saving the user in data base

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(configs.bcrypt_solt_round),
  );

  next();
});

// **Create a post method to manage password :
userSchema.post("save", async (doc, next) => {
  doc.password = "";
  next();
});

// ** Protect Deleted User For Find and findOne

userSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $eq: false } });
  next();
});

// ** ProTect Deleted User When FindOne:
userSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $eq: false } });
  next();
});

// ** Protect Deleted User When aggregate:
userSchema.pre("aggregate", async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $eq: false } } });
  next();
});

// **Create an Static Method to Check Is User Exists Or Not:

userSchema.statics.isUserExists = async (id: string) => {
  const userExists = await User.findById(id);
  return userExists;
};

// ** check is user Exists in database with email :
userSchema.statics.isUserExistWithEmail = async (email: string) => {
  const userExists = await User.findOne({ email }).select("+password");
  return userExists;
};

// ** Create another static method to check is PasswordMatched? :
userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hash: string,
) {
  const isMatched = await bcrypt.compare(plainPassword, hash);
  return isMatched;
};

// ** Create Model for user:
const User = model<IUser, IUserModel>("User", userSchema);

export default User;
