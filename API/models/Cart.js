const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        UserId: { type: String, required: true},
        Products: [
            {
                ProductId: { type: String },
                Quantity: { type: Number, default: 1} 
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Cart", cartSchema)