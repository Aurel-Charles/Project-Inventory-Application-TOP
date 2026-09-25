import { Router } from "express";
import { getAddItemForm, getEditItem, getItemByIdFromDb, getItemsFromDb, postAddNewItem, postDeleteItemById, postUpdateItem } from "../controllers/itemController.js";
import { getOutOfStockItemsFromDb } from "../controllers/indexController.js";

export const itemRouter = Router()

itemRouter.get("/", getItemsFromDb)
itemRouter.get("/new", getAddItemForm)
itemRouter.post("/" , postAddNewItem)
itemRouter.get("/out-of-stock", getOutOfStockItemsFromDb)

itemRouter.get("/:id/edit", getEditItem)
itemRouter.post("/:id/edit", postUpdateItem)
itemRouter.get("/:id", getItemByIdFromDb)
itemRouter.post("/:id/delete" , postDeleteItemById)