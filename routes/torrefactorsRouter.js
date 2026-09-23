import { Router } from "express";
import { getTorrefactorFromDb, getTorrefactorsFromDb } from "../controllers/torrefactorController.js";

export const torrefactorsRouter = Router()

torrefactorsRouter.get("/", getTorrefactorsFromDb)
torrefactorsRouter.get("/:id", getTorrefactorFromDb)