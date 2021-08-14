import passport from "passport";
import localStrategy from "./localStrategy";
import jwtStrategy from "./jwtStrategy";
import { Member } from "../../database/models/transform";

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.member_id);
  });

  passport.deserializeUser((id, done) => {
    Member.findOne({ where: { member_id: id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  localStrategy();
  jwtStrategy();
};
