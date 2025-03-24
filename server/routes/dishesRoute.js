import express from "express";
import {
  getAllDishes,
  getDishesByCountryCode,
} from "../controller/dishesController.js";

const dishesRouter = express.Router();

dishesRouter.get("/all", getAllDishes);
dishesRouter.get("/all/countries/:countryCode", getDishesByCountryCode);
// dishesRouter.get("/all/countries/:countryCode/something", doSomething);

export default dishesRouter;
