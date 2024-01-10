import { Router } from "express";

const contactRouter = Router();

contactRouter.post("/contact");
contactRouter.get("/");

export default contactRouter;
