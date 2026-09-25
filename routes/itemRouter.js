import { Router } from "express";
import { getAddItemForm, getEditItem, getItemByIdFromDb, getItemsFromDb, postAddNewItem, postDeleteItemById, postUpdateItem } from "../controllers/itemController.js";
import { getOutOfStockItemsFromDb } from "../controllers/indexController.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

export const itemRouter = Router()

itemRouter.get("/", getItemsFromDb)
itemRouter.get("/new", getAddItemForm)
itemRouter.post("/" , postAddNewItem)
itemRouter.get("/out-of-stock", getOutOfStockItemsFromDb)

itemRouter.get("/:id/edit", getEditItem)
itemRouter.post("/:id/edit", postUpdateItem)
itemRouter.post("/:id/delete" , verifyAdmin, postDeleteItemById)
itemRouter.get("/:id", getItemByIdFromDb)