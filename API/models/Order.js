const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        UserId: { type: String, required: true},
        Products: [
            {
                ProductId: { type: String },
                Quantity: { type: Number, default: 1} 
            }
        ],
        Amount: { type: Number, required: true },
        Address: { type: Object, required: true },
        Status: { type: String, default: "Pending" }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema)