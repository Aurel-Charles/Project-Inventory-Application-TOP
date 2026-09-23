import { Router } from "express";
import { getAddCategoryForm, getCategoriesFromDb, getCategoryFromDb, postAddCategoryToDb } from "../controllers/categoryController.js";

export const categoryRouter = Router()

categoryRouter.get("/", getCategoriesFromDb)
categoryRouter.get("/new", getAddCategoryForm)
categoryRouter.post("/", postAddCategoryToDb)

categoryRouter.get("/:id", getCategoryFromDb)