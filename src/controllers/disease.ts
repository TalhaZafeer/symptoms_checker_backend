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
  const regexPatterns = symptoms.map(
    (symptom: any) => new RegExp(symptom, "i")
  );

  const query = {
    symptoms: {
      $all: regexPatterns,
    },
  };

  // Find diseases that match the partial symptoms
  const result = await Disease.find(query).populate("category"); // If you want to populate the category field
  const categories = new Set();

  result.forEach((disease) => categories.add(disease?.category?.id));
  const catArray = [...categories];

  console.log(catArray);

  res.json({ diseases: result });

  // try {
  //   const result = await searchDiseases(symptoms);
  //   res.json({ diseases: result });
  // } catch (error) {
  //   res.status(500).json({ error: "Internal Server Error" });
  // }
};

// async function searchDiseases(symptoms: string[]) {
//   const result = await Disease.aggregate([
//     {
//       $match: {
//         symptoms: {
//           $all: symptoms.map((symptom) => new RegExp(symptom, "i")),
//         },
//       },
//     },
//     {
//       $lookup: {
//         from: "categories",
//         localField: "category",
//         foreignField: "_id",
//         as: "category",
//       },
//     },
//     {
//       $unwind: "$category",
//     },
//     {
//       $replaceRoot: {
//         newRoot: { $mergeObjects: ["$$ROOT", { category: "$category.name" }] },
//       },
//     },
//   ]);

//   return result;
// }
