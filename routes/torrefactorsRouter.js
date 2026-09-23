import { Router } from "express";
import { getAddTorrefactorForm, getTorrefactorFromDb, getTorrefactorsFromDb, postAddTorrefactorToDb } from "../controllers/torrefactorController.js";

export const torrefactorsRouter = Router()

torrefactorsRouter.get("/", getTorrefactorsFromDb)
torrefactorsRouter.get("/new", getAddTorrefactorForm)
torrefactorsRouter.post("/", postAddTorrefactorToDb)

torrefactorsRouter.get("/:id", getTorrefactorFromDb)
