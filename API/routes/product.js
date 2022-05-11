const router = require("express").Router();
const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin } = require("./verifyToken");

//CREATE
router.post("/CreateProduct", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);

    try{
        const isSaved = await newProduct.save();
        return res.status(200).json(isSaved);
    }catch(err){
        return res.status(500).json(err);
    }
})

//UPDATE
router.put("/UpdateProduct/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        );

        return res.status(200).json(updatedProduct);

    }catch(err){
        return res.status(500).json(err)
    }
});

//DELETE
router.delete("/DeleteProduct/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json("Product has been deleted");
    }catch(err){
        return res.status(500).json(err) 
    }
});

//GET PRODUCT DETAI;
router.get("/GetProductDetail/:id", async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        return res.status(200).json(product);
    }catch(err){
        return res.status(500).json(err) 
    }
});

//GET ALL PRODUCTS
router.get("/GetAllProducts", async (req, res) => {
    const isNew = req.query.isNew;
    const filterByCategory = req.query.category;
    try{
        let products;
        if (isNew && filterByCategory != null) {
            products = await Product
            .find({
                Categories: {
                    $in: [filterByCategory],
                }
            })
            .sort({createdAt: -1})
        }
        else if (isNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5);
        }
        else if (filterByCategory) {
            products = await Product.find({
                Categories: {
                    $in: [filterByCategory],
                }
            })
        }
        
        else {
            products = await Product.find();
        }

        res.status(200).json(products);
    }catch(err){
        return res.status(500).json(err) 
    }
});

module.exports = router