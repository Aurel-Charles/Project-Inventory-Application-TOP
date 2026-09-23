import { Router } from "express";
import { getCategoriesFromDb, getCategoryFromDb } from "../controllers/categoryController.js";

export const categoryRouter = Router()

categoryRouter.get("/", getCategoriesFromDb)
categoryRouter.get("/:id", getCategoryFromDb)