const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    UserName: req.body.UserName,
    Email: req.body.Email,
    Password: CryptoJs.AES.encrypt(
      req.body.Password,
      process.env.HASH_PASS_KEY
    ).toString(),
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    IsAdmin: req.body.IsAdmin,
  });

  try {
    const isSaved = await newUser.save();
    res.status(200).json(isSaved);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ UserName: req.body.UserName });
    if (!user) {
      return res.status(401).json("Username or password is wrong!");
    }

    const hashedPassword = CryptoJs.AES.decrypt(
      user.Password,
      process.env.HASH_PASS_KEY
    );
    const OriginalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
    if (OriginalPassword !== req.body.Password) {
      return res.status(401).json("Username or password is wrong!");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.IsAdmin,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1d",
      }
    );
    const { Password, ...others } = user._doc;
    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
