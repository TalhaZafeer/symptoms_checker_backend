import { Request, Response } from "express";
import { Disease } from "../models/Disease";
import { Category } from "../models/Category";

export const addDisease = async (req: Request, res: Response) => {
  try {
    const disease = await Disease.create(req.body);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const checkSymptoms = async (req: Request, res: Response) => {
  const { symptoms } = req.body;

  try {
    const result = await searchDiseases(symptoms);
    res.json({ diseases: result });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function searchDiseases(symptoms: string[]) {
  const result = await Disease.aggregate([
    {
      $match: {
        symptoms: {
          $all: symptoms.map((symptom) => new RegExp(symptom, "i")),
        },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: ["$$ROOT", { category: "$category.name" }] },
      },
    },
  ]);

  return result;
}
