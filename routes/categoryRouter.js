import { Router } from "express";
import { getAddCategoryForm, getCategoriesFromDb, getCategoryFromDb, getEditCategory, postAddCategoryToDb, postDeleteCategoryById, postUpdateCategory } from "../controllers/categoryController.js";


export const categoryRouter = Router()

categoryRouter.get("/", getCategoriesFromDb)
categoryRouter.get("/new", getAddCategoryForm)
categoryRouter.post("/", postAddCategoryToDb)


categoryRouter.get("/:id/edit", getEditCategory)
categoryRouter.post("/:id/edit", postUpdateCategory)
categoryRouter.post("/:id/delete", postDeleteCategoryById )
categoryRouter.get("/:id", getCategoryFromDb)