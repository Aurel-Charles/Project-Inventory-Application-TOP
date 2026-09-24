import { addNewTorrefactor, deleteTorrefactorById, getItemsByTorrefactor, getTorrefactorById, getTorrefactors, updateTorrefactor } from "../db/queries/torrefactors.js";
import { HttpError } from "../error/httpError.js";

export async function getTorrefactorsFromDb(req, res, next) {
    try {
        const torrefactors = await getTorrefactors()
        console.log(torrefactors);

        res.render("torrefactors/index" , {torrefactors})
    } catch (error) {
        next(error)
    }
}

export async function getTorrefactorFromDb(req, res, next) {
    try {
        const id = req.params.id
        const torrefactor = await getTorrefactorById(id)
        if (!torrefactor) throw new HttpError("Torrefactor not found", 404)
        const items = await getItemsByTorrefactor(id)
        res.render("torrefactors/show" , {torrefactor, items})
    } catch (error) {
        next(error)
    }
}

export function getAddTorrefactorForm(req, res, next){
    try {
        res.render("torrefactors/new")
    } catch (error) {
        next(error)
    }
}

export async function postAddTorrefactorToDb(req, res , next) {
    try {
        const {name, country, website} = req.body
        await addNewTorrefactor(name,country, website)
        res.redirect("/torrefactors")
    } catch (error) {
        next(error)
    }
}

export async function postDeleteTorrefactorById(req, res, next) {
    try {
        const id = req.params.id
        const deletedTorrefactor = await deleteTorrefactorById(id)
        if (!deletedTorrefactor) throw new HttpError("Torrefactor not found", 404)
        console.log(deletedTorrefactor.name + " category has been deleted");
        res.redirect("/torrefactors")
    } catch (error) {
        next(error)
    }
}

export async function getEditTorrefactor(req, res, next) {
    try {
        const id = req.params.id 
        const torrefactor = await getTorrefactorById(id)
        if (!torrefactor) throw new HttpError("Torrefactor not found", 404)
        console.log(torrefactor);
        res.render("torrefactors/edit" , {torrefactor})        
    } catch (error) {
        next(error)
    }
}

export async function postUpdateTorrefactor(req, res, next) {
    try {
        const id = req.params.id
        const {name, country , website} = req.body
        await updateTorrefactor(id, name, country, website)
        res.redirect("/torrefactors")
    } catch (error) {
        next(error)
    }
}