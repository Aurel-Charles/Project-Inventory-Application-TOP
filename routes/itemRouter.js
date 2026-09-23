import { Router } from "express";
import { getAddItemForm, getItemByIdFromDb, getItemsFromDb, postAddNewItem, postDeleteItemById } from "../controllers/itemController.js";

export const itemRouter = Router()

itemRouter.get("/", getItemsFromDb)
itemRouter.get("/new", getAddItemForm)
itemRouter.post("/" , postAddNewItem)

itemRouter.get("/:id", getItemByIdFromDb)
itemRouter.post("/:id/delete" , postDeleteItemById)