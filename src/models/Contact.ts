import { model, Schema } from "mongoose";

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Contact = model("Contact", ContactSchema);
