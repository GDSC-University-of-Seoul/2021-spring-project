import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Member } from "../../database/models/transform";

export default () => {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwtPayLoad, done) => {
        try {
          const member = await Member.findOne({
            where: { member_id: jwtPayLoad.member_id },
          });
          if (member) {
            done(null, member);
          } else {
            ddone(null, false, { message: "incorrect password." });
          }
        } catch (err) {
          console.error(err);
          done(error);
        }
      }
    )
  );
};
