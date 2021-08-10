import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { Member } from "../../../database/models/transform";
import { isLoggedIn, isNotLoggedIn } from "../../middlewares/login";

const router = express.Router();

router.get("/register", (req, res, next) => {
  res.send(
    '<h1>Register Page</h1><form method="post" action="/api/auth/register">' +
      'Enter Username:<br><input type="text" name="id">' +
      '<br>Enter Password:<br><input type="password" name="password">' +
      '<br><br><input type="submit" value="Submit"></form>'
  );
});

router.post("/register", isNotLoggedIn, async (req, res, next) => {
  const { id, password } = req.body;
  try {
    const member = await Member.findOne({ where: { member_id: id } });
    if (member) {
      res.status(401).json({ message: "member already exists." });
    } else {
      const hash = await bcrypt.hash(password, 12);
      const member = Member.create({
        member_id: id,
        password: hash,
        member_name: "member",
        member_phone: "01000000000",
        email: "user@example.com",
      });
      res.status(201).json(member);
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.get("/login", (req, res, next) => {
  res.send(
    '<h1>로그인 페이지</h1><form method="POST" action="/api/auth/login">' +
      'Enter Username:<br><input type="text" name="id">' +
      '<br>Enter Password:<br><input type="password" name="password">' +
      '<br><br><input type="submit" value="Submit"></form>'
  );
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
      return res.status(200).json(user);
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).json({ message: "logged out." });
});

module.exports = router;
