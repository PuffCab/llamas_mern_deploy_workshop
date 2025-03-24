import express from "express";

import colors from "colors";
import cors from "cors";
import testRouter from "./routes/testRoute.js";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import dishesRouter from "./routes/dishesRoute.js";
import countriesRouter from "./routes/countryRoute.js";
import userRouter from "./routes/usersRoutes.js";
import cloudinaryConfig from "./config/cloudinaryConfig.js";
import passport from "passport";
import passportStrategy from "./config/passportConfig.js";
console.log("comment only to not have colors as an unused import", colors);

const app = express();

const port = process.env.PORT || 5000;

function addMiddleWares() {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  //#region
  //REVIEW[epic=deploy, seq=5] 5-Using CORS options to secure the origin of the requests
  // const allowedOrigins = ["http://localhost:5173", "your client deployed URL"];
  // const corsOptions = {
  //   origin: function (origin, callback) {
  //     // !origin will allow to accept direct calls to the api , with no heading, e.g. http://localhost:5001/api/cities/all
  //     //REVIEW[epic=deploy, seq=6] 6- !origin will allow requests with no header (origin===undefined), the direct ones (using directly the server url). This solution will now accept only request from those 2 origins, or with no header.
  //     //Accepting requests with no header might pose a security threat ...research how convinient the solution is.

  //     if (allowedOrigins.indexOf(origin) !== -1) {
  //       // if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error("Not allowed by CORS"));
  //     }
  //   },
  // };
  // app.use(cors(corsOptions));
  //#endregion
  cloudinaryConfig();
  passport.initialize();
  passport.use(passportStrategy);
}

function startServer() {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`.green);
  });
}

function loadRoutes() {
  app.use("/api", testRouter);
  app.use("/api/dishes", dishesRouter);
  app.use("/api/countries", countriesRouter);
  app.use("/api/users", userRouter);
}

async function DBConnection() {
  try {
    const mongoDBConnection = await mongoose.connect(process.env.MONGODB_URI);
    if (mongoDBConnection) {
      console.log("connected with MongoDB".bgGreen);
    }
  } catch (error) {
    console.log("error connecting to MONGODB :>> ".bgRed, error);
  }
}

(async function () {
  await DBConnection();

  addMiddleWares();
  loadRoutes();
  startServer();
})();
//REVIEW[epic=deploy, seq=3] 3-Add vercel.json file with config: https://vercel.com/docs/projects/project-configuration
