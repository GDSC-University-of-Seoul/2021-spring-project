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
      res.status(401).json({ message: "member already exists." });
    } else {
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

// use local authentication when login (without token)
router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    (authError, user, info) => {
      // http://www.passportjs.org/docs/authenticate/
      if (authError) {
        console.error(authError);
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      return req.login(user, { session: false }, (loginError) => {
        if (loginError) {
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
