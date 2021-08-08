import passport from "passport";
import local from "./localStrategy";
import Member from "../../database/models/transform";

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Member.findOne({ where: { id: id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
};
