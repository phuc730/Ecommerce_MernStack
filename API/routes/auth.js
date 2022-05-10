const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js")

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        UserName: req.body.UserName,
        Email: req.body.Email,
        Password: CryptoJs.AES.encrypt(
            req.body.Password,
            process.env.HASH_PASS_KEY
        ).toString()
    });

    try{
        const isSaved = await newUser.save();
        res.status(200).json(isSaved);
    }catch(err){
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({ UserName: req.body.UserName });
        if(!user){
            return res.status(401).json("Username or password is wrong!");
        } 

        const hashedPassword = CryptoJs.AES.decrypt(
            user.Password,
            process.env.HASH_PASS_KEY
        );
        const OriginalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
        if(OriginalPassword !== req.body.Password){
            return res.status(401).json("Username or password is wrong!")
        }

        const { Password, ...others } = user._doc;
        return res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router