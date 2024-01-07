import { model, Schema } from "mongoose";

const DiseaseSchema = new Schema(
  {
    disease: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    symptoms: [
      {
        type: String,
        required: true,
      },
    ],
    medications: [
      {
        type: {
          name: String,
          dosage: String,
          frequency: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Disease = model("Disease", DiseaseSchema);
