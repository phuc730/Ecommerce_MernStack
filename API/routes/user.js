const router = require("express").Router();
const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//UPDATE
router.put("/UpdateUser/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.Password) {
    req.body.Password = CryptoJS.AES.encrypt(
      req.body.Password,
      process.env.HASH_PASS_KEY
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE
router.delete(
  "/DeleteUser/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("User has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

//GET USER
router.get("/GetCurrentUser/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { Password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/GetAllUsers", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const user = query
      ? await User.find().sort({ _id: -1 }).limit(5).select("-Password")
      : await User.find();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET USER STATS
router.get("/GetUserStats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: lastYear },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          totalAccount: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
