import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { Member } from "../../../database/models/transform";
import { isLoggedIn, isNotLoggedIn } from "../../middlewares/login";

const router = express.Router();

router.post("/register", isNotLoggedIn, async (req, res, next) => {
  const { id, password } = req.body;

  try {
    const member = Member.findOne({ where: { id: id } });
    if (member) {
      res.status(401).json({ message: "member already exists." });
    } else {
      const hash = await bcrypt.hash(password, 12);
      const member = Member.create({
        id: id,
        password: hash,
      });
      res.status(201).json(member);
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  console.log(req);
  passport.authenticate("local", (authError, user, info) => {
    // http://www.passportjs.org/docs/authenticate/
    if (authError) {
      console.error(authError);
      next(err);
    }
    if (!user) {
      res.status(401).json({ message: info.message });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        next(loginError);
      }
      res.status(200).json(user);
    })(req, res, next);
  });

  router.get("/logout", isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.status(200).json({ message: "logged out." });
  });
});

module.exports = router;
