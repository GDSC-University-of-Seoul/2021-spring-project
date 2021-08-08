import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { Member } from "../../database/models/transform";

export default () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "id",
        paasswordField: "password",
      },
      async (id, password, done) => {
        try {
          const member = Member.findOne({ where: { id: id } });
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
