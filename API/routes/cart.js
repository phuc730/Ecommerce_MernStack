const router = require("express").Router();
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin } = require("./verifyToken");

//CREATE
router.post("/CreateCart", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try{
        const isSaved = await newCart.save();
        return res.status(200).json(isSaved);
    }catch(err){
        return res.status(500).json(err);
    }
})

//UPDATE
router.put("/UpdateCart/:id", verifyTokenAndAuthorization, async (req, res) => {
    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        );

        return res.status(200).json(updatedCart);

    }catch(err){
        return res.status(500).json(err)
    }
});

//DELETE
router.delete("/DeleteCart/:id", verifyTokenAndAuthorization, async (req, res) => {
    try{
        await Cart.findByIdAndDelete(req.params.id);
        return res.status(200).json("Cart has been deleted");
    }catch(err){
        return res.status(500).json(err) 
    }
});

//GET CART DETAIL;
router.get("/GetCartDetail/:userId",verifyTokenAndAuthorization , async (req, res) => {
    try{
        const cart = await Cart.findOne({userId: req.params.userId});
        return res.status(200).json(cart);
    }catch(err){
        return res.status(500).json(err) 
    }
});

//GET ALL CARTS
router.get("/GetAllCarts",verifyTokenAndAdmin , async (req, res) => {
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);

    }catch(err){
        return res.status(500).json(err) 
    }
});

module.exports = router