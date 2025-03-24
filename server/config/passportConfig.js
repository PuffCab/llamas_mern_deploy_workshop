import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import UserModel from "../models/usersModel.js";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "some very complicated password",
};

const passportStrategy = new JwtStrategy(jwtOptions, async function (
  jwt_payload,
  done
) {
  try {
    const user = await UserModel.findOne({ _id: jwt_payload.sub });

    if (!user) {
      console.log("create new account");
      return done(null, false);
    }
    if (user) {
      console.log("user found");
      return done(null, user);
    }
  } catch (err) {
    console.log("token invalid");
    return done(err, false);
  }
});

export default passportStrategy;
