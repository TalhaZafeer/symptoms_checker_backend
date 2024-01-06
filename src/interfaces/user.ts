import mongoose from "mongoose";

interface UserI {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  description: string;
  availability: DoctorAvailability;
  password: string;
  role: string;
  location: string;
  specialty: mongoose.Types.ObjectId;
}

interface DoctorAvailability {
  days: string[];
  timeSlots: string[];
  service: string[];
}

export default UserI;
