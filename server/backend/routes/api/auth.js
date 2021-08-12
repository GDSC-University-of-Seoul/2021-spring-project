import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { Member } from "../../../database/models/transform";
import { isLoggedIn, isNotLoggedIn } from "../../middlewares/login";

const router = express.Router();
const SALT_ROUND = 12;

router.post("/register", isNotLoggedIn, async (req, res, next) => {
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

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    // http://www.passportjs.org/docs/authenticate/
    if (authError) {
      console.error(authError);
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).json({
        memeber_id: user.member_id,
        member_name: user.member_name,
        member_phone: user.member_phone,
        email: user.email,
      });
    });
  })(req, res, next);
});

router.put("/member", isLoggedIn, async (req, res) => {
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
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).json({ message: "logged out." });
});

module.exports = router;
