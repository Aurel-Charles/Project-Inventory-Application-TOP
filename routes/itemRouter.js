import { Router } from "express";
import { getItemByIdFromDb, getItemsFromDb } from "../controllers/itemController.js";

export const itemRouter = Router()

itemRouter.get("/", getItemsFromDb)
itemRouter.get("/:id", getItemByIdFromDb)