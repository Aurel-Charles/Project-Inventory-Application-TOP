import { Router } from "express";
import { getAddTorrefactorForm, getEditTorrefactor, getTorrefactorFromDb, getTorrefactorsFromDb, postAddTorrefactorToDb, postDeleteTorrefactorById, postUpdateTorrefactor } from "../controllers/torrefactorController.js";

export const torrefactorsRouter = Router()

torrefactorsRouter.get("/", getTorrefactorsFromDb)
torrefactorsRouter.get("/new", getAddTorrefactorForm)
torrefactorsRouter.post("/", postAddTorrefactorToDb)

torrefactorsRouter.get("/:id/edit", getEditTorrefactor)
torrefactorsRouter.post("/:id/edit", postUpdateTorrefactor)
torrefactorsRouter.get("/:id", getTorrefactorFromDb)
torrefactorsRouter.post("/:id/delete", postDeleteTorrefactorById)