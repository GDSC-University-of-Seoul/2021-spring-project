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
            // jwt payload 의 멤버 ID 가 DB 내에 존재하는 경우
            done(null, member);
          } else {
            // jwt payload 의 멤버 ID 가 DB 내에 존재하지 않는 경우
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
