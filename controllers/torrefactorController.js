import { addNewTorrefactor, getItemsByTorrefactor, getTorrefactorById, getTorrefactors } from "../db/queries/torrefactors.js";

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
        const [torrefactor, items] = await Promise.all([
            getTorrefactorById(id),
            getItemsByTorrefactor(id)
        ]) 
        console.log(items);
        
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