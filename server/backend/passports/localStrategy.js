import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { Member } from "../../database/models/transform";

export default () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "member_id",
        passwordField: "password",
      },
      async (member_id, password, done) => {
        try {
          const member = await Member.findOne({
            where: { member_id: member_id },
          });
          if (member) {
            const result = await bcrypt.compare(password, member.password);
            if (result) {
              // 입력한 member ID 의 password 와 입력한 비밀번호가 일치하는 경우
              done(null, member);
            } else {
              // 입력한 member ID 의 password 와 입력한 비밀번호가 일치하지 않는 경우
              done(null, false, { message: "incorrect password." });
            }
          } else {
            // 입력한 member ID 가 없는 경우
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
