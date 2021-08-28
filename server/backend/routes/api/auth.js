import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
import { Member } from "../../../database/models/transform";

const router = express.Router();
const SALT_ROUND = 12;

router.post("/register", async (req, res, next) => {
  const { member_id, password, member_name, member_phone, email } = req.body;
  try {
    const member = await Member.findOne({ where: { member_id: member_id } });
    if (member) {
      // 입력한 member ID 가 이미 존재하는 경우
      res.status(401).json({ message: "member already exists." });
    } else {
      // 입력한 member ID 가 존재하지 않는 경우 (= 회원가입이 가능한 경우)
      const hash = await bcrypt.hash(password, SALT_ROUND);
      const member = await Member.create({
        member_id: member_id,
        password: hash,
        member_name: member_name,
        member_phone: member_phone,
        email: email,
      });
      res.status(201).json({ message: "register completed." });
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

// 최초 로그인 시 local Strategy 사용 (로그인 이후 jwt strategy 사용)
router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    (authError, user, info) => {
      // http://www.passportjs.org/docs/authenticate/
      if (authError) {
        // 인증 과정에서 오류가 난 경우
        console.error(authError);
        return next(err);
      }
      if (!user) {
        // 입력한 member ID 가 없거나 비밀번호가 일치하지 않는 경우
        return res.status(401).json({ message: info.message });
      }
      // 인증에 성공한 경우
      return req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          // login 함수 실행 시 오류가 발생한 경우
          console.error(loginError);
          return next(loginError);
        }
        const member = user.toJSON();
        delete member.password;

        const token = jwt.sign(member, process.env.JWT_SECRET);
        return res.status(200).json({ member, token });
      });
    }
  )(req, res, next);
});

router.put(
  "/member",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { member_name, member_phone, password, email } = req.body;

    let fields = {
      member_name: member_name,
      member_phone: member_phone,
      email: email,
    };
    if (password) {
      const hash = await bcrypt.hash(password, SALT_ROUND);
      fields.password = hash;
    }
    try {
      const member = await Member.update(fields, {
        where: { member_id: req.user.member_id },
      });
      res.status(200).json({ message: "member updated." });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

module.exports = router;
