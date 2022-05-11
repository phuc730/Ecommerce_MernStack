const router = require("express").Router();
const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin } = require("./verifyToken");

//CREATE
router.post("/CreateOrder", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);

    try{
        const isSaved = await newOrder.save();
        return res.status(200).json(isSaved);
    }catch(err){
        return res.status(500).json(err);
    }
})

//UPDATE
router.put("/UpdateOrder/:id", verifyTokenAndAuthorization, async (req, res) => {
    try{
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        );

        return res.status(200).json(updatedOrder);

    }catch(err){
        return res.status(500).json(err)
    }
});

//DELETE
router.delete("/DeleteOrder/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        await Order.findByIdAndDelete(req.params.id);
        return res.status(200).json("Order has been deleted");
    }catch(err){
        return res.status(500).json(err) 
    }
});

//GET ORDER DETAIL;
router.get("/GetOrderDetail/:userId",verifyTokenAndAuthorization , async (req, res) => {
    try{
        const order = await Order.find({userId: req.params.userId});
        return res.status(200).json(order);
    }catch(err){
        return res.status(500).json(err) 
    }
});

//GET ALL ORDERS
router.get("/GetAllOrders",verifyTokenAndAdmin , async (req, res) => {
    try{
        const orders = await Order.find();
        res.status(200).json(orders);

    }catch(err){
        return res.status(500).json(err) 
    }
});

//GET MONTHLY INCOME
router.get("/GetMonthlyIncome", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth }
                }
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$Amount"
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales"}
                }
            }
        ]);

        res.status(200).json(income);
    } catch(err) {
        return res.status(500).json(err) 
    }
})

module.exports = router