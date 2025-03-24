import express from "express";
import { getAllCountries } from "../controller/countriesController.js";
// import jwtAuth from "../middleware/jwtAuth.js";

const countriesRouter = express.Router();

countriesRouter.get("/all", getAllCountries);
// countriesRouter.post("/modifyInfo",jwtAuth, modifyInfo)

export default countriesRouter;
