import { Model } from "mongoose";
import { model, Schema } from "mongoose";
import UserI from "../interfaces/user";
import { hashPassword } from "../utils";
import bcrypt from "bcrypt";

const { isEmail } = require("validator");

export interface UserModel extends Model<UserI> {
  login(email: string, password: string): UserI;
}

const UserSchema = new Schema<UserI, UserModel>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid E-mail address"],
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [6, "Minimm password length is 6 characters ..."],
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  availability: {
    type: {
      days: [
        {
          type: String,
        },
      ],
      timeSlots: [
        {
          type: String,
        },
      ],
      service: [
        {
          type: String,
        },
      ],
    },
  },
  location: {
    type: String,
  },
  speciality: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

UserSchema.pre("save", async function (next) {
  this.password = await hashPassword(this.password);
  next();
});

//Static Method for login

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error("Incorrect password");
  }
  throw new Error("Incorrect Email");
};

UserSchema.post("save", function (doc, next) {
  next();
});

export const User = model<UserI, UserModel>("User", UserSchema);
