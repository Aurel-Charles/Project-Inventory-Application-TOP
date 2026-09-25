import { Router } from "express";
import { getAddCategoryForm, getCategoriesFromDb, getCategoryFromDb, getEditCategory, postAddCategoryToDb, postDeleteCategoryById, postUpdateCategory } from "../controllers/categoryController.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";


export const categoryRouter = Router()

categoryRouter.get("/", getCategoriesFromDb)
categoryRouter.get("/new", getAddCategoryForm)
categoryRouter.post("/", postAddCategoryToDb)


categoryRouter.get("/:id/edit", getEditCategory)
categoryRouter.post("/:id/edit", postUpdateCategory)
categoryRouter.post("/:id/delete", verifyAdmin, postDeleteCategoryById )
categoryRouter.get("/:id", getCategoryFromDb)