import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { Member } from "../../database/models/transform";

export default () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "password",
      },
      async (id, password, done) => {
        try {
          const member = await Member.findOne({ where: { member_id: id } });
          if (member) {
            const result = await bcrypt.compare(password, member.password);
            if (result) {
              done(null, member);
            } else {
              done(null, false, { message: "incorrect password." });
            }
          } else {
            done(null, false, { message: "unregisted member." });
          }
        } catch (err) {
          console.error(err);
          done(error);
        }
      }
    )
  );
};
