import { model, Schema } from "mongoose";

const BookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    bookingWith: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isValid: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const Booking = model("Booking", BookingSchema);
