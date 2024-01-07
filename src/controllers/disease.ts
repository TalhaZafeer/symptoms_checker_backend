import { Request, Response } from "express";
import { Disease } from "../models/Disease";
import { Category } from "../models/Category";
import { User } from "../models";

export const addDisease = async (req: Request, res: Response) => {
  try {
    const disease = await Disease.create(req.body);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const checkSymptoms = async (req: Request, res: Response) => {
  const { symptoms } = req.body;
  const regexPatterns = symptoms.map(
    (symptom: any) => new RegExp(symptom, "i")
  );

  const query = {
    symptoms: {
      $all: regexPatterns,
    },
  };

  const query2 = {
    symptoms: {
      $in: regexPatterns,
    },
  };

  // Find diseases that match the partial symptoms

  let result = await Disease.find(query).populate("category"); // If you want to populate the category field
  if (!result.length) {
    result = await Disease.find(query2).populate("category");
  }

  const categories = new Set();

  result.forEach((disease) => categories.add(disease?.category));
  const catArray = [...categories];

  const doctors = await User.find({ specialty: { $in: catArray } }).populate(
    "specialty"
  );

  res.json({ diseases: result, doctors });
};
