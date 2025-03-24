import express from "express";
import { insertDateField } from "../middleware/customMiddlewares.js";
import { test1 } from "../controller/testController.js";

const testRouter = express.Router();

testRouter.get("/test", insertDateField, test1);
// testRouter.get("/test", test1);

export default testRouter;
