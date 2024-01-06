import { Router } from "express";
import { addCategory, getCategories } from "../controllers/category";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);
categoryRouter.post("/add", addCategory);

export default categoryRouter;
