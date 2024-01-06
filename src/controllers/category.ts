import { Request, RequestHandler, Response } from "express";
import { Category } from "../models";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    if (categories) {
      res.status(200).json(categories);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addCategory = async (req: Request, res: Response) => {
  try {
    const result = await Category.create(req.body);
    if (result) {
      res.status(200).json(result);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
