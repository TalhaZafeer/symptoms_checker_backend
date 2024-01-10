import { Router } from "express";
import { addDisease, checkSymptoms } from "../controllers/disease";

const diseaseRouter = Router();

diseaseRouter.post("/", checkSymptoms);
diseaseRouter.post("/", addDisease);

export default diseaseRouter;
