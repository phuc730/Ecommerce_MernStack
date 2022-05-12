const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        Title: { type: String, required: true, unique: true },
        Description: { type: String, required: true },
        Image: { type: String, required: true },
        Categories: { type: Array },
        Size: { type: Array },
        Color: { type: Array },
        Price: { type: Number, required: true },
        inStock: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema)