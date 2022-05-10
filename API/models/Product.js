const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        Title: { type: String, required: true, unique: true },
        Description: { type: String, required: true },
        Image: { type: String, required: true },
        Categories: { type: Array },
        Size: { type: String },
        Color: { type: String },
        Price: { type: Number, required: true },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema)